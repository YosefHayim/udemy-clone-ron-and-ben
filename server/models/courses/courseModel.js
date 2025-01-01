const mongoose = require("mongoose");

const courseCategories = {
  Development: {
    subCategories: {
      "Web Development": ["JavaScript", "HTML", "CSS", "React", "Node.js"],
      "Data Science": [
        "Python",
        "R",
        "SQL",
        "Machine Learning",
        "Deep Learning",
      ],
      "Mobile Development": ["Swift", "Kotlin", "Flutter", "React Native"],
    },
  },
  Business: {
    subCategories: {
      Entrepreneurship: ["Business Strategy", "Leadership", "Startups"],
      Communication: ["Public Speaking", "Writing", "Negotiation"],
      "Project Management": ["Agile", "Scrum", "PMP", "Risk Management"],
    },
  },
  "Finance & Accounting": {
    subCategories: {
      "Accounting & Bookkeeping": [
        "QuickBooks",
        "Financial Statements",
        "Tax Preparation",
      ],
      "Investing & Trading": ["Stock Trading", "Cryptocurrency", "Options"],
      "Personal Finance": [
        "Budgeting",
        "Retirement Planning",
        "Debt Reduction",
      ],
    },
  },
  "IT & Software": {
    subCategories: {
      "IT Certifications": ["AWS Certification", "CompTIA", "Cisco"],
      "Network & Security": [
        "Cybersecurity",
        "Ethical Hacking",
        "Network Administration",
      ],
      Hardware: ["Computer Repair", "IoT", "Raspberry Pi"],
    },
  },
  Design: {
    subCategories: {
      "Graphic Design": ["Photoshop", "Illustrator", "Canva"],
      "UI/UX Design": ["Wireframing", "Prototyping", "Figma", "Sketch"],
      "3D & Animation": ["Blender", "Maya", "3ds Max"],
    },
  },
  Marketing: {
    subCategories: {
      "Digital Marketing": [
        "SEO",
        "Google Ads",
        "Content Marketing",
        "Social Media Marketing",
      ],
      Branding: ["Logo Design", "Brand Identity", "Storytelling"],
      "Analytics & Automation": [
        "Google Analytics",
        "Marketing Automation Tools",
      ],
    },
  },
  Lifestyle: {
    subCategories: {
      "Arts & Crafts": ["Painting", "Drawing", "Knitting"],
      "Health & Fitness": ["Yoga", "Nutrition", "Personal Training"],
      "Travel & Hobbies": ["Travel Planning", "Photography", "Gardening"],
    },
  },
};

const courseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: [
        true,
        "To register a course, you must provide a name for the course",
      ],
    },
    courseDescription: {
      type: String,
      required: [true, "A course description is required"],
    },
    coursePrice: {
      type: Number,
      required: [true, "Course price must be provided"],
      min: [0, "Price cannot be negative"],
    },
    courseParentCategory: {
      type: String,
      required: [true, "Parent category is required"],
      enum: Object.keys(courseCategories),
    },
    courseSubCategory: {
      type: String,
      required: [true, "Subcategory is required"],
      validate: {
        validator: function (value) {
          return Object.keys(
            courseCategories[this.courseParentCategory]?.subCategories || {}
          ).includes(value);
        },
        message: "Invalid subcategory for the selected parent category",
      },
    },
    courseTopic: {
      type: String,
      required: [true, "Topic is required"],
      validate: {
        validator: function (value) {
          return (
            courseCategories[this.courseParentCategory]?.subCategories[
              this.courseSubCategory
            ]?.includes(value) || false
          );
        },
        message: "Invalid topic for the selected subcategory",
      },
    },
    courseLevel: {
      type: String,
      required: true,
      enum: ["Beginner", "Intermediate", "Advanced", "All Levels"],
    },
    courseLanguages: {
      type: String,
      required: true,
      enum: ["English", "Spanish", "French", "German", "Other"],
    },
    courseInstructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Instructor is required"],
    },
    analyticsOfCourse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseAnalytics",
    },
    moneyBackGuarantee: {
      type: Date,
      validate: {
        validator: function (value) {
          return value <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        },
        message: "Money-back guarantee date must be within 30 days",
      },
    },
    sections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
      },
    ],
    lessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "reviews",
      },
    ],
  },
  { timestamps: true }
);

courseSchema.pre(/^find/, function (next) {
  this.populate("analyticsOfCourse");
  next();
});

// courseSchema.pre(/^find/, function (next) {
//   this.populate("courseInstructor");
//   next();
// });

// courseSchema.pre(/^find/, function (next) {
//   this.populate("sections");
//   next();
// });

// courseSchema.pre(/^find/, function (next) {
//   this.populate("lessons");
//   next();
// });

// Pre-save validation for category relationships
courseSchema.pre("save", function (next) {
  const parentCategory = this.courseParentCategory;
  const subCategories = courseCategories[parentCategory]?.subCategories;

  if (!subCategories || !subCategories[this.courseSubCategory]) {
    return next(
      new Error("Invalid subcategory for the selected parent category")
    );
  }

  const topics = subCategories[this.courseSubCategory];
  if (!topics.includes(this.courseTopic)) {
    return next(new Error("Invalid topic for the selected subcategory"));
  }

  next();
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
