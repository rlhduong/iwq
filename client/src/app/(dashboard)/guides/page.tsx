'use client';

import React, { useState } from 'react';
import Header from '@/components/dashboard/Header';
import Loading from '@/components/Loader';
import Guide from '@/components/dashboard/Guide';
import SearchBar from '@/components/dashboard/SearchBar';

import { useGetGuidesQuery } from '@/state/api';
const Page = () => {
  const [search, setSearch] = useState('');
  const { data: guides, isLoading } = useGetGuidesQuery(
    search ? { search } : {}
  );

  return (
    <div className="dashboard__main">
      <Header title="Guides" subtitle="" />
      <SearchBar handleSearch={setSearch} />
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

export default Page;
