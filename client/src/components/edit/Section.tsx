import React, { useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { PanelTopOpen } from 'lucide-react';
import { Dialog } from '@/components/ui/dialog';
import Chapter from './Chapter';
import SectionModal from './SectionModal';
import DeleteButton from '../DeleteButton';
import EditButton from '../EditButton';
import { Draggable } from '@hello-pangea/dnd';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useTransition, useOptimistic } from 'react';
import { GripVertical } from 'lucide-react';

interface SectionProps {
  sectionIndex: number;
  section: Section;
  actions: EditFormSectionActions;
}

const Section = ({ section, actions, sectionIndex }: SectionProps) => {
  const [open, setOpen] = useState(false);
  const [_, startTransition] = useTransition();

  const [state, setState] = useOptimistic(
    section.chapters,
    (chapters, { sourceId, destinationId }) => {
      const srcIndex = chapters.findIndex(
        (chapter) => chapter.chapterId === sourceId
      );
      const destIndex = chapters.findIndex(
        (chapter) => chapter.chapterId === destinationId
      );

      const newChapters = [...chapters];
      newChapters[destIndex] = chapters[srcIndex];
      newChapters[srcIndex] = chapters[destIndex];
      return newChapters;
    }
  );

  const onDragEnd = async (result: any) => {
    const sourceId = result.draggableId;
    const destinationId = section.chapters[result.destination.index].chapterId;
    startTransition(() => {
      setState({ sourceId, destinationId });
      actions.swapChapters(section.sectionId, sourceId, destinationId);
    });
  };

  return (
    <Draggable draggableId={section.sectionId} index={sectionIndex}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={{ ...provided.draggableProps.style }}
        >
          <Dialog>
            <Collapsible open={open} onOpenChange={setOpen}>
              <div className="guide-edit__form-whole-section">
                <div className="guide-edit__form-section">
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-4 items-center">
                      <div {...provided.dragHandleProps}>
                        <GripVertical className="text-primary-500 hover:!text-primary-700" />
                      </div>

                      <div className="flex flex-col gap-2">
                        <h2 className="guide-edit__form-section-title">
                          {section.title}
                        </h2>
                        <p className="guide-edit__form-section-description">
                          {section.description}
                        </p>
                      </div>
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
                        onClick={() => actions.deleteSection(section.sectionId)}
                      />
                    </div>
                  </div>
                </div>
                <CollapsibleContent>
                  <div className="flex flex-col pl-[5%]">
                    {section.chapters && (
                      <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId={section.sectionId}>
                          {(DroppableProvided) => (
                            <div
                              className="guide-edit__form-chapters"
                              ref={DroppableProvided.innerRef}
                              {...DroppableProvided.droppableProps}
                            >
                              {state.map((chapter, index) => (
                                <Chapter
                                  chapter={chapter}
                                  actions={actions}
                                  chapterIndex={index}
                                  sectionId={section.sectionId}
                                  key={chapter.chapterId}
                                />
                              ))}
                              {DroppableProvided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </DragDropContext>
                    )}
                    <div className="flex flex-row justify-start">
                      <Button
                        variant="ghost"
                        className="guide-edit__form-create-chapter-button"
                        onClick={() => actions.addChapter(section.sectionId)}
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
        </div>
      )}
    </Draggable>
  );
};

export default Section;
