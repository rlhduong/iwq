'use client';

import React from 'react';
import { Dialog } from '@/components/ui/dialog';
import ChapterModal from './ChapterModal';
import { motion } from 'framer-motion';
import DeleteButton from '../DeleteButton';
import EditButton from '../EditButton';
import { Draggable } from '@hello-pangea/dnd';

interface ChapterProps {
  sectionId: string;
  chapter: Chapter;
  chapterIndex: number;
  actions: EditFormSectionActions;
}

const Chapter = ({
  chapter,
  actions,
  chapterIndex,
  sectionId,
}: ChapterProps) => {
  return (
    <Draggable draggableId={chapter.chapterId} index={chapterIndex}>
      {(provided) => (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: chapterIndex * 0.4 }}
        >
          <Dialog>
            <div
              className="guide-edit_form-chapter"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <h3>{chapter.title}</h3>
              <div className="flex flex-row">
                <EditButton />
                <DeleteButton
                  onClick={() =>
                    actions.deleteChapter(sectionId, chapter.chapterId)
                  }
                />
              </div>
            </div>
            <ChapterModal
              chapter={chapter}
              sectionId={sectionId}
              actions={actions}
            />
          </Dialog>
        </motion.div>
      )}
    </Draggable>
  );
};

export default Chapter;
