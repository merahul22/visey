"use client";

import { HeartStraight } from "@phosphor-icons/react/dist/ssr";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import saveBusiness from "@/actions/save-business";
import removeSavedBusiness from "@/actions/remove-saved-business";

const SaveOpportunityButton = ({
  isSaved,
  userId,
  businessId,
}: {
  isSaved: boolean;
  userId: string;
  businessId: string;
}) => {
  const [isLiked, setIsLiked] = useState(isSaved);
  const [loading, startTransition] = useTransition();

  const handleChangeLike = () => {
    if (isLiked) {
      setIsLiked(false);
      startTransition(async () => {
        const res = await removeSavedBusiness(businessId, userId);

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
        const res = await saveBusiness(businessId, userId);

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
          <HeartStraight weight="fill" className="w-6 h-6" />
        ) : (
          <HeartStraight weight="regular" className="w-6 h-6" />
        )}
      </Button>
    </div>
  );
};

export default SaveOpportunityButton;
