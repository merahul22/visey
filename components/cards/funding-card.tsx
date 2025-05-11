import { Business, Opportunity } from "@prisma/client";
import isSavedOpportunity from "@/actions/isSavedOpportunity";
import { getBusinessById } from "@/actions/get-business-by-id";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { toast } from "sonner";
import { FundingCardClient } from "./funding-card-client";

export async function FundingCard({
  fundingOpportunity,
}: {
  fundingOpportunity: Opportunity;
}) {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    redirect(DEFAULT_LOGIN_REDIRECT);
  }

  const res = await isSavedOpportunity(
    user?.id as string,
    fundingOpportunity.id,
  );

  // Fetch business information if business ID exists
  let businessData: Business | null = null;
  if (fundingOpportunity.businessId) {
    const businessRes = await getBusinessById(fundingOpportunity.businessId);
    if (businessRes.success) {
      businessData = businessRes.business;
    }
  }

  if (res?.error) {
    toast.error("Cannot get saved opportunity info");
  }

  const isSaved = res.success as boolean;

  // Use the client component for rendering with the sheet functionality
  return (
    <FundingCardClient
      fundingOpportunity={fundingOpportunity as any} // Type cast to resolve differences between Prisma and zod schemas
      business={businessData}
      isSaved={isSaved}
      userId={user.id as string}
    />
  );
}
