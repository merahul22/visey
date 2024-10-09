'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { loginSchema } from '@/schemas';
import Link from 'next/link';
import { FormError } from './FormError';
import GoogleLogin from './GoogleLogin';

const LoginForm = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="lg:w-[540px] w-[320px]">
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-center">Log In</h1>
          <p className="text-sm text-neutrals-600 text-center">
            To your existing account
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
                      <div className="flex justify-between">
                        <p className="text-neutrals-600 font-semibold">
                          Email/ Phone Number
                        </p>
                        <p className="text-primary">(Required*)</p>
                      </div>
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
                      <div className="flex justify-between">
                        <p className="text-neutrals-600 font-semibold">
                          Password
                        </p>
                        <p className="text-primary">(Required*)</p>
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="mt-1"
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <Button variant="link" asChild className="px-0 font-normal">
                      <Link href="/auth/reset">Forgot password?</Link>
                    </Button>
                  </FormItem>
                )}
              />
            </div>
            <Button className="w-full rounded-full font-semibold" type="submit">
              Log In
            </Button>
          </form>
        </Form>
        <div className="mt-8">
          <GoogleLogin />
        </div>
        <div className="flex justify-center mt-6 gap-2">
          <p>Don&apos;t have an account?</p>
          <Link className="text-primary hover:underline font-semibold" href="#">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
