import React from 'react';

const Content = ({ chapter }: { chapter: Chapter }) => {
  return (
    <>
      {chapter.type === 'text' ? (
        <div className="guide__chapter-text">
          <h1>{chapter.title}</h1>
          <h2>{chapter.description}</h2>
          <p>{chapter.content}</p>
        </div>
      ) : (
        <div className="guide__chapter-video"></div>
      )}
    </>
  );
};

export default Content;
