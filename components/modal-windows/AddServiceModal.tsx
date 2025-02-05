"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PencilSimple } from "@phosphor-icons/react/dist/ssr";
import AddServiceForm from "@/components/form/AddServiceForm";

export default function AddServiceModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" className="text-linkBlue">
          <PencilSimple size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Services</DialogTitle>
        </DialogHeader>
        <AddServiceForm />
      </DialogContent>
    </Dialog>
  );
}
