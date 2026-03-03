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
import { loginUser } from "@/lib/action";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // onSubmit
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const res = await loginUser(values);

      if ("error" in res) {
        toast.error(res.error);
        return;
      }

      if (res.status === "success") {
        toast.success(res.message || "Login successful!");
        router.push("/");
      } else {
        toast.error(res.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login failed", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Login failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="shadow-none">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome</CardTitle>
          <CardDescription>Login with your Google account</CardDescription>
        </CardHeader>
        <CardContent className="mt-2.5">
          <FieldGroup>
            <Field className="flex gap-2 md:flex-row">
              {/* <Button variant="outline" type="button" className="flex-1">
                <AppleIcon />
                Login with Apple
              </Button> */}
              <Button variant="outline" type="button" className="flex-1">
                <GoogleIcon />
                Login with Google
              </Button>
            </Field>
            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
              Or continue with
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
                        <div className="flex items-center">
                          <FormLabel>Password</FormLabel>
                          <Link
                            href="?resetpassword-modal=resetpassword"
                            className="ml-auto text-sm underline-offset-4 hover:underline"
                          >
                            Forgot your password?
                          </Link>
                        </div>
                        <FormControl>
                          <Input
                            type="password"
                            className="border-neutral-50"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Field>
                <Field>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      type="submit"
                      className="w-full flex-1"
                      onClick={() => window.history.back()}
                    >
                      Cancel
                    </Button>
                    <Button
                      disabled={isLoading}
                      type="submit"
                      className="w-full flex-1"
                    >
                      {isLoading ? "Loading..." : "Login"}
                    </Button>
                  </div>
                  <FieldDescription className="text-center">
                    Don&apos;t have an account?{" "}
                    <Link href="?signup-modal=signup">Sign up</Link>
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
