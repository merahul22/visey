'use client';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { Button } from '../ui/button';

import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { resetPasswordSchema } from '@/schemas';
import { CheckIcon } from 'lucide-react';
import { resetPassword } from '@/actions/reset-password';
import { toast } from 'sonner';
import { Eye, EyeSlash } from '@phosphor-icons/react/dist/ssr';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const ResetPasswordForm = ({ hasPassword }: { hasPassword: boolean }) => {
  const [password, setPassword] = useState('');
  const [isPasswordVisibleCurrent, setIsPasswordVisibleCurrent] =
    useState<boolean>(false);
  const [isPasswordVisibleNew, setIsPasswordVisibleNew] =
    useState<boolean>(false);
  const [isPasswordVisibleConfirm, setIsPasswordVisibleConfirm] =
    useState<boolean>(false);

  const [loading, startTransition] = useTransition();
  const router = useRouter();
  const { update } = useSession();

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      currentPassword: '',
      password: '',
      confirmPassword: '',
    },
  });

  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const onSubmit = (values: z.infer<typeof resetPasswordSchema>) => {
    startTransition(async () => {
      const res = await resetPassword(values);

      if (res?.error) {
        form.reset();
        toast.error(res?.error);
      }

      if (res?.success) {
        form.reset();
        toast.success('Password reset successfully!');
        update();
        router.refresh();
      }
    });
  };

  return (
    <div className="max-w-[400px]">
      <Form {...form}>
        <div className="flex flex-col gap-4 mt-4 mb-4"></div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {!hasPassword && (
            <div>
              <p className="text-sm text-error-300">
                You haven&apos;t set a password yet. Please set a password to
                continue.
              </p>
            </div>
          )}
          {hasPassword && (
            <div className="">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password*</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={`${
                            isPasswordVisibleCurrent ? 'text' : 'password'
                          }`}
                          placeholder="Enter the current password"
                          {...field}
                          className="mt-1"
                          disabled={loading}
                        />
                        <span
                          className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                          onClick={() =>
                            setIsPasswordVisibleCurrent((prev) => !prev)
                          }
                        >
                          {isPasswordVisibleCurrent ? (
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
            </div>
          )}
          <div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password*</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="mt-1 relative"
                        type={`${isPasswordVisibleNew ? 'text' : 'password'}`}
                        placeholder="Enter the new password"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setPassword(e.target.value);
                        }}
                        disabled={loading}
                      />
                      <span
                        className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                        onClick={() => setIsPasswordVisibleNew((prev) => !prev)}
                      >
                        {isPasswordVisibleNew ? (
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
          </div>
          <div className="relative">
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password*</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={`${
                          isPasswordVisibleConfirm ? 'text' : 'password'
                        }`}
                        placeholder="Confirm password"
                        {...field}
                        className="mt-1"
                        disabled={loading}
                      />
                      <span
                        className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                        onClick={() =>
                          setIsPasswordVisibleConfirm((prev) => !prev)
                        }
                      >
                        {isPasswordVisibleConfirm ? (
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
                        hasMinLength ? 'text-success-200' : 'text-neutrals-500'
                      }`}
                    >
                      <CheckIcon className="w-4 h-4 inline mr-1" />
                      At least 8 characters
                    </span>
                    <br />
                    <span
                      className={`text-sm ${
                        hasSpecialChar
                          ? 'text-success-200'
                          : 'text-neutrals-500'
                      }`}
                    >
                      <CheckIcon className="w-4 h-4 inline mr-1" />
                      Use at least 1 special character
                    </span>
                    <br />
                    <span
                      className={`text-sm ${
                        hasUpperCase ? 'text-success-200' : 'text-neutrals-500'
                      }`}
                    >
                      <CheckIcon className="w-4 h-4 inline mr-1" />
                      Use at least 1 uppercase letter
                    </span>
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="rounded-full"
            variant="outline"
            size="lg"
            disabled={loading}
          >
            Change
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;
