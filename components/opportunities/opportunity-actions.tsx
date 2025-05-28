'use client';

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsThreeVertical, Trash } from "@phosphor-icons/react/dist/ssr";
import { deleteOpportunity } from "@/actions/delete-opportunity";
import { promoteOpportunity } from "@/actions/promote-opportunity";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface OpportunityActionsProps {
  opportunityId: string;
}

export const OpportunityActions = ({ opportunityId }: OpportunityActionsProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setLoading(true);
      const result = await deleteOpportunity(opportunityId);
      if (result.success) {
        toast.success('Opportunity deleted successfully');
        router.refresh();
      } else {
        toast.error('Failed to delete opportunity');
      }
    } catch (error) {
      toast.error('Error deleting opportunity');
    } finally {
      setLoading(false);
      setShowDeleteDialog(false);
    }
  };

  const handlePromote = async () => {
    try {
      setLoading(true);
      const result = await promoteOpportunity(opportunityId);
      if (result.success) {
        toast.success('Opportunity promoted successfully');
        router.refresh();
      } else {
        toast.error('Failed to promote opportunity');
      }
    } catch (error) {
      toast.error('Error promoting opportunity');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <DotsThreeVertical className="w-5 h-5 cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => handlePromote()}>
            Promote
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setShowDeleteDialog(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Opportunity</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this opportunity? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
