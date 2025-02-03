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
  FormMessage,
} from '@/components/ui/form';
import { useRegisterMutation } from '@/state/api';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterFormData, registerSchema } from '@/lib/schemas';
import Link from 'next/link';

const Login = () => {
  const [register] = useRegisterMutation();
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
  });

  const onSubmit = async (values: RegisterFormData) => {
    const result = await register(values);
    if (result.error) {
      setError(true);
      return;
    }

    router.push('/guides');
    setError(false);
  };

  return (
    <div className="auth-layout">
      <main className="auth__main">
        <h1 className="auth__title">Create account</h1>
        <p className="auth__subtitle">
          Sign up with your Apple or Google account
        </p>
        <div className="login__oauth-container group">
          <Button className="login__auth-button" variant="outline">
            Sign up with Google
          </Button>
          <Button className="login__auth-button" variant="outline">
            Sign up with Apple
          </Button>
        </div>
        <div className="auth__break">
          <hr className="flex-grow" />
          <p className="text-md text-gray-500">Or continue with</p>
          <hr className="flex-grow" />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 gap-4">
            <div className="flex flex-row justify-between w-full">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel className="auth__label">First name*</FormLabel>
                    <FormControl>
                      <Input {...field} className="auth__input" />
                    </FormControl>
                    <FormMessage className='text-red-300'/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel className="auth__label">Last name*</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="auth__input"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage className='text-red-300'/>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-5">
                  <FormLabel className="auth__label">Email*</FormLabel>
                  <FormControl>
                    <Input {...field} className="auth__input" />
                  </FormControl>
                  <FormMessage className='text-red-300'/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mb-5">
                  <FormLabel className="auth__label">Password*</FormLabel>
                  <FormControl>
                    <Input {...field} className="auth__input" type="password" />
                  </FormControl>
                  <FormMessage className='text-red-300'/>
                </FormItem>
              )}
            />
            {error && (
              <p className="text-sm text-center text-red-300 mt-4">
                Email already exists
              </p>
            )}
            <Button type="submit" className="login__submit">
              Sign up
            </Button>
          </form>
        </Form>
        <div className="mt-4 flex flex-row justify-center gap-1">
          <p>Already have an account?</p>
          <Link href="/login" className="underline">
            Log in
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Login;
