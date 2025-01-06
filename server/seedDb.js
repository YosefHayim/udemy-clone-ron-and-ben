const faker = require("@faker-js/faker").faker;
const bcrypt = require("bcrypt");
const connectDb = require("./config/connectDb");
const User = require("./models/users/userModel");
const Course = require("./models/courses/courseModel");
const Lesson = require("./models/courses/lessonModel");
const Section = require("./models/courses/sectionModel");
const InstructorComment = require("./models/reviews/instructorCommentModel");
const courseReviews = require("./models/reviews/courseReviewModel");
const ReportReview = require("./models/reviews/reportReviewModel");
const courseCategories = require("./utils/courseCategories");
const allowedIssueTypes = require("./utils/reportSubjects");

const clearCollections = async () => {
  await Promise.all([
    User.deleteMany(),
    Course.deleteMany(),
    Section.deleteMany(),
    Lesson.deleteMany(),
    courseReviews.deleteMany(),
    ReportReview.deleteMany(),
    InstructorComment.deleteMany(),
  ]);
  console.log("Cleared all collections.");
};

const createUsers = async () => {
  const users = [];
  for (let i = 0; i < 100; i++) {
    console.log(`Creating user ${i + 1}/10...`);
    const hashedPassword = await bcrypt.hash("password123", 10);
    users.push({
      fullName: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      password: hashedPassword,
      role: faker.helpers.arrayElement(["student", "instructor"]),
      biography: faker.lorem.sentence(15),
      udemyCredits: faker.number.int({ min: 0, max: 100 }),
    });
  }
  const createdUsers = await User.insertMany(users);
  console.log(
    "Users created successfully:",
    createdUsers.map((user) => user.email)
  );
  return createdUsers;
};

const createCourses = async () => {
  const instructors = await User.find({ role: "instructor" });
  if (instructors.length === 0) {
    throw new Error("No instructors found for course creation.");
  }

  const courses = [];
  for (let i = 0; i < 2000; i++) {
    console.log(`Creating course ${i + 1}...`);

    const instructor = faker.helpers.arrayElement(instructors);
    const parentCategory = faker.helpers.arrayElement(
      Object.keys(courseCategories)
    );
    const subCategories = courseCategories[parentCategory].subCategories;
    const subCategory = faker.helpers.arrayElement(Object.keys(subCategories));
    const topic = faker.helpers.arrayElement(subCategories[subCategory]);

    const course = await Course.create({
      courseName: faker.lorem.words(3),
      courseImg: faker.image.urlPicsumPhotos({
        width: 640,
        height: 480,
        category: "education",
      }),
      courseDescription: faker.lorem.paragraph(),
      coursePrice: faker.commerce.price(10, 500, 2),
      category: parentCategory,
      subCategory: subCategory,
      courseTopic: topic,
      courseLevel: faker.helpers.arrayElement([
        "Beginner",
        "Intermediate",
        "Advanced",
      ]),
      courseLanguages: faker.helpers.arrayElement([
        "English",
        "Spanish",
        "French",
        "German",
      ]),
      courseInstructor: instructor._id,
      moneyBackGuarantee: faker.date.soon(30),
      averageRating: 0,
      totalRatings: 0,
      totalStudentsEnrolled: { students: [], count: 0 },
      isActive: faker.datatype.boolean(),
      sections: [],
      lessons: [],
      reviews: [],
    });

    courses.push(course);
    console.log(`Course ${i + 1} created:`, course.courseName);
  }
  console.log("Courses created successfully.");
  return courses;
};

const createSections = async () => {
  console.log("Fetching courses for section creation...");
  const courses = await Course.find();
  if (courses.length === 0) {
    throw new Error("No courses found for section creation.");
  }

  console.log(`${courses.length} courses found.`);
  const sections = [];
  const courseIds = courses.map((course) => course._id);
  const sectionCount = 30; // Number of sections to create
  const courseSectionsMap = {}; // Map for batch updating courses with sections

  for (let i = 0; i < sectionCount; i++) {
    console.log(`Creating section ${i + 1}/${sectionCount}...`);

    try {
      const randomCourseId = faker.helpers.arrayElement(courseIds);

      const section = await Section.create({
        course: randomCourseId,
        title: faker.lorem.words(4),
        totalSectionDuration: 0,
        totalSectionLessons: 0,
        lessons: [],
      });

      // Track sections by course for batch update
      if (!courseSectionsMap[randomCourseId]) {
        courseSectionsMap[randomCourseId] = [];
      }
      courseSectionsMap[randomCourseId].push(section._id);

      sections.push(section);
      console.log(
        `Section ${i + 1} created:`,
        section.title,
        `Assigned to Course ID:`,
        randomCourseId
      );
    } catch (err) {
      console.error(`Error creating section ${i + 1}:`, err.message);
    }
  }

  console.log("Batch updating courses with section IDs...");
  try {
    await Promise.all(
      Object.keys(courseSectionsMap).map(async (courseId) => {
        const sectionIds = courseSectionsMap[courseId];
        await Course.findByIdAndUpdate(courseId, {
          $push: { sections: { $each: sectionIds } },
        });
        console.log(
          `Updated Course ID: ${courseId} with sections:`,
          sectionIds
        );
      })
    );
  } catch (err) {
    console.error("Error during batch update of courses:", err.message);
  }

  console.log("Sections created successfully.");
  return sections;
};

const createLessons = async () => {
  const sections = await Section.find();
  if (sections.length === 0) {
    throw new Error("No sections found for lesson creation.");
  }

  const sectionIds = sections.map((section) => section._id);
  const totalLessons = 10; // Total number of lessons to create
  const lessons = [];

  for (let i = 0; i < totalLessons; i++) {
    console.log(`Creating lesson ${i + 1}/${totalLessons}...`);
    const randomSectionId = faker.helpers.arrayElement(sectionIds);

    const lesson = await Lesson.create({
      section: randomSectionId,
      title: faker.lorem.words(3),
      videoUrl: faker.internet.url(),
      duration: faker.number.int({ min: 5, max: 30 }),
      order: faker.number.int({ min: 1, max: 20 }),
    });

    const section = await Section.findById(randomSectionId);
    section.lessons.push(lesson._id);
    section.totalSectionDuration += lesson.duration;
    section.totalSectionLessons += 1;
    await section.save();

    lessons.push(lesson);
    console.log(
      `Lesson ${i + 1} created:`,
      lesson.title,
      `Assigned to Section:`,
      section.title
    );
  }

  console.log(
    "Lessons created successfully:",
    lessons.map((lesson) => lesson.title)
  );
  return lessons;
};

const createReviews = async () => {
  const courses = await Course.find();
  const students = await User.find({ role: "student" });

  if (courses.length === 0 || students.length === 0) {
    throw new Error("No courses or students found for review creation.");
  }

  const courseIds = courses.map((course) => course._id);
  const totalReviews = 5;
  const reviews = [];

  for (let i = 0; i < totalReviews; i++) {
    console.log(`Creating review ${i + 1}/${totalReviews}...`);
    const randomCourseId = faker.helpers.arrayElement(courseIds);
    const randomStudent = faker.helpers.arrayElement(students);

    const review = await courseReviews.create({
      user: randomStudent._id,
      courseReview: randomCourseId,
      rating: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
      comment: faker.lorem.sentence(),
    });

    const course = await Course.findById(randomCourseId);
    course.reviews.push(review._id);
    await course.save();

    reviews.push(review);
    console.log(
      `Review ${i + 1} created:`,
      review.comment,
      `For Course:`,
      course.courseName
    );
  }

  console.log(
    "Reviews created successfully:",
    reviews.map((review) => review.comment)
  );
  return reviews;
};

const createReportedReviews = async () => {
  const reviews = await courseReviews.find();
  const students = await User.find({ role: "student" });

  if (reviews.length === 0 || students.length === 0) {
    throw new Error("No reviews or students found for reporting.");
  }

  const totalReports = 5;

  for (let i = 0; i < totalReports; i++) {
    console.log(`Creating report ${i + 1}/${totalReports}...`);
    const randomReview = faker.helpers.arrayElement(reviews);
    const randomStudent = faker.helpers.arrayElement(students);
    const randomIssueType = faker.helpers.arrayElement(allowedIssueTypes); // Select a valid issueType

    try {
      const report = await ReportReview.create({
        user: randomStudent._id,
        review: randomReview._id,
        issueType: randomIssueType, // Include the issueType
        issueDetails: faker.lorem.sentence(),
      });

      randomReview.reports = randomReview.reports || { count: 0, entries: [] };
      randomReview.reports.entries.push(report._id);
      randomReview.reports.count += 1;
      await randomReview.save();

      console.log(
        `Report ${i + 1} created for Review:`,
        randomReview.comment,
        `Reported by:`,
        randomStudent.email,
        `Issue Type:`,
        randomIssueType
      );
    } catch (err) {
      console.error(`Error creating report ${i + 1}:`, err.message);
    }
  }

  console.log("Reported reviews created successfully.");
};

const generateUpdatedDummyData = async () => {
  try {
    await connectDb();
    console.log("Database connection established.");
    await clearCollections();

    console.log("Seeding users...");
    const users = await createUsers();
    console.log(`${users.length} users created.`);

    console.log("Seeding courses...");
    const courses = await createCourses();
    console.log(`${courses.length} courses created.`);

    console.log("Seeding sections...");
    const sections = await createSections();
    console.log(`${sections.length} sections created.`);

    console.log("Seeding lessons...");
    const lessons = await createLessons();
    console.log(`${lessons.length} lessons created.`);

    console.log("Seeding reviews...");
    const reviews = await createReviews();
    console.log(`${reviews.length} reviews created.`);

    console.log("Seeding reported reviews...");
    await createReportedReviews();

    console.log("All dummy data seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("Error generating dummy data:", err.message);
    process.exit(1);
  }
};

generateUpdatedDummyData();