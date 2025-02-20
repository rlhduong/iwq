'use client';

import React from 'react';
import { LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { useValidatSessionQuery, useLogoutMutation } from '@/state/api';
import { useRouter } from 'next/navigation';

const Logout = () => {
  const router = useRouter();
  const { data: user } = useValidatSessionQuery();
  const [logout] = useLogoutMutation();
  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div className="flex flex-row justify-center">
      {user ? (
        <Button
          className="text-lg text-white-50 hover:text-white-100"
          onClick={handleLogout}
        >
          <LogOut />
          Logout
        </Button>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Logout;
