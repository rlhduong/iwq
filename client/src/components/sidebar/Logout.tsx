'use client';
import React from 'react';
import { LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { useLogoutMutation } from '@/state/api';
import { useRouter } from 'next/navigation';

const Logout = () => {
  const router = useRouter();
  const [logout] = useLogoutMutation();
  const handleLogout = async () => {
    await logout();
    router.push('/');
  };
  return (
    <Button
      className="text-lg text-white-50 hover:text-white-100"
      onClick={handleLogout}
    >
      <LogOut />
      Logout
    </Button>
  );
};

export default Logout;
