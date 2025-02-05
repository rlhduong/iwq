import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface DeleteButtonProps {
  onClick: () => void;
}

const DeleteButton = ({ onClick }: DeleteButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-red-400 hover:!text-red-500"
      onClick={onClick}
    >
      <Trash2 />
    </Button>
  );
};

export default DeleteButton;
