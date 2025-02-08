"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { BusinessCard } from "@/components/cards/business-card";
import { Separator } from "@/components/ui/separator";
import { FundingCard } from "@/components/cards/funding-card";
import { useEffect, useState } from "react";

interface Opportunity {
  id: string;
  title: string;
  endDatetime: string;
  businessName: string;
  avatarUrl: string;
  location: string;
  promoted: boolean;
}

const fetchFundingOpportunities = async (): Promise<Opportunity[]> => {
  const response = await fetch('/api/get-opportunities');
  const data = await response.json();
  return data;
};

const Page = () => {
  const [fundingOpportunities, setFundingOpportunities] = useState<Opportunity[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchFundingOpportunities();
      setFundingOpportunities(data);
    };
    fetchData();
  }, []);

  return (
    <div className="mb-20">
      <h1 className="text-xl font-semibold">Saved</h1>
      <Tabs defaultValue="business" className="mt-2">
        <div className="overflow-scroll">
          <TabsList>
            <TabsTrigger value={"business"}>Business</TabsTrigger>
            <TabsTrigger value={"opportunities"}>
              Funding Opportunities
            </TabsTrigger>
          </TabsList>
        </div>
        <Separator className="mt-4 mb-4" />
        <TabsContent value={"business"}>
          <div className="space-y-4 sm:grid sm:grid-cols-2 sm:space-y-0 sm:gap-x-4 sm:gap-y-8 xl:grid-cols-3">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx}>Business</div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value={"opportunities"}>
          <div className="flex flex-col gap-4">
            {fundingOpportunities.map((opportunity) => (
              <FundingCard
                key={opportunity.id}
                id={opportunity.id}
                promoted={opportunity.promoted}
                title={opportunity.title}
                businessName={opportunity.businessName}
                avatarUrl={opportunity.avatarUrl}
                applyBy={new Date(opportunity.endDatetime)}
                location={opportunity.location}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
