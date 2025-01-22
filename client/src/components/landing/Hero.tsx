'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useCarousel } from '@/hooks/useCarousels';
import Image from 'next/image';

const heroImgs = ['/hero1.jpg', '/hero2.jpg', '/hero3.jpg'];

const Hero = () => {
  const currImg = useCarousel({ total: heroImgs.length });
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="landing__hero"
    >
      <div className="landing__hero-content">
        <h1 className="landing__hero-title">Courses</h1>
        <p className="landing__hero-description">
          This is the list of the courses you can enroll in.
          <br />
          Courses when you need them and want them.
        </p>
      </div>
      <div className="landing__hero-images">
        {heroImgs.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`Hero Banner ${index + 1}`}
            fill
            priority={index === currImg}
            className={`landing__hero-image ${
              index === currImg ? 'landing__hero-image--active' : ''
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Hero;
