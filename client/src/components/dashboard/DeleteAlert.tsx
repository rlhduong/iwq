import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useDeleteGuideMutation } from '@/state/api';
import { Trash } from 'lucide-react';

const DeleteAlert = ({ guideId }: { guideId: string }) => {
  const [deleteGuide] = useDeleteGuideMutation();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:text-red-600 text-red-400 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-customgreys-primarybg border-customgreys-darkerGrey">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            guideand remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button
              variant="ghost"
              className="border-none text-blue-400 hover:text-blue-600"
              onClick={(e) => e.stopPropagation()}
            >
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              className="bg-red-800 hover:bg-red-900"
              onClick={(e) => {
                e.stopPropagation();
                deleteGuide(guideId);
              }}
            >
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlert;
