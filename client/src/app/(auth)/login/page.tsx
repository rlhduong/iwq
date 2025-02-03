'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { useLoginMutation } from '@/state/api';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormData, loginSchema } from '@/lib/schemas';
import Link from 'next/link';

const Login = () => {
  const [login] = useLoginMutation();
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormData) => {
    const result = await login(values);
    if (result?.error) {
      setError(true);
      return;
    }

    router.push('/guides');
    setError(false);
  };

  return (
    <div className="auth-layout">
      <main className="auth__main">
        <h1 className="auth__title">Welcome back</h1>
        <p className="auth__subtitle">
          Login with your Apple or Google account
        </p>
        <div className="login__oauth-container group">
          <Button className="login__auth-button" variant="outline">
            Log in with Google
          </Button>
          <Button className="login__auth-button" variant="outline">
            Log in with Apple
          </Button>
        </div>
        <div className="auth__break">
          <hr className="flex-grow" />
          <p className="text-md text-gray-500">Or continue with</p>
          <hr className="flex-grow" />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-5">
                  <FormLabel className="auth__label">Email</FormLabel>
                  <FormControl>
                    <Input {...field} className="auth__input" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mb-5">
                  <div className="flex flex-row justify-between w-full">
                    <FormLabel className="auth__label">Password</FormLabel>
                    <Link
                      href="/"
                      className="hover:underline text-md pt-[0.1rem] text-primary-200"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <FormControl>
                    <Input {...field} className="auth__input" type="password" />
                  </FormControl>
                </FormItem>
              )}
            />
            {error && (
              <p className="text-sm text-center text-red-300 mt-4">
                Invalid email or password
              </p>
            )}
            <Button type="submit" className="login__submit">
              Log in
            </Button>
          </form>
        </Form>
        <div className="mt-4 flex flex-row justify-center gap-1">
          <p>Don't have an account?</p>
          <Link href="/register" className="underline">
            Sign up
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Login;
