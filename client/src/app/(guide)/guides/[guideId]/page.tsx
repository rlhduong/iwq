'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { useGetGuideQuery } from '@/state/api';
import Sidebar from '@/components/guide/Sidebar';
import Loading from '@/components/Loader';
import Header from '@/components/guide/Header';
import Content from '@/components/guide/Content';

const page = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const {
    data: guide,
    error,
    isError,
    isLoading,
  } = useGetGuideQuery(params.guideId as string);
  const section = searchParams.get('section');
  const chapter = searchParams.get('chapter');
  const [currContent, setCurrContent] = useState<Chapter | null>(null);
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

  useEffect(() => {
    if (guide) {
      console.log(guide);
      if (!section || !chapter) {
        return;
      }

      if (guide.sections.length === 0) {
        return;
      }

      const s = parseInt(section as string) - 1;
      if (s < 0 || s >= guide.sections.length) {
        router.push(`/guides/${guide.guideId}`);
      }

      const c = parseInt(chapter as string) - 1;
      if (c < 0 || c >= guide.sections[s].chapters.length) {
        router.push(`/guides/${guide.guideId}`);
      }
      setCurrContent(guide.sections[s].chapters[c]);
    }
  }, [guide, section, chapter]);

  return (
    <div className="guide__layout">
      <Header
        open={open}
        handleClick={handleCollapse}
        guideId={guide?.guideId || ''}
      />
      <div className="flex flex-row w-full">
        {isLoading && <Loading />}
        {guide && (
          <>
            <main className="guide__main w-2/3">
              {currContent && <Content chapter={currContent} />}
              {/* <hr className="text-customgreys-darkerGrey" /> */}
              {/* {guide && <Info guide={guide} />} */}
            </main>

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
