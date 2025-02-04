import React from 'react';

import { Button } from '@/components/ui/button';
import { SquarePen, Trash2 } from 'lucide-react';

interface ChapterProps {
  sectionIndex: number;
  chapterIndex: number;
  chapter: Chapter;
  actions: EditFormSectionActions;
}

const Chapter = ({
  chapter,
  actions,
  sectionIndex,
  chapterIndex,
}: ChapterProps) => {
  return (
    <div className="guide-edit_form-chapter">
      <h3>{chapter.title}</h3>
      <div className="flex flex-row">
        <Button
          variant="ghost"
          size="icon"
          className="text-blue-400 hover:!text-blue-500"
        >
          <SquarePen />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-red-400 hover:!text-red-500"
          onClick={() => actions.deleteChapter(sectionIndex, chapterIndex)}
        >
          <Trash2 />
        </Button>
      </div>
    </div>
  );
};

export default Chapter;
