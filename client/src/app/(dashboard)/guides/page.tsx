'use client';

import React, { Suspense } from 'react';
import Header from '@/components/dashboard/Header';
import Loading from '@/components/Loader';
import Guide from '@/components/dashboard/Guide';
import SearchBar from '@/components/dashboard/SearchBar';

import { useSearchParams } from 'next/navigation';
import { useGetGuidesQuery } from '@/state/api';

const Page = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('search');
  const { data: guides, isLoading } = useGetGuidesQuery(
    query ? { search: query } : {}
  );

  return (
    <Suspense fallback={<Loading />}>
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
    </Suspense>
  );
};

export default Page;
