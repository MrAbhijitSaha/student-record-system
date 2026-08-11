import z from "zod";
import { loginFormSchema } from "./zodSchema";

export type LoginFormSchemaType = z.infer<typeof loginFormSchema>;
