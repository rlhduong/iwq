import React from 'react';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Section from './Section';

const Right = ({
  currSections,
  actions,
}: {
  currSections: Section[];
  actions: EditFormSectionActions;
}) => {
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
      {currSections.length !== 0 && (
        <div className="guide-edit__form-sections">
          {currSections.map((section, index) => (
            <Section
              sectionIndex={index}
              section={section}
              actions={actions}
              key={section.sectionId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Right;
