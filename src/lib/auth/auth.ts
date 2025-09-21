import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInFormSchema } from "../schemas/auth.schema";
import prisma from "../prisma";
import * as bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const { data, success } = signInFormSchema.safeParse(credentials);
        if (!success) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: { email: data.email },
        });

        if (!user || !user.password) {
          return null;
        }
        const isMatch = await bcrypt.compare(data.password, user.password);
        if (!isMatch) {
          return null;
        }
        return user;
      },
    }),
  ],
});
