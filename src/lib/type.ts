import z from "zod";
import { addTeacherAndStudentSchema, loginFormSchema } from "./zodSchema";

export type LoginFormSchemaType = z.infer<typeof loginFormSchema>;

export type AddTeacherAndStudentFormValues = z.infer<
  typeof addTeacherAndStudentSchema
>;
