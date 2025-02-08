'use client';

import React from 'react';
import Header from '@/components/dashboard/Header';
import {
  useGetMyGuidesQuery,
  useCreateGuideMutation,
  useValidatSessionQuery,
} from '@/state/api';
import Loading from '@/components/Loader';
import Guide from '@/components/dashboard/Guide';
import { Button } from '@/components/ui/button';

const page = () => {
  const { data: guides, isLoading, isError } = useGetMyGuidesQuery();
  const { data: user } = useValidatSessionQuery();
  const [createGuide] = useCreateGuideMutation();

  const handleCreateGuide = async () => {
    if (user) {
      await createGuide({
        authorId: user.id,
        authorName: user.firstName,
      });
    }
  };
  return (
    <div className="dashboard__main">
      <div className="flex justify-between">
        <Header title="My guides" subtitle="" />
        <Button
          className="bg-primary-600  hover:!bg-primary-700 text-customgreys-darkGrey"
          onClick={handleCreateGuide}
        >
          New guide
        </Button>
      </div>
      {isError ? (
        <p className="w-full text-center pt-40 text-lg">
          Please log in to view your guides
        </p>
      ) : (
        <div className="dashboard__guides">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {guides?.map((guide) => (
                <Guide key={guide.guideId} guide={guide} isMy={true} />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default page;
