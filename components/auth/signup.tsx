"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import AppleIcon from "@/assets/icons/apple.svg";
import GoogleIcon from "@/assets/icons/google.svg";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { signUpUser } from "@/lib/action";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirm_password: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"],
});

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    
    try {
      // Remove confirm_password before sending to API
      const { confirm_password, ...userData } = values;
      
      const result = await signUpUser({
        email: userData.email,
        password: userData.password,
        confirm_password: confirm_password // Include confirm_password in the request
      });

      if (result.error) {
        setError(result.error);
      } else {
        router.push('/');
        toast.success("Account created successfully!");
      }
    } catch (error) {
      console.error("Sign up failed", error);
      setError("Sign up failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="shadow-none">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create Account</CardTitle>
          <CardDescription>
            Sign up with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-2.5">
          <FieldGroup>
            <Field className="flex gap-2 md:flex-row">
              <Button variant="outline" type="button" className="flex-1">
                <AppleIcon />
                Sign up with Apple
              </Button>
              <Button variant="outline" type="button" className="flex-1">
                <GoogleIcon />
                Sign up with Google
              </Button>
            </Field>
            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
              Or continue with email
            </FieldSeparator>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <Field>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="email@example.com"
                            className="border-neutral-50"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Field>
                <Field>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="At least 8 characters"
                            className="border-neutral-50"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Field>
                <Field>
                  <FormField
                    control={form.control}
                    name="confirm_password"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Confirm your password"
                            className="border-neutral-50"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Field>

                {/* Error Message */}
                {error && (
                  <div className="p-3 text-sm text-destructive bg-destructive/15 border border-destructive/20 rounded-md">
                    {error}
                  </div>
                )}

                <Field>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      type="button"
                      className="w-full flex-1"
                      onClick={() => window.history.back()}
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      className="w-full flex-1"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating Account..." : "Sign Up"}
                    </Button>
                  </div>
                  <FieldDescription className="text-center">
                    Already have an account? <Link href="?login-modal=login">Log in</Link>
                  </FieldDescription>
                </Field>
              </form>
            </Form>
          </FieldGroup>
        </CardContent>
      </Card>
    </div>
  );
}