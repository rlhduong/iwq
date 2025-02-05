'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Section from './Section';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useTransition, useOptimistic } from 'react';

const Right = ({
  currSections,
  actions,
}: {
  currSections: Section[];
  actions: EditFormSectionActions;
}) => {
  const [_, startTransition] = useTransition();
  const [state, setState] = useOptimistic(
    currSections,
    (sections, { sourceId, destinationId }) => {
      const srcIndex = sections.findIndex(
        (section) => section.sectionId === sourceId
      );
      const destIndex = sections.findIndex(
        (section) => section.sectionId === destinationId
      );

      const newSections = [...sections];
      newSections[destIndex] = sections[srcIndex];
      newSections[srcIndex] = sections[destIndex];
      return newSections;
    }
  );

  const onDragEnd = async (result: any) => {
    const sourceId = result.draggableId;
    const destinationId = currSections[result.destination.index].sectionId;
    startTransition(() => {
      setState({ sourceId, destinationId });
      actions.swapSections(sourceId, destinationId);
    });
  };

  return (
    <div className="guide-edit__form-box guide-edit__form-section-box">
      <div className="flex flex-row w-full mb-4 justify-between">
        <h1 className="text-white-50 text-lg">Sections</h1>
        <Button
          variant="ghost"
          className="guide-edit__form-create-section-button"
          onClick={actions.addSection}
        >
          <Plus />
          Add section
        </Button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        {currSections.length !== 0 && (
          <Droppable droppableId="sections">
            {(DroppableProvided) => (
              <div
                className="guide-edit__form-sections"
                ref={DroppableProvided.innerRef}
                {...DroppableProvided.droppableProps}
              >
                {state.map((section, index) => (
                  <Section
                    sectionIndex={index}
                    section={section}
                    actions={actions}
                    key={section.sectionId}
                  />
                ))}
                {DroppableProvided.placeholder}
              </div>
            )}
          </Droppable>
        )}
      </DragDropContext>
    </div>
  );
};

export default Right;
