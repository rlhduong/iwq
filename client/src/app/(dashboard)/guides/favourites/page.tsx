'use client';

import React from 'react';
import Header from '@/components/dashboard/Header';
import { useGetFavouriteGuidesQuery } from '@/state/api';
import Loading from '@/components/Loader';
import Guide from '@/components/dashboard/Guide';

const Page = () => {
  const { data: guides, isLoading, isError } = useGetFavouriteGuidesQuery();
  return (
    <div className="dashboard__main">
      <Header title="Favourite guides" subtitle="" />
      {isError ? (
        <p className="w-full text-center pt-40 text-lg">
          Please log in to view your favourite guides
        </p>
      ) : (
        <div className="dashboard__guides">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {guides?.map((guide) => (
                <Guide key={guide.guideId} guide={guide} isMy={false} />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
