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

const Login = () => {
  const [login] = useLoginMutation();
  const [error, setError] = useState<Boolean>(false);
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormData) => {
    const result = await login(values);
    if (result.error) {
      setError(true);
      return;
    }

    router.push('/guides');
    setError(false);
  };

  return (
    <div className="login-layout">
      <main className="auth__main">
        <h1 className="login__title">Welcome back</h1>
        <p className="login__subtitle">
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
        <div className="login__break">
          <hr className="flex-grow" />
          <p className="text-md text-gray-500">Or continue with</p>
          <hr className="flex-grow" />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="mb-5">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} className="login__input" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mb-5">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="login__input"
                      type="password"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {error && (
              <p className="text-sm text-center text-red-300 mt-4">
                Invalid username or password
              </p>
            )}
            <Button type="submit" className="login__submit">
              Submit
            </Button>
          </form>
        </Form>
      </main>
    </div>
  );
};

export default Login;
