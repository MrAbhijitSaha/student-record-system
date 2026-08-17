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

export const addTeacherAndStudentSchema = z.object({
  role: z.enum(["student", "teacher"], {
    error: "Please select a role",
  }),

  idNumber: z.string().min(8, "ID is required").max(8, "ID is too long"),

  fullName: z
    .string()
    .min(2, "Full name is required")
    .max(100, "Full name is too long"),

  email: z.email("Enter a valid email address"),

  phone: z
    .string()
    .min(10, "Phone number is required")
    .max(10, "Phone number is too long"),

  address: z
    .string()
    .min(1, "Address is required")
    .max(500, "Address is too long"),

  dateOfBirth: z.string().min(1, "Date of birth is required"),

  gender: z.enum(["male", "female", "other"], {
    error: "Please select gender",
  }),

  admissionDate: z.string().min(1, "Admission/joining date is required"),

  course: z.string().min(2, "Course is required"),

  status: z.enum(["active", "inactive"], {
    error: "Please select status",
  }),

  totalFees: z
    .string()
    .min(1, "Total fees is required")
    .refine((value) => /^\d+$/.test(value), {
      message: "Fees must be a valid integer",
    })
    .refine((value) => Number.isSafeInteger(Number(value)), {
      message: "Fees must be a valid integer",
    })
    .refine((value) => Number(value) >= 0, {
      message: "Fees cannot be negative",
    }),

  password: z.string().min(8, "Password must be at least 8 characters"),

  photo: z.instanceof(File),
});
