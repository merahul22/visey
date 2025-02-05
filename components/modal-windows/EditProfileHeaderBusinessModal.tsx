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
import EditProfileHeaderBusinessForm from "@/components/form/EditProfileHeaderBusinessForm";
import { Business } from "@prisma/client";

export default function EditProfileHeaderBusinessModal({
  business,
}: {
  business: Business;
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
          <DialogTitle>Edit Profile Header</DialogTitle>
        </DialogHeader>
        <EditProfileHeaderBusinessForm business={business} />
      </DialogContent>
    </Dialog>
  );
}
