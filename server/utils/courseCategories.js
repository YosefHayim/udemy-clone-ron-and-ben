const courseCategories = {
  Development: {
    subCategories: {
      "Web Development": [
        "JavaScript",
        "HTML",
        "CSS",
        "React",
        "Node.js",
        "Django",
        "PHP",
        "Ruby on Rails",
      ],
      "Data Science": [
        "Python",
        "R",
        "SQL",
        "Machine Learning",
        "Deep Learning",
        "Data Visualization",
      ],
      "Mobile Development": [
        "Swift",
        "Kotlin",
        "Flutter",
        "React Native",
        "Android Development",
        "iOS Development",
      ],
      "Game Development": ["Unity", "Unreal Engine", "C#", "Game Design"],
      "Software Development": ["Software Testing", "DevOps", "APIs", "Git"],
    },
  },
  Business: {
    subCategories: {
      Entrepreneurship: [
        "Business Strategy",
        "Leadership",
        "Startups",
        "Freelancing",
      ],
      Communication: ["Public Speaking", "Writing", "Negotiation"],
      "Project Management": [
        "Agile",
        "Scrum",
        "PMP",
        "Risk Management",
        "Kanban",
      ],
      "Business Analytics": ["Excel", "Power BI", "Tableau", "Data Analysis"],
      Sales: ["B2B Sales", "Sales Skills", "Customer Relationship"],
    },
  },
  "Finance & Accounting": {
    subCategories: {
      "Accounting & Bookkeeping": [
        "QuickBooks",
        "Financial Statements",
        "Tax Preparation",
      ],
      "Investing & Trading": [
        "Stock Trading",
        "Cryptocurrency",
        "Options",
        "Forex Trading",
      ],
      "Personal Finance": [
        "Budgeting",
        "Retirement Planning",
        "Debt Reduction",
        "Credit Score Management",
      ],
    },
  },
  "IT & Software": {
    subCategories: {
      "IT Certifications": [
        "AWS Certification",
        "CompTIA",
        "Cisco",
        "Microsoft Azure",
      ],
      "Network & Security": [
        "Cybersecurity",
        "Ethical Hacking",
        "Network Administration",
        "Penetration Testing",
      ],
      Hardware: ["Computer Repair", "IoT", "Raspberry Pi", "Arduino"],
      "Software Engineering Tools": ["JIRA", "Trello", "Docker", "Kubernetes"],
    },
  },
  Design: {
    subCategories: {
      "Graphic Design": [
        "Photoshop",
        "Illustrator",
        "Canva",
        "InDesign",
        "CorelDRAW",
      ],
      "UI/UX Design": [
        "Wireframing",
        "Prototyping",
        "Figma",
        "Sketch",
        "Adobe XD",
      ],
      "3D & Animation": ["Blender", "Maya", "3ds Max", "Cinema 4D"],
      "Interior Design": ["Home Design", "3D Rendering", "SketchUp"],
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
        "A/B Testing",
      ],
      "Affiliate Marketing": [
        "Amazon Affiliate",
        "ClickBank",
        "Commission Junction",
      ],
    },
  },
  Lifestyle: {
    subCategories: {
      "Arts & Crafts": ["Painting", "Drawing", "Knitting", "Calligraphy"],
      "Health & Fitness": [
        "Yoga",
        "Nutrition",
        "Personal Training",
        "Meditation",
      ],
      "Travel & Hobbies": [
        "Travel Planning",
        "Photography",
        "Gardening",
        "Cooking",
      ],
      Music: ["Guitar", "Piano", "Music Production", "Singing"],
    },
  },
  "Personal Development": {
    subCategories: {
      Productivity: ["Time Management", "Focus", "Habits"],
      "Personal Finance": ["Budgeting", "Investing Basics", "Saving Money"],
      "Career Development": ["Resume Writing", "Interviewing", "Job Searching"],
      "Confidence & Self-Esteem": [
        "Public Speaking",
        "Assertiveness",
        "Mindset",
      ],
    },
  },
  Teaching: {
    subCategories: {
      "Instructional Design": ["E-Learning", "Course Creation"],
      "Teaching Tools": ["Google Classroom", "Zoom", "Moodle"],
      "Academic Subjects": ["Math", "Science", "English"],
    },
  },
};

module.exports = courseCategories;
