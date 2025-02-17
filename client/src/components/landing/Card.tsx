'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const Card = ({
  guideId,
  title,
  description,
  image,
  authorName,
}: FeaturedGuideCardProps) => {
  const router = useRouter();
  return (
    <motion.div
      key={guideId}
      initial={{ y: 0, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      viewport={{ amount: 0.6 }}
      className="landing__featured-guide"
      onClick={() => router.push(`/guides/${guideId}`)}
    >
      <div className="landing__featured-guide-image-container">
        <Image
          src={image || '/placeholder.svg'}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="landing__featured-guide-image"
          priority
        />
      </div>
      <div className="landing__featured-guide-content">
        <div>
          <h2 className="landing__featured-guide-title">{title}</h2>
          <p className="landing__featured-guide-description">{description}</p>
        </div>
        <div className="landing__featured-guide-author">
          <p>By {authorName}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
