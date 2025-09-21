import { SignUpFromInput } from "@/types/auth.type";
import prisma from "../prisma";
import * as bcrypt from "bcrypt";
import { AUTH_METHOD, AUTH_PROVIDER } from "@/constants/auth.constant";

async function signUPWithCredentials(
  data: SignUpFromInput
): Promise<void | { email: string }> {
  const existUser = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (existUser) {
    return { email: "Email already exist" };
  }
  data.password = await bcrypt.hash(data.password, 10);
  const user = await prisma.user.create({ data });
  await prisma.account.create({
    data: {
      userId: user.id,
      provider: AUTH_PROVIDER.CREDENTIALS,
      type: AUTH_METHOD.CREDENTIALS,
      providerAccountId: user.id
    },
  });
}

export { signUPWithCredentials };
