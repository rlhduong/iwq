import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '../ui/textarea';

interface SectionModalProps {
  sectionIndex: number;
  section: Section;
  actions: EditFormSectionActions;
}

const SectionModal = ({
  section,
  actions,
}: SectionModalProps) => {
  const [title, setTitle] = useState(section.title);
  const [description, setDescription] = useState(section.description);

  const handleSubmit = () => {
    if (section) {
      const newSection = {
        ...section,
        title,
        description,
      };
      actions.editSection(section.sectionId, newSection);
    }
  };
  return (
    <DialogContent className="guide-edit__section-modal">
      <DialogHeader>
        <DialogTitle>Edit Section</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="title" className="text-right">
            Title
          </Label>
          <Input
            className="guide-edit__section-modal-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <Textarea
            className="guide-edit__section-modal-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button
            type="submit"
            variant="outline"
            className="guide-edit__section-save-button"
            onClick={handleSubmit}
          >
            Save changes
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default SectionModal;
