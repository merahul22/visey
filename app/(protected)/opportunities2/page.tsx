import React from "react";
import getAllOpportunities from "@/actions/get-all-opportunities";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import OpportunitiesSortFilter from "@/components/OpportunitiesSortFilter";
import isSavedOpportunity from "@/actions/isSavedOpportunity";
import { getBusinessById } from "@/actions/get-business-by-id";

const OpportunitiesPage = async () => {
  const session = await auth();
  const user = session?.user;
  
  if (!user) {
    redirect(DEFAULT_LOGIN_REDIRECT);
  }

  const opportunities = (await getAllOpportunities()) || [];

  // Pre-fetch saved opportunities data and business data for each opportunity
  const opportunitiesWithData = await Promise.all(
    opportunities.map(async (opportunity) => {
      // Check if opportunity is saved
      const savedRes = await isSavedOpportunity(
        user?.id as string,
        opportunity.id,
      );
      const isSaved = savedRes?.success as boolean;

      // Fetch business information if business ID exists
      let businessData = null;
      if (opportunity.businessId) {
        const businessRes = await getBusinessById(opportunity.businessId);
        if (businessRes.success) {
          businessData = businessRes.business;
        }
      }

      return {
        ...opportunity,
        isSaved,
        business: businessData,
      };
    })
  );

  return (
    <main className="container mx-auto px-4 py-8">
      <OpportunitiesSortFilter opportunities={opportunitiesWithData} userId={user.id as string} />
    </main>
  );
};

export default OpportunitiesPage;