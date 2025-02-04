import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface UseEditSectionprop {
  sections: Section[];
}

const useEditSection = ({ sections }: UseEditSectionprop) => {
  const [currSections, setCurrSections] = useState(sections);

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
    newSections[sectionIndex].chapters.push(newChapter);
    setCurrSections(newSections);
  };

  const editChapter = (
    sectionIndex: number,
    chapterIndex: number,
    newChapter: Chapter
  ) => {
    const newSections = [...currSections];
    newSections[sectionIndex].chapters[chapterIndex] = newChapter;
    setCurrSections(newSections);
  };

  const deleteChapter = (sectionIndex: number, chapterIndex: number) => {
    const newSections = [...currSections];
    newSections[sectionIndex].chapters.splice(chapterIndex, 1);
    setCurrSections(newSections);
  };

  return {
    currSections,
    actions: {
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
