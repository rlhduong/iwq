import React from 'react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';

interface SectionProps {
  guideId: string;
  section: Section;
  index: number;
}

const Section = ({ guideId, section, index }: SectionProps) => {
  return (
    <li>
      <AccordionItem value={`item-${section.sectionId}`}>
        <AccordionTrigger className="guide__section-title">
          {index + 1}. {section.title}
        </AccordionTrigger>
        <AccordionContent>
          <ol className="guide__chapter-list">
            {section.chapters.map((chapter, cIdx) => (
              <Link
                href={`/guides/${guideId}?section=${index + 1}&chapter=${
                  cIdx + 1
                }`}
                key={chapter.chapterId}
              >
                <li className="guide__chapter">{chapter.title}</li>
              </Link>
            ))}
          </ol>
        </AccordionContent>
      </AccordionItem>
    </li>
  );
};

export default Section;
