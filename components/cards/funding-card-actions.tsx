"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SaveOpportunityButton from "@/components/SaveOpportunityButton";
import { useRouter } from "next/navigation";

interface FundingCardActionsProps {
  isSaved: boolean;
  userId: string;
  opportunityId: string;
  registrationFormLink?: string | null;
}

const FundingCardActions = ({
  isSaved,
  userId,
  opportunityId,
  registrationFormLink,
}: FundingCardActionsProps) => {
  const router = useRouter();
  
  const handleExternalLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (registrationFormLink) {
      window.open(registrationFormLink, "_blank", "noopener,noreferrer");
    }
  };
  
  const handleInternalLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/apply-opportunity/${opportunityId}`);
  };

  return (
    <div className="flex gap-4 items-center justify-end" onClick={(e) => e.stopPropagation()}>
      <div onClick={(e) => e.preventDefault()}>
        <SaveOpportunityButton
          isSaved={isSaved}
          userId={userId}
          opportunityId={opportunityId}
        />
      </div>
      {registrationFormLink ? (
        <Button 
          variant="secondary" 
          onClick={handleExternalLink}
        >
          Apply
        </Button>
      ) : (
        <Button 
          variant="secondary"
          onClick={handleInternalLink}
        >
          Apply on Visey
        </Button>
      )}
    </div>
  );
};

export default FundingCardActions;