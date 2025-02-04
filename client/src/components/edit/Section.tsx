import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { SquarePen, Trash2 } from 'lucide-react';
import Chapter from './Chapter';

interface SectionProps {
  sectionIndex: number;
  section: Section;
  actions: EditFormSectionActions;
}

const Section = ({ section, actions, sectionIndex }: SectionProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="guide-edit__form-whole-section">
      <div className="guide-edit__form-section">
        <div
          className="flex flex-row justify-between"
          onClick={() => setOpen((prev) => !prev)}
        >
          <div className="flex flex-col gap-2">
            <h2 className="guide-edit__form-section-title">{section.title}</h2>
            <p className="guide-edit__form-section-description">
              {section.description}
            </p>
          </div>
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
              onClick={() => actions.deleteSection(sectionIndex)}
            >
              <Trash2 />
            </Button>
          </div>
        </div>
      </div>
      {open && (
        <div className="flex flex-col pl-[5%]">
          {section.chapters && (
            <div className="guide-edit__form-chapters">
              {section.chapters.map((chapter, index) => (
                <Chapter
                  sectionIndex={sectionIndex}
                  chapterIndex={index}
                  chapter={chapter}
                  actions={actions}
                  key={chapter.chapterId}
                />
              ))}
            </div>
          )}
          <div className="flex flex-row justify-start">
            <Button
              variant="ghost"
              className="guide-edit__form-create-chapter-button"
              onClick={() => actions.addChapter(sectionIndex)}
            >
              <Plus />
              Add chapter
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Section;