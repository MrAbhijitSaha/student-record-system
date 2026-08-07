import z from "zod";

export const loginFormSchema = z.object({
  userName: z
    .string()
    .min(8, { error: "Your Id can not less than 8 charecters" })
    .max(88, { error: "Your Id can not more than 8 charecters" }),
  password: z
    .string()
    .min(6, { error: "Your password is not less than 6 charecter" })
    .max(12, { error: "Your password is not more than 12 charecters" }),
});

export const AddTeacherAndStudentForm = z.object({});
