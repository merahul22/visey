"use client";

import Link from "next/link";
import { FormError } from "@/components/form/FormError";
import { FormSuccess } from "@/components/form/FormSuccess";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  forgotPasswordSchema,
  forgotPasswordSchemaFirstStep,
  forgotPasswordSchemaSecondStep,
  forgotPasswordSchemaThirdStep,
} from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Stepper } from "@/components/Stepper";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Eye, EyeSlash } from "@phosphor-icons/react/dist/ssr";
import { CheckIcon } from "@radix-ui/react-icons";
import isUserExists from "@/actions/check-user-exists";
import forgotPassword from "@/actions/forgot-password";

const ForgotPasswordForm = () => {
  const [password, setPassword] = useState<string>("");
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);
  const [formValues, setFormValues] = useState<
    z.infer<typeof forgotPasswordSchema>
  >({
    identifier: "",
    otp: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const router = useRouter();

  const schema =
    currentStep === 1
      ? forgotPasswordSchemaFirstStep
      : currentStep === 2
        ? forgotPasswordSchemaSecondStep
        : forgotPasswordSchemaThirdStep;

  let defaultValues;
  switch (currentStep) {
    case 1:
      defaultValues = { identifier: "" };
      break;
    case 2:
      defaultValues = { otp: "" };
      break;
    case 3:
      defaultValues = { newPassword: "", confirmNewPassword: "" };
      break;
    default:
      defaultValues = {};
  }

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    setError("");
    setSuccess("");

    if (currentStep === 1) {
      setFormValues((prevValues) => ({ ...prevValues, ...values }));

      startTransition(async () => {
        setError("");
        setSuccess("");

        const res = await isUserExists(
          values as z.infer<typeof forgotPasswordSchema>,
        );

        if (res?.error) {
          setError(res.error);
        }

        if (res?.success) {
          setCurrentStep(2);
        }
      });
    }

    if (currentStep === 2) {
      setFormValues((prevValues) => ({ ...prevValues, ...values }));
      setCurrentStep(3);
    }

    if (currentStep === 3) {
      startTransition(async () => {
        setError("");
        setSuccess("");

        const backendData = {
          ...formValues,
          ...values,
        };

        const res = await forgotPassword(backendData);

        if (res?.error) {
          setError(res.error);
          toast.error(res.error);
        }

        if (res?.success) {
          setSuccess(res.success);
          toast.success("Password reset successfully");
          router.push("/login");
        }
      });
    }

    startTransition(async () => {
      const res = { error: "", success: "" };

      if (res?.error) {
        setError(res.error);
      }

      if (res?.success) {
        setSuccess(res.success);
        toast.success("Logged in successfully!");
        router.push("/home");
      }
    });
  };

  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="lg:w-[540px] w-[320px]">
        <div className="mb-8 mt-2">
          <Stepper currentStep={currentStep} numberOfSteps={3} />
        </div>

        {currentStep === 1 && (
          <>
            <div className="mb-8">
              <h1 className="text-xl font-semibold text-center">
                Forgot Password
              </h1>
              <p className="text-sm text-neutrals-600 text-center">
                Enter your registered Email /Phone Number to reset your password
              </p>
            </div>
            <Form {...form}>
              <div className="flex flex-col gap-4">
                <FormError message={error} />
                <FormSuccess message={success} />
              </div>

              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-4 space-y-4"
              >
                <FormField
                  control={form.control}
                  name="identifier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <div className="flex justify-between">
                          <p className="text-neutrals-600 font-semibold">
                            Email/ Phone Number
                          </p>
                        </div>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="mt-1"
                          placeholder="Email/ Phone Number"
                          {...field}
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  className="w-full rounded-full font-semibold"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </form>
            </Form>
          </>
        )}

        {currentStep === 2 && (
          <>
            <div className="mb-8">
              <h1 className="text-xl font-semibold text-center">
                Verification
              </h1>
              <p className="text-sm text-neutrals-600 text-center">
                OTP sent on <strong>sahil@gmail.com</strong>
              </p>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full flex flex-col items-center justify-center text-center space-y-6"
              >
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button className="w-full" type="submit">
                  Verify
                </Button>
              </form>
            </Form>
          </>
        )}

        {currentStep === 3 && (
          <>
            <div className="mb-8">
              <h1 className="text-xl font-semibold text-center">
                Create New Password
              </h1>
              <p className="text-sm text-neutrals-600 text-center">
                Set your password
              </p>
            </div>

            <Form {...form}>
              <div className="flex flex-col gap-4">
                <FormError message={error} />
                <FormSuccess message={success} />
              </div>

              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-4 space-y-6"
              >
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <p className="text-neutrals-600 font-semibold">
                          New Password*
                        </p>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            className="mt-1"
                            type={`${isPasswordVisible ? "text" : "password"}`}
                            placeholder="Enter your password"
                            {...field}
                            value={field.value || ""}
                            onChange={(e) => {
                              field.onChange(e);
                              setPassword(e.target.value);
                            }}
                            disabled={loading}
                          />
                          <span
                            className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                            onClick={() =>
                              setIsPasswordVisible((prev) => !prev)
                            }
                          >
                            {isPasswordVisible ? (
                              <Eye className="h-5 w-5" />
                            ) : (
                              <EyeSlash className="h-5 w-5" />
                            )}
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                      <FormDescription>
                        <span
                          className={`text-sm ${
                            hasMinLength
                              ? "text-success-200"
                              : "text-neutrals-500"
                          }`}
                        >
                          <CheckIcon className="w-4 h-4 inline mr-1" />
                          At least 8 characters
                        </span>
                        <br />
                        <span
                          className={`text-sm ${
                            hasSpecialChar
                              ? "text-success-200"
                              : "text-neutrals-500"
                          }`}
                        >
                          <CheckIcon className="w-4 h-4 inline mr-1" />
                          Use at least 1 special character
                        </span>
                        <br />
                        <span
                          className={`text-sm ${
                            hasUpperCase
                              ? "text-success-200"
                              : "text-neutrals-500"
                          }`}
                        >
                          <CheckIcon className="w-4 h-4 inline mr-1" />
                          Use at least 1 uppercase letter
                        </span>
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmNewPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <div className="flex justify-between">
                          <p className="text-neutrals-600 font-semibold">
                            Confirm Password*
                          </p>
                        </div>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={`${isConfirmPasswordVisible ? "text" : "password"}`}
                            className="mt-1"
                            placeholder="Confirm your password"
                            {...field}
                            value={field.value || ""}
                            disabled={loading}
                          />
                          <span
                            className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                            onClick={() =>
                              setIsConfirmPasswordVisible((prev) => !prev)
                            }
                          >
                            {isPasswordVisible ? (
                              <Eye className="h-5 w-5" />
                            ) : (
                              <EyeSlash className="h-5 w-5" />
                            )}
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  className="w-full rounded-full font-semibold"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Confirming..." : "Confirm"}
                </Button>
              </form>
            </Form>
          </>
        )}

        <div className="flex justify-center mt-6 gap-2">
          <p>Don&apos;t have an account?</p>
          <Link
            className="text-primary hover:underline font-semibold"
            href="/register"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
