'use client';

import React, { useEffect } from 'react';
import Header from '@/components/dashboard/Header';

import { useGetGuideQuery } from '@/state/api';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { editGuideSchema, EditGuideFormData } from '@/lib/schemas';
import Left from './Left';

const page = () => {
  const router = useRouter();
  const params = useParams();
  const {
    data: guide,
    error,
    isError,
  } = useGetGuideQuery(params.guideId as string);

  if (isError) {
    if (error.status === 404) {
      return (
        <div className="w-full h-full flex justify-center items-center">
          Guide not found
        </div>
      );
    }

    if (error.status === 403) {
      return (
        <div className="w-full h-full flex justify-center items-center">
          You are not authorised to edit this guide
        </div>
      );
    }
  }

  const form = useForm<EditGuideFormData>({
    resolver: zodResolver(editGuideSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  useEffect(() => {
    if (guide) {
      form.reset({
        title: guide.title,
        description: guide.description,
      });
    }
  }, [guide]);

  const handleSaveProgress = () => {
    console.log(form.getValues());
  };

  return (
    <div className="guide-edit__layout">
      <main className="guide-edit__main">
        <Button
          variant="outline"
          onClick={() => router.push('/guides/my')}
          className="guide-edit__back-button"
        >
          <ArrowLeft />
          Back to guides
        </Button>
        <div className="flex flex-row justify-between w-full">
          <Header
            title="Guide Setup"
            subtitle="Complete all fields and save your progress"
          />
          <div className="flex gap-2">
            <Button
              className="guide-edit__save-button"
              onClick={handleSaveProgress}
            >
              Save
            </Button>
          </div>
        </div>
        <div className="guide-edit__form">
          <Left form={form} />
          <div className="guide-edit__form-box"></div>
        </div>
      </main>
    </div>
  );
};

export default page;
