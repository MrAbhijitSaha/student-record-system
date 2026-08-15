"use server";

import { AddTeacherAndStudentFormValues } from "@/lib/type";

export async function createStudent(values: AddTeacherAndStudentFormValues) {
  try {
    console.log(values);

    // এখানে পরে:
    // 1. validation
    // 2. Better Auth user create
    // 3. Prisma student create
    // 4. photo upload
    // করবে

    return {
      success: true,
      message: "Student created successfully.",
    };
  } catch (error) {
    console.error("Create student error:", error);

    return {
      success: false,
      message: "Failed to create student.",
    };
  }
}
