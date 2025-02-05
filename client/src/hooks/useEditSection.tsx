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

  const editSection = (sectionId: string, newSection: Section) => {
    const newSections = currSections.map((section) =>
      section.sectionId === sectionId ? newSection : section
    );
    setCurrSections(newSections);
  };

  const deleteSection = (sectionId: string) => {
    const newSections = currSections.filter(
      (section) => section.sectionId !== sectionId
    );
    setCurrSections(newSections);
  };

  const addChapter = (sectionId: string) => {
    const newChapter = {
      chapterId: uuidv4(),
      title: 'New Chapter',
      description: 'New Chapter description',
      type: 'text' as 'text',
      content: '',
    };
    const newSections = currSections.map((section) =>
      section.sectionId === sectionId
        ? { ...section, chapters: [...section.chapters, newChapter] }
        : section
    );
    setCurrSections(newSections);
  };

  const editChapter = (
    sectionId: string,
    chapterId: string,
    newChapter: Chapter
  ) => {
    const newSections = currSections.map((section) =>
      section.sectionId === sectionId
        ? {
            ...section,
            chapters: section.chapters.map((chapter) =>
              chapter.chapterId === chapterId ? newChapter : chapter
            ),
          }
        : section
    );

    setCurrSections(newSections);
  };

  const deleteChapter = (sectionId: string, chapterId: string) => {
    const newSections = currSections.map((section) =>
      section.sectionId === sectionId
        ? {
            ...section,
            chapters: section.chapters.filter(
              (chapter) => chapter.chapterId !== chapterId
            ),
          }
        : section
    );

    setCurrSections(newSections);
  };

  const swapSections = (sourceId: string, destinationId: string) => {
    const srcIndex = currSections.findIndex(
      (section) => section.sectionId === sourceId
    );
    const destIndex = currSections.findIndex(
      (section) => section.sectionId === destinationId
    );
    const newSections = [...currSections];
    const [removed] = newSections.splice(srcIndex, 1);
    newSections.splice(destIndex, 0, removed);
    setCurrSections(newSections);
    // if (srcIndex < destIndex) {
    //   let i = srcIndex;
    //   while (i < destIndex) {
    //     newSections[i] = currSections[i + 1];
    //     i++;
    //   }
    // } else {
    //   let i = destIndex;
    //   while (i < srcIndex) {
    //     newSections[i + 1] = currSections[i];
    //     i++;
    //   }
    // }
    // newSections[destIndex] = currSections[srcIndex];
    // setCurrSections(newSections);
  };

  const swapChapters = (
    sectionId: string,
    sourceId: string,
    destinationId: string
  ) => {
    const newSections = currSections.map((section) => {
      if (section.sectionId !== sectionId) {
        return section;
      }

      const srcIndex = section.chapters.findIndex(
        (chapter) => chapter.chapterId === sourceId
      );

      const destIndex = section.chapters.findIndex(
        (chapter) => chapter.chapterId === destinationId
      );

      const newChapters = [...section.chapters];
      if (srcIndex < destIndex) {
        let i = srcIndex;
        while (i < destIndex) {
          newChapters[i] = section.chapters[i + 1];
          i++;
        }
      } else {
        let i = destIndex;
        while (i < srcIndex) {
          newChapters[i + 1] = section.chapters[i];
          i++;
        }
      }
      newChapters[destIndex] = section.chapters[srcIndex];
      const newSection = { ...section, chapters: newChapters };
      return newSection;
    });

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
      swapSections,
      swapChapters,
    },
  };
};

export default useEditSection;
