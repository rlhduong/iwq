import React from 'react';
interface InfoProps {
  guide: Guide;
}
const Info = ({ guide }: InfoProps) => {
  return (
    <div className="guide__info">
      <h1 className="guide__info-title">{guide.title}</h1>
      <h2 className="guide__info-description mb-4">{guide.description}</h2>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-16 mt-8">
          <p className="guide__info-author">
            Created by{' '}
            <span className="text-primary-500">{guide.authorName}</span>
          </p>
          <p className="guide__info-updated">
            {guide.favourites || '0 '} endorsements
          </p>
        </div>
      </div>
    </div>
  );
};

export default Info;
