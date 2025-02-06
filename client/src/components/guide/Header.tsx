'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Header = ({
  open,
  handleClick,
}: {
  open: boolean;
  handleClick: () => void;
}) => {
  return (
    <div className="guide__header">
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
