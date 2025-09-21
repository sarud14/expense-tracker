import z from "zod";

export const signUpFormSchema = z.object({
  firstName: z.string().min(1).trim(),
  lastName: z.string().min(1).trim(),
  email: z.email(),
  password: z.string().regex(/^[a-zA-Z0-9]{6,}/),
});

export const signInFormSchema = signUpFormSchema.pick({
  email: true,
  password: true,
});
