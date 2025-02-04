'use client';

import React from 'react';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';
import { useValidatSessionQuery } from '@/state/api';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
const Header = () => {
  const { isError } = useValidatSessionQuery();
  const router = useRouter();

  return (
    <div className="landing-navbar">
      <div className="landing-navbar__container">
        <div className="landing-navbar__logo">
          <BookOpen size={32} />
          <Link href="/" className="landing-navbar__name">
            W
          </Link>
        </div>
        <div>
          {isError && (
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                className="hover:text-customgreys-darkGrey hover:bg-primary-700"
                onClick={() => router.push('/login')}
              >
                Log in
              </Button>
              <Button
                variant="ghost"
                className="hover:text-customgreys-darkGrey hover:bg-primary-700"
                onClick={() => router.push('/register')}
              >
                Sign up
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
