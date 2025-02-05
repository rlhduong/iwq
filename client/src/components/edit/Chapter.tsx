'use client';

import React from 'react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import ChapterModal from './ChapterModal';
import { motion } from 'framer-motion';
import DeleteButton from '../DeleteButton';
import EditButton from '../EditButton';

interface ChapterProps {
  sectionIndex: number;
  chapterIndex: number;
  chapter: Chapter;
  actions: EditFormSectionActions;
}

const Chapter = ({
  chapter,
  actions,
  sectionIndex,
  chapterIndex,
}: ChapterProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: chapterIndex * 0.4 }}
    >
      <Dialog>
        <div className="guide-edit_form-chapter">
          <h3>{chapter.title}</h3>
          <div className="flex flex-row">
            <EditButton />
            <DeleteButton
              onClick={() => actions.deleteChapter(sectionIndex, chapterIndex)}
            />
          </div>
        </div>
        <ChapterModal
          chapter={chapter}
          chapterIndex={chapterIndex}
          sectionIndex={sectionIndex}
          actions={actions}
        />
      </Dialog>
    </motion.div>
  );
};

export default Chapter;
