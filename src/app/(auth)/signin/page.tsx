import SignInForm from "@/components/auth/signin-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ROUTE } from "@/constants/route";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function SignInPage() {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Sign in to your account</CardTitle>
        <CardDescription>
          Enter your credentials to access to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm />
        <div className="text-center text-sm mt-4">
          Don&apos;t have an account?{" "}
          <Link
            href={ROUTE.SIGN_UP}
            className="text-primary font-medium hover:underline underline-offset-4"
          >
            Sign Up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
