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
import { FormError } from './FormError';
import { FormSuccess } from './FormSuccess';

const ResetPasswordForm = ({ hasPassword }: { hasPassword: boolean }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const [loading, startTransition] = useTransition();

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
    setError('');
    setSuccess('');
    console.log('values', values);

    startTransition(async () => {
      const res = await resetPassword(values);

      if (res?.error) {
        form.reset();
        setError(res?.error);
      }

      if (res?.success) {
        form.reset();
        setSuccess(res?.success);
      }
    });
  };

  return (
    <div className="max-w-[400px]">
      <Form {...form}>
        <div className="flex flex-col gap-4 mt-4 mb-4">
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>
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
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password*</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter the current password"
                      {...field}
                      className="mt-1"
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password*</FormLabel>
                <FormControl>
                  <Input
                    className="mt-1"
                    type="password"
                    placeholder="Enter the new password"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setPassword(e.target.value);
                    }}
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password*</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm password"
                    {...field}
                    className="mt-1"
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  <span
                    className={`text-sm ${
                      hasMinLength ? 'text-success-200' : 'text-neutrals-500'
                    }`}
                  >
                    <CheckIcon className="w-4 h-4 inline mr-1" />
                    Atleast 8 characters
                  </span>
                  <br />
                  <span
                    className={`text-sm ${
                      hasSpecialChar ? 'text-success-200' : 'text-neutrals-500'
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
