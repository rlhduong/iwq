import React from 'react';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';

interface AddButtonProps {
  title: string;
  onClick: () => void;
}

const AddButton = ({ title, onClick }: AddButtonProps) => {
  return (
    <Button
      variant="ghost"
      className="guide-edit__form-create-chapter-button"
      onClick={onClick}
    >
      <Plus />
      {title}
    </Button>
  );
};

export default AddButton;
