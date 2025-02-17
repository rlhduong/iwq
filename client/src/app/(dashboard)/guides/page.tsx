'use client';

import React from 'react';
import Header from '@/components/dashboard/Header';
import Loading from '@/components/Loader';
import Guide from '@/components/dashboard/Guide';
import SearchBar from '@/components/dashboard/SearchBar';

import { useSearchParams } from 'next/navigation';
import { useGetGuidesQuery } from '@/state/api';
const page = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('search');
  const { data: guides, isLoading } = useGetGuidesQuery(
    query ? { search: query } : {}
  );
  return (
    <div className="dashboard__main">
      <Header title="Guides" subtitle="" />
      <SearchBar />
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
    </div>
  );
};

export default page;
