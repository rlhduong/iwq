'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useValidatSessionQuery, useLikeGuideMutation } from '@/state/api';
import { Heart } from 'lucide-react';

interface HeaderProps {
  open: boolean;
  handleClick: () => void;
  guideId: string;
}

const Header = ({ open, handleClick, guideId }: HeaderProps) => {
  const { data: user } = useValidatSessionQuery();
  const [likeGuide] = useLikeGuideMutation();
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
      <div className="flex flex-row gap-4">
        {user && (user?.favourites || []).includes(guideId) ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <Heart
              fill="#FB2C36"
              className="text-red-500 mr-8 cursor-pointer"
              onClick={() => likeGuide(guideId)}
            />
          </motion.div>
        ) : (
          <Heart
            className="mr-8 cursor-pointer"
            onClick={() => likeGuide(guideId)}
          />
        )}
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
    </div>
  );
};

export default Header;
