import { prisma } from "../lib/prisma.js";

const initialJobs = [
  {
    title: "Front-End Developer",
    company: "EvyX",
    description: "React.js and Tailwind CSS",
  },
  {
    title: "Back-End Engineer",
    company: "Tech Solutions",
    description: "Node.js and PostgreSQL",
  },
  {
    title: "Full-Stack Developer",
    company: "StartUp Inc",
    description: "Next.js and Prisma",
  },
  {
    title: "UI/UX Designer",
    company: "Creative Agency",
    description: "Figma and Prototyping",
  },
  {
    title: "Mobile Developer",
    company: "App Works",
    description: "React Native and Expo",
  },
  {
    title: "DevOps Engineer",
    company: "Cloud Masters",
    description: "Docker and Kubernetes",
  },
  {
    title: "Quality Assurance",
    company: "Bug Hunters",
    description: "Automation Testing",
  },
  {
    title: "Product Manager",
    company: "EvyX",
    description: "Roadmapping and Strategy",
  },
  {
    title: "Data Scientist",
    company: "Data Inc",
    description: "Python and ML",
  },
  {
    title: "Security Specialist",
    company: "Cyber Shield",
    description: "Ethical Hacking",
  },
];

const seedJobs = async () => {
  try {
    const jobsCount = await prisma.job.count();
    const userCount = await prisma.user.count();

    if (userCount === 0) {
      console.log("No users found. Seeding 10 initial users...");

      await prisma.user.create({
        data: { email: "john.doe@example.com", password: "0000" },
      });

      console.log("10 users seeded successfully!");
    } else {
      console.log(" Database already has users. Skipping seeding.");
    }
    if (jobsCount === 0) {
      console.log("No jobs found. Seeding 10 initial jobs...");

      await prisma.job.createMany({
        data: initialJobs,
      });

      console.log("10 jobs seeded successfully!");
    } else {
      console.log(" Database already has jobs. Skipping seeding.");
    }
  } catch (error) {
    console.error(" Error seeding database:", error);
  }
};

export { seedJobs };
