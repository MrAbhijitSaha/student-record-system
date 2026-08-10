import { auth } from "../src/lib/auth";
import prisma from "../src/lib/database/dbClient";

type UserRole = "admin" | "student" | "teacher";

type CreateUserInput = {
  name: string;
  email: string;
  username: string;
  password: string;
  role: UserRole;
};

/**
 * --------------------------------------------------------------------------
 * ENVIRONMENT VARIABLES
 * --------------------------------------------------------------------------
 */

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;
const adminUsername = process.env.ADMIN_USERNAME;

const studentPassword = process.env.STUDENT_PASSWORD;
const teacherPassword = process.env.TEACHER_PASSWORD;

if (!adminEmail || !adminPassword || !adminUsername) {
  throw new Error(
    "ADMIN_EMAIL, ADMIN_PASSWORD and ADMIN_USERNAME must be defined in .env",
  );
}

if (!studentPassword) {
  throw new Error("STUDENT_PASSWORD must be defined in .env");
}

if (!teacherPassword) {
  throw new Error("TEACHER_PASSWORD must be defined in .env");
}

/**
 * --------------------------------------------------------------------------
 * CREATE USER
 * --------------------------------------------------------------------------
 *
 * Better Auth handles:
 * - Password hashing
 * - User creation
 * - Account creation
 *
 * If the user already exists, we update the username/displayUsername/role.
 */

async function createUser({
  name,
  email,
  username,
  password,
  role,
}: CreateUserInput) {
  let user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  /**
   * User already exists
   */
  if (user) {
    user = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        username,
        displayUsername: username,
        role,
      },
    });

    console.log(`✓ User already exists: ${username}`);

    return user;
  }

  /**
   * Create user through Better Auth
   */
  const result = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
      username,
    },
  });

  if (!result.user) {
    throw new Error(`Failed to create user: ${email}`);
  }

  /**
   * Set application-specific fields
   */
  user = await prisma.user.update({
    where: {
      id: result.user.id,
    },
    data: {
      username,
      displayUsername: username,
      role,
    },
  });

  console.log(`✓ Created ${role}: ${username}`);

  return user;
}

/**
 * --------------------------------------------------------------------------
 * ADMIN
 * --------------------------------------------------------------------------
 */

async function seedAdmin() {
  console.log("\n👑 Creating admin...");

  const admin = await createUser({
    name: "Administrator",
    email: adminEmail,
    username: adminUsername,
    password: adminPassword,
    role: "admin",
  });

  console.log(`✓ Admin ready: ${admin.username}`);

  return admin;
}

/**
 * --------------------------------------------------------------------------
 * STUDENTS
 * --------------------------------------------------------------------------
 *
 * totalFees and dueFees are stored in minor currency units (paise).
 *
 * Example:
 * ₹50,000.00 -> 5,000,000 paise
 * ₹12,000.00 -> 1,200,000 paise
 */

const students = [
  {
    name: "Rahul Sharma",
    username: "rahul.student",
    email: "rahul.student@example.com",
    fullName: "Rahul Sharma",
    studentId: "STU001",
    course: "Computer Science",
    phone: "9876543210",
    address: "Kolkata, West Bengal",
    dateOfBirth: new Date("2004-05-15"),
    gender: "Male",
    admissionDate: new Date("2025-07-01"),
    status: "active",
    totalFees: 5_000_000,
    dueFees: 1_200_000,
  },
  {
    name: "Priya Das",
    username: "priya.student",
    email: "priya.student@example.com",
    fullName: "Priya Das",
    studentId: "STU002",
    course: "Information Technology",
    phone: "9876543211",
    address: "Howrah, West Bengal",
    dateOfBirth: new Date("2005-02-20"),
    gender: "Female",
    admissionDate: new Date("2025-07-01"),
    status: "active",
    totalFees: 5_500_000,
    dueFees: 500_000,
  },
  {
    name: "Arjun Roy",
    username: "arjun.student",
    email: "arjun.student@example.com",
    fullName: "Arjun Roy",
    studentId: "STU003",
    course: "Data Science",
    phone: "9876543212",
    address: "Salt Lake, Kolkata",
    dateOfBirth: new Date("2004-11-10"),
    gender: "Male",
    admissionDate: new Date("2025-07-01"),
    status: "active",
    totalFees: 6_000_000,
    dueFees: 2_000_000,
  },
];

async function seedStudents() {
  console.log("\n👨‍🎓 Creating students...");

  for (const student of students) {
    const user = await createUser({
      name: student.name,
      email: student.email,
      username: student.username,
      password: studentPassword,
      role: "student",
    });

    const existingStudent = await prisma.student.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (existingStudent) {
      console.log(`✓ Student profile already exists: ${student.studentId}`);
      continue;
    }

    await prisma.student.create({
      data: {
        userId: user.id,
        fullName: student.fullName,
        studentId: student.studentId,
        photo: null,
        course: student.course,
        phone: student.phone,
        email: student.email,
        address: student.address,
        dateOfBirth: student.dateOfBirth,
        gender: student.gender,
        admissionDate: student.admissionDate,
        status: student.status,
        totalFees: student.totalFees,
        dueFees: student.dueFees,
      },
    });

    console.log(`✓ Student profile created: ${student.studentId}`);
  }
}

/**
 * --------------------------------------------------------------------------
 * TEACHERS
 * --------------------------------------------------------------------------
 */

const teachers = [
  {
    name: "Amit Sen",
    username: "amit.teacher",
    email: "amit.teacher@example.com",
    fullName: "Amit Sen",
    teacherId: "TCH001",
    department: "Computer Science",
    phone: "9876543220",
    address: "Kolkata, West Bengal",
    dateOfBirth: new Date("1988-04-12"),
    gender: "Male",
    joiningDate: new Date("2024-07-01"),
    status: "active",
  },
  {
    name: "Sneha Mukherjee",
    username: "sneha.teacher",
    email: "sneha.teacher@example.com",
    fullName: "Sneha Mukherjee",
    teacherId: "TCH002",
    department: "Information Technology",
    phone: "9876543221",
    address: "New Town, Kolkata",
    dateOfBirth: new Date("1990-09-18"),
    gender: "Female",
    joiningDate: new Date("2024-07-01"),
    status: "active",
  },
];

async function seedTeachers() {
  console.log("\n👨‍🏫 Creating teachers...");

  for (const teacher of teachers) {
    const user = await createUser({
      name: teacher.name,
      email: teacher.email,
      username: teacher.username,
      password: teacherPassword,
      role: "teacher",
    });

    const existingTeacher = await prisma.teacher.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (existingTeacher) {
      console.log(`✓ Teacher profile already exists: ${teacher.teacherId}`);
      continue;
    }

    await prisma.teacher.create({
      data: {
        userId: user.id,
        teacherId: teacher.teacherId,
        fullName: teacher.fullName,
        photo: null,
        department: teacher.department,
        phone: teacher.phone,
        email: teacher.email,
        address: teacher.address,
        dateOfBirth: teacher.dateOfBirth,
        gender: teacher.gender,
        joiningDate: teacher.joiningDate,
        status: teacher.status,
      },
    });

    console.log(`✓ Teacher profile created: ${teacher.teacherId}`);
  }
}

/**
 * --------------------------------------------------------------------------
 * MAIN
 * --------------------------------------------------------------------------
 */

async function main() {
  console.log("======================================");
  console.log("🌱 Starting Prisma database seed...");
  console.log("======================================");

  await seedAdmin();
  await seedStudents();
  await seedTeachers();

  console.log("\n======================================");
  console.log("✅ Database seed completed!");
  console.log("======================================");
}

main()
  .catch((error) => {
    console.error("\n❌ Seed failed:");
    console.error(error);

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
