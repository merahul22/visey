'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
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
import { signUpSchema } from '@/schemas';
import Link from 'next/link';
import { FormError } from './FormError';
import GoogleLogin from './GoogleLogin';
import { useState } from 'react';

import { CheckIcon } from '@radix-ui/react-icons';

const SignupForm = () => {
  const [password, setPassword] = useState<string>('');

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof signUpSchema>) {
    console.log(values);
  }

  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="lg:w-[540px] w-[320px]">
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-center">Sign Up</h1>
          <p className="text-sm text-neutrals-600 text-center">
            Create a new account
          </p>
        </div>

        <Form {...form}>
          <div className="flex flex-col gap-4">
            <FormError message="No account found with this email/ phone number" />

            <FormError message="Incorrect Password" />
          </div>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="identifier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <p className="text-neutrals-600 font-semibold">
                        Email/ Phone Number*
                      </p>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="mt-1"
                        placeholder="Email/ Phone Number"
                        {...field}
                      />
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
                    <FormLabel>
                      <p className="text-neutrals-600 font-semibold">
                        Password*
                      </p>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="mt-1"
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setPassword(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      <span
                        className={`text-sm ${
                          hasMinLength
                            ? 'text-success-200'
                            : 'text-neutrals-500'
                        }`}
                      >
                        <CheckIcon className="w-4 h-4 inline mr-1" />
                        Atleast 8 characters
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
                          hasUpperCase
                            ? 'text-success-200'
                            : 'text-neutrals-500'
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
            <Button variant="outline" type="submit">
              Create Account
            </Button>
          </form>
        </Form>
        <div className="mt-8">
          <GoogleLogin />
        </div>
        <div className="flex justify-center mt-6 gap-2">
          <p>Already have an account?</p>
          <Link className="text-primary hover:underline font-semibold" href="/login">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
