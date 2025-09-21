import { signInFormSchema, signUpFormSchema } from "@/lib/schemas/auth.schema";
import z from "zod";

export type SignUpFromInput = z.infer<typeof signUpFormSchema>
export type SignInFromInput = z.infer<typeof signInFormSchema>