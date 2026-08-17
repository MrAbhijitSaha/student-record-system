"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import prisma from "@/lib/database/dbClient";
import { saveProfilePicture } from "./saveProfilePicture";

type ActionResult = {
  success: boolean;
  message: string;
  id?: string;
};

export async function createTeacherOrStudent(
  formData: FormData,
): Promise<ActionResult> {
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
    // 3. Get form values
    // -----------------------------------------

    const role = formData.get("role");
    const idNumber = formData.get("idNumber");
    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const password = formData.get("password");
    const phone = formData.get("phone");
    const address = formData.get("address");
    const dateOfBirth = formData.get("dateOfBirth");
    const gender = formData.get("gender");
    const admissionDate = formData.get("admissionDate");

    const course = formData.get("course");
    const status = formData.get("status");
    const totalFees = formData.get("totalFees");

    const photo = formData.get("photo");

    // -----------------------------------------
    // 4. Basic validation
    // -----------------------------------------

    if (
      typeof role !== "string" ||
      typeof idNumber !== "string" ||
      typeof fullName !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return {
        success: false,
        message: "Required fields are missing.",
      };
    }

    if (role !== "student" && role !== "teacher") {
      return {
        success: false,
        message: "Invalid account role.",
      };
    }

    // -----------------------------------------
    // 5. Check Student / Teacher ID
    // -----------------------------------------

    if (role === "student") {
      const existingStudent = await prisma.student.findUnique({
        where: {
          studentId: idNumber,
        },
      });

      if (existingStudent) {
        return {
          success: false,
          message: "This Student ID already exists.",
        };
      }
    }

    if (role === "teacher") {
      const existingTeacher = await prisma.teacher.findUnique({
        where: {
          teacherId: idNumber,
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
        email,
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

    let photoPath: string | null = null;

    if (photo instanceof File && photo.size > 0) {
      photoPath = await saveProfilePicture(photo);
    }

    // -----------------------------------------
    // 8. Create Better Auth user
    // -----------------------------------------

    const result = await auth.api.createUser({
      headers: await headers(),

      body: {
        name: fullName,
        email,
        password,
        role,

        data: {
          username: idNumber,
          displayUsername: idNumber,
        },
      },
    });

    if (!result?.user) {
      return {
        success: false,
        message: "Failed to create account.",
      };
    }

    const userId = result.user.id;

    // -----------------------------------------
    // 9. Create profile
    // -----------------------------------------

    try {
      if (role === "student") {
        const student = await prisma.student.create({
          data: {
            userId,

            studentId: idNumber,
            fullName,

            email,
            phone: typeof phone === "string" && phone ? phone : null,

            address: typeof address === "string" && address ? address : null,

            course: typeof course === "string" ? course : "",

            dateOfBirth:
              typeof dateOfBirth === "string" && dateOfBirth ?
                new Date(dateOfBirth)
              : null,

            admissionDate:
              typeof admissionDate === "string" && admissionDate ?
                new Date(admissionDate)
              : null,

            gender: typeof gender === "string" ? gender : null,

            status: typeof status === "string" ? status : "active",

            totalFees: typeof totalFees === "string" ? Number(totalFees) : 0,

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

          teacherId: idNumber,
          fullName,

          email,

          phone: typeof phone === "string" && phone ? phone : null,

          address: typeof address === "string" && address ? address : null,

          dateOfBirth:
            typeof dateOfBirth === "string" && dateOfBirth ?
              new Date(dateOfBirth)
            : null,

          joiningDate:
            typeof admissionDate === "string" && admissionDate ?
              new Date(admissionDate)
            : null,

          gender: typeof gender === "string" ? gender : null,

          status: typeof status === "string" ? status : "active",

          photo: photoPath,
        },
      });

      return {
        success: true,
        message: "Teacher created successfully.",
        id: teacher.id,
      };
    } catch (profileError) {
      console.error("Profile creation failed:", profileError);

      // Delete Better Auth user if profile creation fails
      try {
        await prisma.user.delete({ where: { id: userId } });
      } catch (rollbackError) {
        console.error(
          "Rollback failed. Orphaned auth user:",
          userId,
          rollbackError,
        );
      }

      return {
        success: false,
        message: "Account was not created because profile creation failed.",
      };
    }
  } catch (error) {
    console.error("Create teacher/student error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
