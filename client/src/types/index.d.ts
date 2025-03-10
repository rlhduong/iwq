declare global {
  interface User {
    id: string;
    firstName?: string;
    lastName?: string;
    email: string;
    favourites?: string[];
  }

  interface Question {
    questionId: string;
    content: string;
    image?: string;
    options: string[];
    answer: number;
  }

  interface Chapter {
    chapterId: string;
    title: string;
    description: string;
    type: 'quiz' | 'video' | 'text';
    content?: string;
    videoUrl?: string;
    questions?: Question[];
  }

  interface Section {
    sectionId: string;
    title: string;
    description: string;
    chapters: Chapter[];
  }

  interface Guide {
    guideId: string;
    authorId: string;
    authorName: string;
    title: string;
    description: string;
    category: string;
    image: string;
    status: 'draft' | 'published' | 'archived';
    sections: Section[];
    createdAt: string;
    updatedAt: string;
    featured?: boolean;
    favourites?: number;
  }

  interface FeaturedGuideCardProps {
    guideId: string;
    title: string;
    description: string;
    image: string;
    authorName: string;
  }

  interface SideBarGroupProps {
    title: string;
    icon: React.ReactNode;
    items: {
      title: string;
      url: string;
    }[];
  }

  interface DashboardHeaderProps {
    title: string;
    subtitle: string;
  }

  interface GuideCardProps {
    guide: Guide;
    isMy: boolean;
  }

  interface EditFormSectionActions {
    initialise: (sections: Section[]) => void;
    addSection: () => void;
    editSection: (sectionId: string, newSection: Section) => void;
    deleteSection: (sectionId: string) => void;
    addChapter: (sectionId: string) => void;
    editChapter: (
      sectionId: string,
      chapterId: string,
      newChapter: Chapter
    ) => void;
    deleteChapter: (sectionId: string, chapterId: string) => void;
    swapSections: (sourceId: string, destinationId: string) => void;
    swapChapters: (
      sectionId: string,
      sourceId: string,
      destinationId: string
    ) => void;
  }
}

export {};
