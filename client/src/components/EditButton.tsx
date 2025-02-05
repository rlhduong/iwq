import React from 'react';
import { Button } from './ui/button';
import { SquarePen } from 'lucide-react';
import { DialogTrigger } from '@radix-ui/react-dialog';

const EditButton = () => {
  return (
    <DialogTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        className="text-blue-400 hover:!text-blue-500"
      >
        <SquarePen />
      </Button>
    </DialogTrigger>
  );
};

export default EditButton;
