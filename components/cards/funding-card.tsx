import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Business, Opportunity } from "@prisma/client";
import isSavedOpportunity from "@/actions/isSavedOpportunity";
import { getBusinessById } from "@/actions/get-business-by-id";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { toast } from "sonner";
import FundingCardActions from "./funding-card-actions";

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

  const date = new Date(
    (fundingOpportunity.endDatetime || new Date(Date.now())) as Date,
  );

  const formattedDate = `${date.getDate()} ${date.toLocaleString("default", {
    month: "long",
  })}, ${date.getFullYear()}`;

  // Use bannerUrl as the primary image for the card display, fallback to imageUrl or default
  const cardImage = fundingOpportunity.bannerUrl || fundingOpportunity.imageUrl || "/img/funding-opportunity-placeholder.png";
  
  // Use imageUrl for the avatar/icon, fallback to businessData image or default
  const avatarImage = businessData?.image || fundingOpportunity.imageUrl || "";

  return (
    <div className="flex lg:justify-start flex-col gap-4 lg:flex-row lg:items-center lg:gap-10">
      <div className="w-full">
        <div className="border-2 rounded-xl px-4 py-4 space-y-2 lg:min-w-[700px] hover:shadow-md transition-shadow">
          {/* Card Content Area - This div is clickable but NOT a Link */}
          <div className="block cursor-pointer">
            <div className="space-y-2 lg:flex gap-6">
              <div className="w-[220px] h-[135px] flex items-center justify-center relative">
                <Image
                  src={cardImage}
                  alt="Funding Opportunity Banner"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <div className="flex gap-1">
                  <h1 className="text-lg max-w-[300px]">
                    {fundingOpportunity.title}
                  </h1>
                </div>
                <div className="flex gap-2 items-center">
                  <Avatar>
                    <AvatarImage src={avatarImage} />
                    <AvatarFallback>
                      <div>
                        <p>{"B"}</p>
                      </div>
                    </AvatarFallback>
                  </Avatar>
                  <p>{businessData?.name || "Own this opportunity ?"}</p>
                </div>
                <div>
                  <p>Apply By: {formattedDate}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <MapPin />
                  <p>{businessData?.location || "No Location Found"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-2 flex items-center justify-between">
          {/* Navigation Link - Separate navigation element */}
          <Link 
            href={`/opportunity/${fundingOpportunity.id}`} 
            className="text-blue-600 hover:underline"
          >
            View Details
          </Link>
          
          {/* Action Buttons */}
          <FundingCardActions
            isSaved={isSaved}
            userId={user.id as string}
            opportunityId={fundingOpportunity.id}
            registrationFormLink={fundingOpportunity.registrationFormLink}
          />
        </div>
      </div>
    </div>
  );
}
