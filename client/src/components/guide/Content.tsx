import React from 'react';
import ReactPlayer from 'react-player/youtube';

const Content = ({ chapter }: { chapter: Chapter }) => {
  return (
    <>
      {chapter.type === 'text' ? (
        <div className="guide__chapter-text">
          <h1 className="guide__chapter-text-title">{chapter.title}</h1>
          <h2 className="guide__chapter-text-description">
            {chapter.description}
          </h2>
          <p className="guide__chapter-text-content">{chapter.content}</p>
        </div>
      ) : (
        <div className="relative pt-[56.25%]">
          <ReactPlayer
            className="absolute top-0 left-0"
            url={chapter.videoUrl}
            width="100%"
            height="100%"
            controls
          />
        </div>
      )}
    </>
  );
};

export default Content;
