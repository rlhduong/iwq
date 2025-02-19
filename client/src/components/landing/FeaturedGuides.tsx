'use client';

import React from 'react';
import { useGetFeaturedGuidesQuery } from '@/state/api';
import { motion } from 'framer-motion';
import Card from './Card';
import Loading from '../Loader';

const FeaturedGuides = () => {
  const { data: guides, isLoading } = useGetFeaturedGuidesQuery();
  return (
    <motion.div
      className="landing__featured"
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ amount: 0.3, once: true }}
    >
      <h2 className="landing__featured-title">Featured guides</h2>
      <p className="landing__featured-description">
        Here is our favourite guides to get you started
      </p>
      <div className="landing__featured-guides">
        {isLoading ? (
          <Loading />
        ) : (
          guides &&
          guides.map((guide) => (
            <Card
              key={guide.guideId}
              guideId={guide.guideId}
              title={guide.title}
              description={guide.description}
              authorName={guide.authorName}
              image={guide.image}
            />
          ))
        )}
      </div>
    </motion.div>
  );
};

export default FeaturedGuides;
