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
