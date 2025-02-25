import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MapPin } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import React from "react";
import { Opportunity } from "@prisma/client";
import Link from "next/link";
import SaveOpportunityButton from "@/components/SaveOpportunityButton";
import isSavedOpportunity from "@/actions/isSavedOpportunity";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { toast } from "sonner";

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

  return (
    <div className="flex lg:justify-start flex-col gap-4 lg:flex-row lg:items-center lg:gap-10">
      <div className="border-2 rounded-xl px-4 py-4 space-y-2 lg:min-w-[700px]">
        <div className="space-y-2 lg:flex gap-6">
          <div className="w-[220px] h-[135px] flex items-center justify-center">
            <Image
              src="/img/funding-opportunity-placeholder.png"
              width={300}
              height={135}
              className="rounded-lg mt-4 flex items-center justify-center"
              alt="Funding Opportunity Image"
            />
          </div>
          <div className="space-y-2">
            <div className="flex gap-1">
              <h1 className="text-lg max-w-[300px]">
                {fundingOpportunity.title}
              </h1>
              {/*{promoted && (*/}
              {/*  <div className="max-w-[100px]">*/}
              {/*    <Button*/}
              {/*      size="sm"*/}
              {/*      className="bg-base-secondary text-base-black font-normal shadow-none border-2 px-4 py-0 hover:bg-base-secondary"*/}
              {/*    >*/}
              {/*      <p>Promoted</p>*/}
              {/*    </Button>*/}
              {/*  </div>*/}
              {/*)}*/}
            </div>
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage
                  src={`${fundingOpportunity.imageUrl || "No image"}`}
                />
                <AvatarFallback>
                  <div>
                    <p>{"B"}</p>
                  </div>
                </AvatarFallback>
              </Avatar>
              <p>{fundingOpportunity.businessId || "Own this opportunity ?"}</p>
            </div>
            <div>
              <p>Apply By: {formattedDate}</p>
            </div>
            <div className="flex gap-2 items-center">
              <MapPin />
              <p>{fundingOpportunity.businessId || "No Location Found"}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center justify-end">
          <SaveOpportunityButton
            isSaved={isSaved}
            userId={user.id as string}
            opportunityId={fundingOpportunity.id}
          />
          <Link href={`/apply-opportunity/${fundingOpportunity.id}`}>
            <Button variant="secondary">Apply</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
