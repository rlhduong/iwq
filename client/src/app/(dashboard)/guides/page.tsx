'use client';

import React from 'react';
import Header from '@/components/dashboard/Header';
import { useGetGuidesQuery } from '@/state/api';
import Loading from '@/components/Loader';
import Guide from '@/components/dashboard/Guide';

const page = () => {
  const { data: guides, isLoading } = useGetGuidesQuery();
  return (
    <div className="dashboard__main">
      <Header title="Guides" subtitle="" />
      <div className="dashboard__guides">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {guides?.map((guide) => (
              <Guide key={guide.guideId} guide={guide} isMy={false}/>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default page;
