'use client';

import React, { useEffect, useState } from 'react';
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

enum GuideStatus {
  Draft = 'draft',
  Published = 'published',
}

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
    sections: guide?.sections || [],
  });

  const [thumbnail, setThumbnail] = useState<File | null>(null);

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
      actions.initialise(guide.sections);
    }
  }, [guide]);

  const handleSaveProgress = async () => {
    if (!guide) return;
    const updatedGuide = {
      ...guide,
      ...form.getValues(),
      sections: currSections,
    };
    const formData = new FormData();
    formData.append('guide', JSON.stringify(updatedGuide));
    if (thumbnail) {
      formData.append('thumbnail', thumbnail as Blob);
    }
    formData.append('guideId', guide.guideId);
    await updateGuide(formData);
  };

  const handleToggleStatus = async () => {
    if (!guide) return;
    const updatedGuide = {
      ...guide,
      status:
        guide.status === GuideStatus.Draft
          ? GuideStatus.Published
          : GuideStatus.Draft,
    };
    const formData = new FormData();
    formData.append('guide', JSON.stringify(updatedGuide));
    formData.append('guideId', guide.guideId);
    updateGuide(formData);
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
          <div className="flex flex-row gap-6">
            {guide && (
              <Button
                className={
                  guide.status === 'draft'
                    ? 'text-green-500 hover:text-green-600'
                    : 'text-[#c5bc6c] hover:text-[#cdc04c]'
                }
                variant="ghost"
                onClick={handleToggleStatus}
              >
                {guide.status === 'draft' ? 'Publish guide' : 'Revert to draft'}
              </Button>
            )}
            <Button
              className="guide-edit__save-button"
              onClick={handleSaveProgress}
            >
              Save changes
            </Button>
          </div>
        </div>
        <div className="guide-edit__form">
          <Left form={form} file={thumbnail} setFile={setThumbnail} img={guide?.image || ''} />
          <Right currSections={currSections} actions={actions} />
        </div>
      </main>
    </div>
  );
};

export default page;
