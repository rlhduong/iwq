'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useCarousel } from '@/hooks/useCarousels';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const heroImgs = ['/hero1.jpg', '/hero2.jpg', '/hero3.jpg'];

const Hero = () => {
  const currImg = useCarousel({ total: heroImgs.length });
  const router = useRouter();

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="landing__hero"
    >
      <div className="landing__hero-content">
        <h1 className="landing__hero-title">Guides</h1>
        <p className="landing__hero-description">
          Discover a collection of the most esteemed guides, carefully curated
          to help you master every aspect of the game. Learn advanced
          strategies, sharpen your skills, and challenge your way up through the
          ranks
        </p>
        <Button
          className="bg-primary-750 hover:bg-primary-click"
          onClick={() => router.push('/guides')}
        >
          Get tarted
        </Button>
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
