"use client"
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "@/components/ui/input";
import { SignUpFromInput } from "@/types/auth.type";
import {zodResolver} from "@hookform/resolvers/zod"
import { signUpFormSchema } from "@/lib/schemas/auth.schema";
import { startTransition, useTransition } from "react";
import { signUPWithCredential } from "@/lib/actions/auth.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ROUTE } from "@/constants/route";
import { Loader2 } from "lucide-react";

export default function SignUpForm() {
  const form = useForm<SignUpFromInput>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {email: "", password: "", firstName: "", lastName: ""}
  })
  
  const [isPending, setIsPending] = useTransition()
  const router = useRouter()
  const onSubmit: SubmitHandler<SignUpFromInput> = (data) => {
    startTransition(async()=> {
      try {
        const res = await signUPWithCredential(data)
        if(!res.success){
          if(res.details?.email){
            form.setError("email", {message: res.details.email})
          } else {
            toast.error(res.message)
          }
        } else {
          toast.success("Account has been created ")
          router.push(ROUTE.SIGN_IN)
        }
      } catch (error) {
        toast.error("something went wrong")
      }
    })
  }


  return (
    <Form {...form}>
      <form className="grid gap-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField 
        control={form.control}
        name="firstName"
        render={({field})=> <FormItem>
          <FormLabel className="text-xs">First Name</FormLabel>
          <FormControl>
            <Input placeholder="Enter your first name" {...field}/>
          </FormControl>
          <FormMessage/>
        </FormItem>}
        />
        <FormField 
        control={form.control}
        name="lastName"
        render={({field})=> <FormItem>
          <FormLabel className="text-xs">Last Name</FormLabel>
          <FormControl>
            <Input placeholder="Enter your Last name" {...field}/>
          </FormControl>
          <FormMessage/>
        </FormItem>}
        />
        <FormField 
        control={form.control}
        name="email"
        render={({field})=> <FormItem>
          <FormLabel className="text-xs">Email</FormLabel>
          <FormControl>
            <Input placeholder="Enter your email" {...field}/>
          </FormControl>
          <FormMessage/>
        </FormItem>}
        />
        <FormField 
        control={form.control}
        name="password"
        render={({field})=> <FormItem>
          <FormLabel className="text-xs">Password</FormLabel>
          <FormControl>
            <Input type="password" placeholder="Enter your password" {...field}/>
          </FormControl>
          <FormMessage/>
        </FormItem>}
        />
        <Button disabled={isPending}>{isPending ? <Loader2 className="animate-spin"/> : "Sign Up"}</Button>
      </form>
    </Form>
  );
}
