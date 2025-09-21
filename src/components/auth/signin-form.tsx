"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "@/components/ui/input";
import { SignInFromInput } from "@/types/auth.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInFormSchema } from "@/lib/schemas/auth.schema";
import { startTransition, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signInWithCredential } from "@/lib/actions/auth.action";
import { toast } from "sonner";
import { ROUTE } from "@/constants/route";

export default function SignInForm() {
  const form = useForm<SignInFromInput>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const [isPending, setIsPending] = useTransition();
  const router = useRouter()
  const onSubmit: SubmitHandler<SignInFromInput> = (data) => {
    startTransition(async () => {
      try {
       const res =  await signInWithCredential(data)
       if(!res.success) {
        toast.error(res.message)
       } else {
        toast.success("Sign in successfully")
       }
       router.push(ROUTE.TRANSACTION)
      } catch (error) {
        toast.error("Something went wrong")
      }
    });
  };

  return (
    <Form {...form}>
      <form className="grid gap-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending}>
          {isPending ? <Loader2 className="animate-spin" /> : "Sign In"}
        </Button>
      </form>
    </Form>
  );
}
