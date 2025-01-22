import React from 'react';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  return (
    <div className="landing-navbar">
      <div className="landing-navbar__container">
        <div className="landing-navbar__logo">
          <BookOpen size={32} />
          <Link href="/" className='landing-navbar__name'>W</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
