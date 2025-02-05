import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { SquarePen, Trash2, PanelTopOpen } from 'lucide-react';
import Chapter from './Chapter';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import SectionModal from './SectionModal';
import DeleteButton from '../DeleteButton';
import EditButton from '../EditButton';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface SectionProps {
  sectionIndex: number;
  section: Section;
  actions: EditFormSectionActions;
}

const Section = ({ section, actions, sectionIndex }: SectionProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog>
      <Collapsible open={open} onOpenChange={setOpen}>
        <div className="guide-edit__form-whole-section">
          <div className="guide-edit__form-section">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col gap-2">
                <h2 className="guide-edit__form-section-title">
                  {section.title}
                </h2>
                <p className="guide-edit__form-section-description">
                  {section.description}
                </p>
              </div>
              <div className="flex flex-row">
                <EditButton />
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-[#CBB9A5] hover:!text-[#d4b18a]"
                  >
                    <PanelTopOpen />
                  </Button>
                </CollapsibleTrigger>
                <DeleteButton
                  onClick={() => actions.deleteSection(sectionIndex)}
                />
              </div>
            </div>
          </div>
          <CollapsibleContent>
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
          </CollapsibleContent>
        </div>
        <SectionModal
          section={section}
          sectionIndex={sectionIndex}
          actions={actions}
        />
      </Collapsible>
    </Dialog>
  );
};

export default Section;
