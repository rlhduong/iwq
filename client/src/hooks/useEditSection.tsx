import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface UseEditSectionprop {
  sections: Section[];
}

const useEditSection = ({ sections }: UseEditSectionprop) => {
  const [currSections, setCurrSections] = useState(sections);

  const initialise = (sections: Section[]) => {
    setCurrSections(sections);
  };

  const addSection = () => {
    const newSection = {
      sectionId: uuidv4(),
      title: 'New Section',
      description: 'New Section description',
      chapters: [],
    };
    setCurrSections([...currSections, newSection]);
  };

  const editSection = (sectionIndex: number, newSection: Section) => {
    const newSections = [...currSections];
    newSections[sectionIndex] = newSection;
    setCurrSections(newSections);
  };

  const deleteSection = (sectionIndex: number) => {
    const newSections = [...currSections];
    newSections.splice(sectionIndex, 1);
    setCurrSections(newSections);
  };

  const addChapter = (sectionIndex: number) => {
    const newChapter = {
      chapterId: uuidv4(),
      title: 'New Chapter',
      description: 'New Chapter description',
      type: 'text' as 'text',
      content: '',
    };
    const newSections = [...currSections];
    const updatedSection = {
      ...newSections[sectionIndex],
      chapters: [...newSections[sectionIndex].chapters, newChapter],
    };
    newSections[sectionIndex] = updatedSection;
    setCurrSections(newSections);
  };

  const editChapter = (
    sectionIndex: number,
    chapterIndex: number,
    newChapter: Chapter
  ) => {
    const newSections = currSections.map((section, sIdx) =>
      sIdx === sectionIndex
        ? {
            ...section,
            chapters: section.chapters.map((chapter, cIdx) =>
              cIdx === chapterIndex ? { ...chapter, ...newChapter } : chapter
            ),
          }
        : section
    );

    setCurrSections(newSections);
  };

  const deleteChapter = (sectionIndex: number, chapterIndex: number) => {
    const newSections = currSections.map((section, idx) =>
      idx === sectionIndex
        ? {
            ...section,
            chapters: section.chapters.filter((_, i) => i !== chapterIndex),
          }
        : section
    );

    setCurrSections(newSections);
  };

  return {
    currSections,
    actions: {
      initialise,
      addSection,
      editSection,
      deleteSection,
      addChapter,
      editChapter,
      deleteChapter,
    },
  };
};

export default useEditSection;
