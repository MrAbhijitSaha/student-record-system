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

async function createUser({
  name,
  email,
  username,
  password,
  role,
}: CreateUserInput) {
  // Check by email first
  let user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // If user already exists, update username/role
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

  // Create user through Better Auth.
  // Better Auth handles password hashing and Account creation.
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

  // Set username + role explicitly
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

/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
*/

async function seedAdmin() {
  console.log("\n👑 Creating admin...");

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const username = process.env.ADMIN_USERNAME;

  if (!email || !password || !username) {
    throw new Error(
      "ADMIN_EMAIL, ADMIN_PASSWORD and ADMIN_USERNAME must be defined in .env",
    );
  }

  const admin = await createUser({
    name: "Administrator",
    email,
    username,
    password,
    role: "admin",
  });

  console.log(`✓ Admin ready: ${admin.username}`);

  return admin;
}

/*
|--------------------------------------------------------------------------
| STUDENTS
|--------------------------------------------------------------------------
*/

async function seedStudents() {
  console.log("\n👨‍🎓 Creating students...");

  const students = [
    {
      name: "Rahul Sharma",
      username: "rahul.student",
      email: "rahul.student@example.com",
      password: "Student@123",
      fullName: "Rahul Sharma",
      studentId: "STU001",
      course: "Computer Science",
      phone: "9876543210",
      address: "Kolkata, West Bengal",
      dateOfBirth: new Date("2004-05-15"),
      gender: "Male",
      admissionDate: new Date("2025-07-01"),
      status: "active",
      totalFees: "50000",
      dueFees: "12000",
    },

    {
      name: "Priya Das",
      username: "priya.student",
      email: "priya.student@example.com",
      password: "Student@123",
      fullName: "Priya Das",
      studentId: "STU002",
      course: "Information Technology",
      phone: "9876543211",
      address: "Howrah, West Bengal",
      dateOfBirth: new Date("2005-02-20"),
      gender: "Female",
      admissionDate: new Date("2025-07-01"),
      status: "active",
      totalFees: "55000",
      dueFees: "5000",
    },

    {
      name: "Arjun Roy",
      username: "arjun.student",
      email: "arjun.student@example.com",
      password: "Student@123",
      fullName: "Arjun Roy",
      studentId: "STU003",
      course: "Data Science",
      phone: "9876543212",
      address: "Salt Lake, Kolkata",
      dateOfBirth: new Date("2004-11-10"),
      gender: "Male",
      admissionDate: new Date("2025-07-01"),
      status: "active",
      totalFees: "60000",
      dueFees: "20000",
    },
  ];

  for (const student of students) {
    const user = await createUser({
      name: student.name,
      email: student.email,
      username: student.username,
      password: student.password,
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

/*
|--------------------------------------------------------------------------
| TEACHERS
|--------------------------------------------------------------------------
*/

async function seedTeachers() {
  console.log("\n👨‍🏫 Creating teachers...");

  const teachers = [
    {
      name: "Amit Sen",
      username: "amit.teacher",
      email: "amit.teacher@example.com",
      password: "Teacher@123",
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
      password: "Teacher@123",
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

  for (const teacher of teachers) {
    const user = await createUser({
      name: teacher.name,
      email: teacher.email,
      username: teacher.username,
      password: teacher.password,
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

/*
|--------------------------------------------------------------------------
| MAIN
|--------------------------------------------------------------------------
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

  console.log("\n🔐 TEST LOGIN ACCOUNTS");
  console.log("--------------------------------------");

  console.log("\nADMIN");
  console.log("Username: admin@2005");
  console.log("Password: password");

  console.log("\nSTUDENTS");
  console.log("rahul.student / Student@123");
  console.log("priya.student / Student@123");
  console.log("arjun.student / Student@123");

  console.log("\nTEACHERS");
  console.log("amit.teacher / Teacher@123");
  console.log("sneha.teacher / Teacher@123");

  console.log("\n======================================");
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
