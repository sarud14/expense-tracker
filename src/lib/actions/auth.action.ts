"use server";

import { ActionResult } from "@/types/action-result.type";
import { signUpFormSchema } from "../schemas/auth.schema";
import z from "zod";
import * as authService from "@/lib/services/auth.service";
import { signIn, signOut } from "../auth/auth";
import { CredentialsSignin } from "next-auth";
import { ROUTE } from "@/constants/route";

export async function signUPWithCredential(
  input: unknown
): Promise<ActionResult> {
  const { data, success, error } = signUpFormSchema.safeParse(input);
  if (!success) {
    return {
      success: false,
      message: "Validation failed",
      details: z.flattenError(error),
    };
  }
  try {
    const res = await authService.signUPWithCredentials(data);
    if (res) {
      return { success: false, message: "Email already exist", details: res };
    }
    return { success: true };
  } catch (error) {
    return { success: false, message: "Unexpected error occurred" };
  }
}

export async function signInWithCredential(
  data: Record<string, unknown>
): Promise<ActionResult> {
  try {
    data.redirect = false
    await signIn("credentials", data);
    return {success: true}
  } catch (error) {
    if (error instanceof CredentialsSignin) {
      return { success: false, message: "Invalid credentials" };
    }
    return { success: false, message: "Unexpected error occurred" };
  }
}

export async function signOutUser() {
  await signOut({redirectTo: ROUTE.SIGN_IN})
}