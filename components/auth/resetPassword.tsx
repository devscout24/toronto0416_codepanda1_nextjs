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
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
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
import { sendResetEmail, verifyResetCode, resetPassword } from "@/lib/action";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Step 1 Schema - Email
const step1Schema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

// Step 2 Schema - OTP (5 digits)
const step2Schema = z.object({
  otp: z.string().min(5, "Verification code must be 5 digits").max(5),
});

// Step 3 Schema - New Password
const step3Schema = z
  .object({
    new_password: z.string().min(8, "Password must be at least 8 characters"),
    confirm_password: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Step 1 Form - Email
  const step1Form = useForm<z.infer<typeof step1Schema>>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      email: "",
    },
  });

  // Step 2 Form - OTP
  const step2Form = useForm<z.infer<typeof step2Schema>>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      otp: "",
    },
  });

  // Step 3 Form - New Password
  const step3Form = useForm<z.infer<typeof step3Schema>>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      new_password: "",
      confirm_password: "",
    },
  });

  // Step 1: Send Email
  const onStep1Submit = async (values: z.infer<typeof step1Schema>) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await sendResetEmail(values.email);

      if (result.error) {
        setError(result.error);
      } else {
        setEmail(values.email);
        setStep(2);
      }
    } catch (error) {
      console.error("Failed to send reset email", error);
      setError("Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP
  const onStep2Submit = async (values: z.infer<typeof step2Schema>) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await verifyResetCode(email, values.otp);

      if (result.error) {
        setError(result.error);
      } else if (result.token) {
        setResetToken(result.token);
        setStep(3);
      } else {
        setError("No token received from server");
      }
    } catch (error) {
      console.error("Failed to verify OTP", error);
      setError("Failed to verify code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: Reset Password
  const onStep3Submit = async (values: z.infer<typeof step3Schema>) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await resetPassword(
        values.new_password,
        values.confirm_password,
        resetToken,
      );

      if (result.error) {
        setError(result.error);
      } else {
        toast.success("Password reset successfully!");
        router.push("?login-modal=login");
      }
    } catch (error) {
      console.error("Failed to reset password", error);
      setError("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await sendResetEmail(email);

      if (result.error) {
        setError(result.error);
      } else {
        // You can show a success toast here if needed
        console.log("Code resent successfully");
      }
    } catch (error) {
      console.error("Failed to resend code", error);
      setError("Failed to resend code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    if (step === 1) {
      window.history.back();
    } else {
      setStep(step - 1);
      setError(null);
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Reset Password";
      case 2:
        return "Verification Code";
      case 3:
        return "Create New Password";
      default:
        return "Reset Password";
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case 1:
        return "Enter your email address to receive a verification code";
      case 2:
        return `We sent a 5-digit code to ${email}`;
      case 3:
        return "Enter your new password and confirm it";
      default:
        return "";
    }
  };

  const getSubmitButtonText = () => {
    switch (step) {
      case 1:
        return isLoading ? "Sending..." : "Send Code";
      case 2:
        return isLoading ? "Verifying..." : "Verify Code";
      case 3:
        return isLoading ? "Resetting..." : "Reset Password";
      default:
        return "Continue";
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="shadow-none">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{getStepTitle()}</CardTitle>
          <CardDescription>{getStepDescription()}</CardDescription>

          {/* Progress Steps */}
          <div className="mt-4 flex items-center justify-center">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium",
                    step >= stepNumber
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div
                    className={cn(
                      "mx-2 h-1 w-12",
                      step > stepNumber ? "bg-primary" : "bg-muted",
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </CardHeader>

        <CardContent className="mt-2.5">
          <FieldGroup>
            {/* Error Message */}
            {error && (
              <div className="text-destructive bg-destructive/15 border-destructive/20 rounded-md border p-3 text-sm">
                {error}
              </div>
            )}

            {/* Step 1: Email */}
            {step === 1 && (
              <Form {...step1Form}>
                <form
                  onSubmit={step1Form.handleSubmit(onStep1Submit)}
                  className="space-y-5"
                >
                  <Field>
                    <FormField
                      control={step1Form.control}
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
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        type="button"
                        className="w-full flex-1"
                        onClick={goBack}
                        disabled={isLoading}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="w-full flex-1"
                        disabled={isLoading}
                      >
                        {getSubmitButtonText()}
                      </Button>
                    </div>
                    <FieldDescription className="text-center">
                      Remember your password?{" "}
                      <Link href="?login-modal=login">Log in</Link>
                    </FieldDescription>
                  </Field>
                </form>
              </Form>
            )}

            {/* Step 2: OTP Verification */}
            {step === 2 && (
              <Form {...step2Form}>
                <form
                  onSubmit={step2Form.handleSubmit(onStep2Submit)}
                  className="space-y-5"
                >
                  <Field>
                    <FormField
                      control={step2Form.control}
                      name="otp"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Verification Code</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter 5-digit code"
                              className="border-neutral-50 text-center text-lg tracking-widest"
                              maxLength={5}
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
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        type="button"
                        className="w-full flex-1"
                        onClick={goBack}
                        disabled={isLoading}
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        className="w-full flex-1"
                        disabled={isLoading}
                      >
                        {getSubmitButtonText()}
                      </Button>
                    </div>
                    <FieldDescription className="text-center">
                      Didn&apos;t receive code?{" "}
                      <Button
                        variant="link"
                        className="h-auto p-0"
                        onClick={handleResendCode}
                        disabled={isLoading}
                      >
                        {isLoading ? "Resending..." : "Resend"}
                      </Button>
                    </FieldDescription>
                  </Field>
                </form>
              </Form>
            )}

            {/* Step 3: New Password */}
            {step === 3 && (
              <Form {...step3Form}>
                <form
                  onSubmit={step3Form.handleSubmit(onStep3Submit)}
                  className="space-y-5"
                >
                  <Field>
                    <FormField
                      control={step3Form.control}
                      name="new_password"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter new password"
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
                      control={step3Form.control}
                      name="confirm_password"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Confirm new password"
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
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        type="button"
                        className="w-full flex-1"
                        onClick={goBack}
                        disabled={isLoading}
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        className="w-full flex-1"
                        disabled={isLoading}
                      >
                        {getSubmitButtonText()}
                      </Button>
                    </div>
                    <FieldDescription className="text-center">
                      Make sure your new password is strong and secure
                    </FieldDescription>
                  </Field>
                </form>
              </Form>
            )}
          </FieldGroup>
        </CardContent>
      </Card>
    </div>
  );
}