import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Form, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '../ui/textarea';
import { EditChapterFormData, editChapterSchema } from '@/lib/schemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

enum ChapterType {
  Quiz = 'quiz',
  Video = 'video',
  Text = 'text',
}

interface ChapterModalProps {
  sectionId: string;
  chapter: Chapter;
  actions: EditFormSectionActions;
}

const ChapterModal = ({
  chapter,
  sectionId,
  actions,
}: ChapterModalProps) => {
  const [chapterType, setChapterType] = useState(chapter.type);

  const form = useForm<EditChapterFormData>({
    resolver: zodResolver(editChapterSchema),
    defaultValues: {
      title: '',
      description: '',
      content: '',
      videoUrl: '',
    },
  });

  useEffect(() => {
    if (chapter) {
      form.reset({
        title: chapter.title,
        description: chapter.description,
        content: chapter.content,
        videoUrl: chapter.videoUrl,
      });
    }
  }, [chapter]);

  const handleSubmit = () => {
    if (chapter) {
      const newChapter = {
        ...chapter,
        title: form.getValues('title'),
        description: form.getValues('description'),
        type: chapterType,
        content: form.getValues('content'),
        videoUrl: form.getValues('videoUrl'),
        questions: chapter.questions,
      };
      actions.editChapter(sectionId, chapter.chapterId, newChapter);
    }
  };

  return (
    <DialogContent className="guide-edit__section-modal">
      <DialogHeader>
        <DialogTitle>Edit Chapter</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form className="flex flex-col mt-4 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input {...field} className="guide-edit__section-modal-input" />
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <div className="grid grid-cols-4 gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  {...field}
                  className="guide-edit__section-modal-input"
                />
              </div>
            )}
          />
          <div className="grid grid-cols-4 gap-4 items-center">
            <Label htmlFor="description" className="text-right">
              Type
            </Label>
            <Select
              onValueChange={(value) => setChapterType(value as ChapterType)}
            >
              <SelectTrigger className="col-span-2 border-customgreys-darkerGrey focus:border-primary-500">
                <SelectValue
                  placeholder={chapter.type === 'text' ? 'Notes' : chapter.type}
                />
              </SelectTrigger>
              <SelectContent className="border-customgreys-darkerGrey bg-customgreys-sidebar">
                <SelectGroup>
                  <SelectItem
                    value={ChapterType.Text}
                    className="hover:!bg-slate-700"
                  >
                    Notes
                  </SelectItem>
                  <SelectItem
                    value={ChapterType.Video}
                    className="hover:!bg-slate-700"
                  >
                    Video
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {chapterType === ChapterType.Text && (
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <div className="flex flex-col  gap-4">
                  <Label htmlFor="title">Content</Label>
                  <Textarea
                    {...field}
                    className="guide-edit__section-modal-input h-[150px]"
                  />
                </div>
              )}
            />
          )}
          {chapterType === ChapterType.Video && (
            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <div className="flex flex-col gap-4">
                  <Label htmlFor="title">Video url</Label>
                  <Input
                    {...field}
                    className="guide-edit__section-modal-input"
                  />
                </div>
              )}
            />
          )}
        </form>
      </Form>
      <div className="w-full flex flex-row justify-end">
        <DialogClose asChild>
          <Button
            type="submit"
            variant="outline"
            className="guide-edit__section-save-button"
            onClick={handleSubmit}
          >
            Save changes
          </Button>
        </DialogClose>
      </div>
    </DialogContent>
  );
};

export default ChapterModal;
