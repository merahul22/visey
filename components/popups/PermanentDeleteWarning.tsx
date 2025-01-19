"use client";

import React, { useTransition } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { deleteAccount } from "@/actions/delete-account";
import { signOut } from "next-auth/react";

interface PermanentDeleteWarningProps {
  onCancel: () => void;
  userId: string;
}

const PermanentDeleteWarning = ({
  onCancel,
  userId,
}: PermanentDeleteWarningProps) => {
  const [loading, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      const res = await deleteAccount(userId);
      if (res.error) {
        console.error(res.error);
      }

      if (res.success) {
        signOut();
      }
    });
  };

  return (
    <div className="max-w-[361px] flex flex-col items-center space-y-4">
      <div>
        <p className="font-semibold text-center w-[180px]">
          Do you really wish to permanently delete your account ?
        </p>
      </div>
      <div>
        <Image
          src="/img/warning.webp"
          height={135}
          width={180}
          alt="Warning Logo"
        />
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="rounded-full"
          onClick={() => onCancel()}
        >
          Cancel
        </Button>
        <Button
          variant="default"
          size="sm"
          className="rounded-full"
          onClick={handleDelete}
          disabled={loading}
        >
          Delete permanently
        </Button>
      </div>
    </div>
  );
};

export default PermanentDeleteWarning;
