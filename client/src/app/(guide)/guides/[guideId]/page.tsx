'use client';

import React, { useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { useGetGuideQuery } from '@/state/api';
import Sidebar from '@/components/guide/Sidebar';
import Loading from '@/components/Loader';
import Header from '@/components/guide/Header';

const page = () => {
  const params = useParams();
  const {
    data: guide,
    error,
    isError,
    isLoading,
  } = useGetGuideQuery(params.guideId as string);
  const [open, setOpen] = useState(true);

  const handleCollapse = () => {
    setOpen((prev) => !prev);
  };

  if (isError) {
    if (error.status === 404) {
      return (
        <div className="w-full h-full flex justify-center items-center">
          Guide not found
        </div>
      );
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="guide__layout">
      <Header open={open} handleClick={handleCollapse} />
      <div className="flex flex-row w-full">
        {guide && (
          <>
            <main className={`guide__main`}></main>

            <div
              className={`${open ? 'w-1/3' : 'w-0'} guide__sidebar-transition`}
            >
              <Sidebar guide={guide} handleClick={handleCollapse} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default page;
