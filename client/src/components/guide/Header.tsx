'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { MoveLeft } from 'lucide-react';

const Header = ({
  open,
  handleClick,
}: {
  open: boolean;
  handleClick: () => void;
}) => {
  const router = useRouter();
  return (
    <div className="guide__header">
      <Button
        className="text-primary-600 hover:!text-primary-700 ml-10 text-xl"
        variant={'ghost'}
        onClick={() => router.push('/guides')}
      >
        Back
      </Button>
      {!open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <button className="guide__uncollapse-button" onClick={handleClick}>
            View content
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Header;
