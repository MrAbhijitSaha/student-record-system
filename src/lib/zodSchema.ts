import z from "zod";

export const loginFormSchema = z.object({
  userName: z
    .string()
    .min(8, { error: "Your Id can not less than 8 charecters" })
    .max(88, { error: "Your Id can not more than 8 charecters" }),
  password: z.string().min(8, {
    error: "Password must be at least 8 characters",
  }),
});

export const AddTeacherAndStudentForm = z.object({});

export const addTeacherAndStudentSchema = z.object({
  idNumber: z
    .string()
    .trim()
    .min(1, "Student/Teacher ID is required")
    .max(50, "ID is too long"),

  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name is too long"),

  email: z.string().trim().email("Please enter a valid email address"),

  phone: z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number is too long"),

  address: z
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters")
    .max(300, "Address is too long"),

  dateOfBirth: z.string().min(1, "Date of birth is required"),

  gender: z.enum(["male", "female", "other"], {
    error: "Please select a gender",
  }),

  admissionDate: z.string().min(1, "Admission date is required"),

  course: z
    .string()
    .trim()
    .min(2, "Course is required")
    .max(100, "Course is too long"),

  status: z.enum(["active", "inactive"], {
    error: "Please select a status",
  }),

  totalFees: z.coerce.number().min(0, "Total fees cannot be negative"),

  dueFees: z.coerce.number().min(0, "Due fees cannot be negative"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password is too long"),

  photo: z.instanceof(File).optional(),
});
