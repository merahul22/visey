"use client";

import { Heart } from "@phosphor-icons/react/dist/ssr";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import removeSavedOpportunity from "@/actions/removeSavedOpportunity";
import saveOpportunity from "@/actions/save-opportunity";
import { toast } from "sonner";

const SaveOpportunityButton = ({
  isSaved,
  userId,
  opportunityId,
}: {
  isSaved: boolean;
  userId: string;
  opportunityId: string;
}) => {
  const [isLiked, setIsLiked] = useState(isSaved);
  const [loading, startTransition] = useTransition();

  const handleChangeLike = () => {
    if (isLiked) {
      setIsLiked(false);
      startTransition(async () => {
        const res = await removeSavedOpportunity(opportunityId, userId);

        if (res?.error) {
          setIsLiked(true);
          toast.error(res.error);
        }

        if (res?.success) {
          toast.success(res.success);
        }
      });
    } else {
      setIsLiked(true);
      startTransition(async () => {
        const res = await saveOpportunity(opportunityId, userId);

        if (res?.error) {
          setIsLiked(false);
          toast.error(res.error);
        }

        if (res?.success) {
          toast.success(res.success);
        }
      });
    }
  };

  return (
    <div className="px-4 cursor-pointer">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleChangeLike}
        disabled={loading}
      >
        {isLiked ? (
          <Heart weight="fill" className="w-6 h-6" />
        ) : (
          <Heart weight="regular" className="w-6 h-6" />
        )}
      </Button>
    </div>
  );
};

export default SaveOpportunityButton;
