import React from 'react';
import { ChevronLast } from 'lucide-react';
import Section from './Section';
import { Accordion } from '@radix-ui/react-accordion';

interface SidebarProps {
  guide: Guide;
  handleClick: () => void;
}

const Sidebar = ({ guide, handleClick }: SidebarProps) => {
  return (
    <aside className="h-full">
      <nav className={`guide__sidebar`}>
        <div className="flex flex-row items-center p-4 justify-between">
          <h1 className="text-lg font-semibold text-white-50">Content</h1>
          <ChevronLast
            size={12}
            className="guide__collapse-button"
            onClick={handleClick}
          />
        </div>
        <hr className="w-full text-customgreys-darkerGrey" />
        <Accordion type="single" collapsible className="w-full">
          <ol className="guide__section-list">
            {guide.sections.map((section, index) => (
              <Section
                guideId={guide.guideId}
                key={section.sectionId}
                index={index}
                section={section}
              />
            ))}
          </ol>
        </Accordion>
      </nav>
    </aside>
  );
};

export default Sidebar;
