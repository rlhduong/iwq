'use client';

import React, { useEffect } from 'react';
import Header from '@/components/dashboard/Header';

import { useGetGuideQuery, useUpdateGuideMutation } from '@/state/api';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { editGuideSchema, EditGuideFormData } from '@/lib/schemas';
import useEditSection from '@/hooks/useEditSection';
import Left from '@/components/edit/Left';
import Right from '@/components/edit/Right';

const chapter: Chapter = {
  chapterId: '1',
  title: 'Chapter 1',
  description: 'Chapter 1 description',
  type: 'text' as 'text',
  content: 'Chapter 1 content',
};

const sections2: Section = {
  sectionId: '1',
  title: 'Section 1',
  description: 'Section 1 description',
  chapters: [chapter],
};

const page = () => {
  const router = useRouter();
  const params = useParams();
  const [updateGuide] = useUpdateGuideMutation();
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

  const { currSections, actions } = useEditSection({
    sections: guide?.sections || [sections2],
  });

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

  const handleSaveProgress = async () => {
    if (!guide) return;
    const updatedGuide = {
      ...guide,
      ...form.getValues(),
      sections: currSections,
    };
    console.log(updatedGuide);
    updateGuide(updatedGuide);
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
          <Right currSections={currSections} actions={actions} />
        </div>
      </main>
    </div>
  );
};

export default page;
