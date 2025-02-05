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
import EditAboutBusinessForm from "@/components/form/EditAboutBusinessForm";

export default function EditAboutBusinessModal({
  location,
  description,
}: {
  location: string;
  description: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" className="text-linkBlue">
          <PencilSimple size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit About</DialogTitle>
        </DialogHeader>
        <EditAboutBusinessForm location={location} description={description} />
      </DialogContent>
    </Dialog>
  );
}
