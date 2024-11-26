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
import GoogleLogin from './GoogleLogin';
import { signin } from '@/actions/signin';
import { useTransition, useState } from 'react';
import { FormError } from './FormError';
import { FormSuccess } from './FormSuccess';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Eye, EyeSlash } from '@phosphor-icons/react/dist/ssr';

const LoginForm = () => {
  const [loading, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    setError('');
    setSuccess('');

    startTransition(async () => {
      const res = await signin(values);

      if (res?.error) {
        setError(res.error);
      }

      if (res.success) {
        setSuccess(res.success);
        toast.success("Logged in successfully!");
        router.push('/home');
      }
    });
  };

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
            <FormError message={error} />
            <FormSuccess message={success} />
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
              <div className="relative">
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
                        </div>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="mt-1"
                          type={`${isPasswordVisible ? "text" : "password"}`}
                          placeholder="Enter your password"
                          {...field}
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                      <Button
                        variant="link"
                        asChild
                        className="px-0 font-normal">
                        <Link href="/forgot-password">Forgot password?</Link>
                      </Button>
                    </FormItem>
                  )}
                />
                <span
                  className="absolute inset-y-0 right-3 -top-6 flex items-center cursor-pointer"
                  onClick={() => setIsPasswordVisible(prev => !prev)}
                    >
                  { isPasswordVisible ?
                    <Eye className="h-5 w-5" />
                    :
                    <EyeSlash className="h-5 w-5" /> }
                </span>
              </div>
            </div>
            <Button
              className="w-full rounded-full font-semibold"
              type="submit"
              disabled={loading}
            >
            {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>
        <div className="mt-8">
          <GoogleLogin />
        </div>
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

export default LoginForm;
