"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import prisma from "@/lib/database/dbClient";
import { rollbackUser } from "@/lib/rollbackUser";
import { addTeacherAndStudentSchema } from "@/lib/zodSchema";
import { Prisma } from "@generated/prisma/client";
import { saveProfilePicture } from "./saveProfilePicture";

type ActionResult = {
  success: boolean;
  message: string;
  id?: string;
};

const MAX_PHOTO_SIZE = 5 * 1024 * 1024;

const ALLOWED_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function createTeacherOrStudent(
  formData: FormData,
): Promise<ActionResult> {
  let photoPath: string | null = null;
  let userId: string | null = null;

  try {
    // -----------------------------------------
    // 1. Authentication
    // -----------------------------------------

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return {
        success: false,
        message: "You must be logged in.",
      };
    }

    // -----------------------------------------
    // 2. Admin only
    // -----------------------------------------

    if (session.user.role !== "admin") {
      return {
        success: false,
        message: "You are not authorized to perform this action.",
      };
    }

    // -----------------------------------------
    // 3. Server-side validation
    // -----------------------------------------

    const payload = Object.fromEntries(formData.entries());

    const parsed = addTeacherAndStudentSchema.safeParse(payload);

    if (!parsed.success) {
      return {
        success: false,
        message: "Please check the submitted values.",
      };
    }

    const data = parsed.data;

    // -----------------------------------------
    // 4. Photo validation
    // -----------------------------------------

    const photo = data.photo;

    if (photo instanceof File && photo.size > 0) {
      if (photo.size > MAX_PHOTO_SIZE) {
        return {
          success: false,
          message: "Photo must be smaller than 5 MB.",
        };
      }

      if (!ALLOWED_PHOTO_TYPES.includes(photo.type)) {
        return {
          success: false,
          message: "Only JPG, PNG, and WebP images are allowed.",
        };
      }
    }

    // -----------------------------------------
    // 5. Check Student / Teacher ID
    // -----------------------------------------

    if (data.role === "student") {
      const existingStudent = await prisma.student.findUnique({
        where: {
          studentId: data.idNumber,
        },
      });

      if (existingStudent) {
        return {
          success: false,
          message: "This Student ID already exists.",
        };
      }
    }

    if (data.role === "teacher") {
      const existingTeacher = await prisma.teacher.findUnique({
        where: {
          teacherId: data.idNumber,
        },
      });

      if (existingTeacher) {
        return {
          success: false,
          message: "This Teacher ID already exists.",
        };
      }
    }

    // -----------------------------------------
    // 6. Check email
    // -----------------------------------------

    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      return {
        success: false,
        message: "An account with this email already exists.",
      };
    }

    // -----------------------------------------
    // 7. Save profile picture
    // -----------------------------------------

    if (photo instanceof File && photo.size > 0) {
      photoPath = await saveProfilePicture(photo);
    }

    // -----------------------------------------
    // 8. Create Better Auth user
    // -----------------------------------------

    const result = await auth.api.createUser({
      headers: await headers(),

      body: {
        name: data.fullName,
        email: data.email,
        password: data.password,
        role: data.role,

        data: {
          username: data.idNumber,
          displayUsername: data.idNumber,
        },
      },
    });

    if (!result?.user) {
      if (photoPath) {
        // Clean up uploaded photo if account creation fails.
        // Keep this cleanup best-effort.
        try {
          // Add your deleteProfilePicture helper here.
        } catch (cleanupError) {
          console.error("Photo cleanup failed:", cleanupError);
        }
      }

      return {
        success: false,
        message: "Failed to create account.",
      };
    }

    userId = result.user.id;

    // -----------------------------------------
    // 9. Create profile
    // -----------------------------------------

    if (data.role === "student") {
      const totalFees = Number(data.totalFees);

      const student = await prisma.student.create({
        data: {
          userId,

          studentId: data.idNumber,
          fullName: data.fullName,

          email: data.email,

          phone: data.phone || null,
          address: data.address || null,

          course: data.course,

          dateOfBirth: new Date(data.dateOfBirth),

          admissionDate: new Date(data.admissionDate),

          gender: data.gender,

          status: data.status,

          totalFees,

          photo: photoPath,
        },
      });

      return {
        success: true,
        message: "Student created successfully.",
        id: student.id,
      };
    }

    const teacher = await prisma.teacher.create({
      data: {
        userId,

        teacherId: data.idNumber,
        fullName: data.fullName,

        email: data.email,

        phone: data.phone || null,
        address: data.address || null,

        dateOfBirth: new Date(data.dateOfBirth),

        joiningDate: new Date(data.admissionDate),

        gender: data.gender,

        status: data.status,

        photo: photoPath,
      },
    });

    return {
      success: true,
      message: "Teacher created successfully.",
      id: teacher.id,
    };
  } catch (error) {
    console.error("Create teacher/student error:", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const target =
        Array.isArray(error.meta?.target) ?
          error.meta.target.join(",")
        : String(error.meta?.target ?? "");

      await rollbackUser(userId);

      if (target.includes("email")) {
        return {
          success: false,
          message: "An account with this email already exists.",
        };
      }

      if (target.includes("studentId")) {
        return {
          success: false,
          message: "This Student ID already exists.",
        };
      }

      if (target.includes("teacherId")) {
        return {
          success: false,
          message: "This Teacher ID already exists.",
        };
      }

      return {
        success: false,
        message: "Some submitted information already exists.",
      };
    }

    await rollbackUser(userId);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
