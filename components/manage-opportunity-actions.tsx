'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsThreeVertical, Pencil, Trash } from '@phosphor-icons/react';
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { deleteOpportunity } from "@/actions/delete-opportunity";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ManageOpportunityActionsProps {
  opportunityId: string;
}

export default function ManageOpportunityActions({ opportunityId }: ManageOpportunityActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setLoading(true);
      const result = await deleteOpportunity(opportunityId);
      if (result.success) {
        toast.success('Opportunity deleted successfully');
        router.refresh(); // Refresh the page to update the list
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
  // Promote functionality temporarily removed

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <DotsThreeVertical className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => router.push(`/edit-funding-opportunity/${opportunityId}`)}>
            <Pencil className="w-4 h-4 mr-2" />
            Edit
          </DropdownMenuItem>          {/* Promote feature temporarily removed */}
          <DropdownMenuItem 
            onClick={() => setShowDeleteDialog(true)}
            className="text-red-600"
          >
            <Trash className="w-4 h-4 mr-2" />
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
}
