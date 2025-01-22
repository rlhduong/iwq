import React from 'react';
import FeaturedGuides from './FeaturedGuides';
import Hero from './Hero';

const Landing = () => {
  return (
    <div className="w-3/4">
      <Hero />
      <FeaturedGuides />
    </div>
  );
};

export default Landing;
