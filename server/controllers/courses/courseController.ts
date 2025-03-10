import Course from "../../models/courses/courseModel.ts";
import User from "../../models/users/userModel.ts";
import APIFeatures from "../../utils/apiFeatures.ts";
import catchAsync from "../../utils/wrapperFn.ts";
import createError from "../../utils/errorFn.ts";
import { NextFunction, Request, Response } from "express";

const getAllCourses = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Apply filters and search but do not paginate for counting total matching courses
    const countQuery = new APIFeatures(Course.find(), req.query)
      .filter()
      .search();
    const totalCourses = await countQuery.getQuery().countDocuments();

    // Apply full pipeline including pagination, passing totalCourses to adjust limit dynamically
    const features = new APIFeatures(Course.find(), req.query)
      .filter()
      .search()
      .sort()
      .limitFields()
      .paginate(totalCourses);

    const courses = await features.getQuery();

    if (!courses.length) {
      return next(
        createError("No Course documents found in the database", 404)
      );
    }

    // Get pagination info
    const currentPage = req.query.page
      ? parseInt(req.query.page as string, 10)
      : 1;
    const resultsPerPage = req.query.limit
      ? parseInt(req.query.limit as string, 10)
      : 20;
    const totalPassed = (currentPage - 1) * resultsPerPage;
    const totalLeftCourses = Math.max(totalCourses - totalPassed, 0); // Ensure it doesn’t go below 0
    const totalPages = Math.floor(totalCourses / 20);

    res.status(200).json({
      status: "Success",
      totalCourses, // Total matching courses
      totalLeftCourses, // Courses left after pagination
      currentPage,
      totalPages,
      currentPageCoursesAmount: courses.length, // Dynamically adjust to return actual number of items
      response: courses,
    });
  }
);

const getCourseById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const courseId = req.params.id;

    if (!courseId) {
      return next(createError("Please provide the course ID in the URL.", 400));
    }

    const findCourse = await Course.findOne({ _id: courseId });

    if (!findCourse) {
      return next(createError("There is no such course in the database.", 404));
    }

    res.status(200).json({
      status: "success",
      totalReviewsCourseHas: findCourse.reviews.length,
      data: findCourse,
    });
  }
);

const updateCourse = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const courseId = req.params.id;

    if (!courseId) {
      return next(createError("Please provide the course ID in the URL.", 400));
    }

    const updatedCourse = await Course.findByIdAndUpdate(courseId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCourse) {
      return next(createError("Error occurred during course update.", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Course updated successfully.",
      data: updatedCourse,
    });
  }
);

const createCourse = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      courseName,
      courseDescription,
      coursePrice,
      courseImg,
      category,
      subCategory,
      courseTopic,
      courseLevel,
      courseLanguages,
      moneyBackGuarantee,
    } = req.body;

    if (
      !courseImg ||
      !courseName ||
      !courseDescription ||
      !coursePrice ||
      !category ||
      !subCategory ||
      !courseTopic ||
      !courseLevel ||
      !courseLanguages
    ) {
      return next(
        createError(
          "One of the required fields for creating course is missing.",
          400
        )
      );
    }

    const newCourse = await Course.create({
      courseName,
      courseDescription,
      coursePrice,
      category,
      courseImg,
      subCategory,
      courseTopic,
      courseLevel,
      courseLanguages,
      courseInstructor: req.user._id,
      moneyBackGuarantee,
    });

    if (!newCourse) {
      return next(createError("Error occurred during course creation.", 500));
    }

    req.user.role = "instructor";
    req.user.coursesCreated.push(newCourse._id);
    await req.user.save();

    res.status(201).json({
      status: "success",
      message: `Course has successfully been created and assigned to user: ${req.user.fName}`,
      newCourse,
    });
  }
);

const deleteCourse = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const courseId = req.params.id;

    if (!courseId) {
      return next(createError("Please provide the course ID in the URL.", 400));
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return next(createError("Course not found.", 404));
    }

    const students = await User.find({
      role: "student",
      coursesBought: courseId,
    });

    await Promise.all(
      students.map(async (student) => {
        student.coursesBought = student.coursesBought.filter(
          (boughtCourseId) => boughtCourseId.courseId !== courseId
        );
        await student.save();
      })
    );

    course.isActive = false;
    await course.save();

    res.status(200).json({
      status: "success",
      message: "Course deleted successfully, and enrolled students updated.",
      studentsUpdated: students,
    });
  }
);

const reactivateCourseById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const courseId = req.params.id;
    const user = req.user._id;

    if (!courseId) {
      return next(
        createError(
          "Please provide a course ID in the URL to re-activate it.",
          400
        )
      );
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return next(
        createError(
          `There is no de-activated course with ID: ${courseId}.`,
          404
        )
      );
    }

    if (course.courseInstructor.toString() !== user.toString()) {
      return next(
        createError("You can't re-activate a course you didn't create.", 403)
      );
    }

    course.isActive = true;
    await course.save();

    res.status(201).json({
      status: "success",
      response: "Course has been successfully re-activated.",
      course,
    });
  }
);

const getCourseProsById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const courseId = req.params.courseId;

    if (!courseId) {
      return next(createError("Please provide the course ID in the URL.", 400));
    }

    const findCourse = await Course.findOne({ _id: courseId });

    if (!findCourse) {
      return next(createError("There is no such course in the database.", 404));
    }

    res.status(200).json({
      status: "success",
      data: findCourse.whatYouWillLearn,
    });
  }
);

const getCourseInfoForCart = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const courseId = req.params.id;

    if (!courseId) {
      return next(createError("Please provide the course ID in the URL.", 400));
    }

    const findCourse = await Course.findOne({ _id: courseId }).select(
      "courseFullPrice courseImg courseName courseInstructor averageRating courseDiscountPrice totalRatings totalCourseDuration totalCourseLessons totalCourseSections"
    );

    if (!findCourse) {
      return next(createError("There is no such course in the database.", 404));
    }

    res.status(200).json({
      status: "success",
      data: findCourse,
    });
  }
);

const viewCourseById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const courseId = req.params.courseId;

    if (!courseId) {
      return next(createError("Please provide the course ID in the URL.", 400));
    }

    const findCourse = await Course.findOne({ _id: courseId });

    if (!findCourse) {
      return next(createError("There is no such course in the database.", 404));
    }

    res.status(200).json({
      status: "success",
      permission: "You are eligible to watch the course content",
      totalReviewsCourseHas: findCourse.reviews.length,
      data: findCourse,
    });
  }
);

const updateCourseProgressById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: courseId } = req.params;
    const { lessonId, isDone, lastPlayedVideoTime } = req.body;

    if (!courseId) {
      return next(createError("Please provide the course ID in the URL.", 400));
    }

    if (
      !lessonId ||
      typeof isDone !== "boolean" ||
      typeof lastPlayedVideoTime !== "number"
    ) {
      return next(
        createError(
          "Invalid input: lessonId must be provided, isDone must be a boolean, and lastPlayedVideoTime must be a number.",
          400
        )
      );
    }

    if (!req.user || !req.user.coursesBought) {
      return next(createError("User data or courses bought not found.", 400));
    }

    // Convert courseId to string and check if the user has bought the course
    if (
      !req.user.coursesBought.some(
        (course: any) => course.courseId.toString() === courseId
      )
    ) {
      return next(
        createError(
          "This course is not included in the courses you bought.",
          400
        )
      );
    }

    // Find the course progress for the specified courseId
    const courseProgress = req.user.coursesProgress.find(
      (progress: any) => progress.course.toString() === courseId
    );

    if (!courseProgress) {
      return next(
        createError("This course progress was not found for the user.", 400)
      );
    }

    // Find the lesson progress for the specified lessonId
    const lessonProgress = courseProgress.lessons.find(
      (lesson: any) => lesson.lesson.toString() === lessonId
    );

    if (!lessonProgress) {
      return next(
        createError(
          "This lesson progress was not found in the course progress.",
          400
        )
      );
    }

    // Update the lesson progress
    if (isDone !== undefined) lessonProgress.isDone = isDone;
    if (lastPlayedVideoTime !== undefined) {
      lessonProgress.lastPlayedVideoTime = lastPlayedVideoTime;
    }

    // Save the updated user data
    await req.user.save();

    res.status(200).json({
      status: "success",
      message: "Lesson progress updated successfully",
      data: { courseId, lessonId, isDone, lastPlayedVideoTime },
    });
  }
);

export {
  updateCourseProgressById,
  viewCourseById,
  getCourseProsById,
  getCourseInfoForCart,
  reactivateCourseById,
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
