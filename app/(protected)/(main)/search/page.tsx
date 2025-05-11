"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BusinessCard } from "@/components/cards/business-card";
import dynamic from 'next/dynamic';

// Import FundingCard dynamically to avoid server component issues
const DynamicFundingCard = dynamic(() => 
  import('@/components/cards/funding-card-client').then(mod => ({ default: mod.FundingCardClient })),
  { ssr: false }
);

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams?.get("query") || "";
  const { data: session } = useSession();
  const router = useRouter();
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("businesses");
  const [isLoadingBusinesses, setIsLoadingBusinesses] = useState(false);
  const [isLoadingOpportunities, setIsLoadingOpportunities] = useState(false);

  useEffect(() => {
    if (!query) return;
    
    setIsLoadingBusinesses(true);
    // Use promise-based approach instead of async/await
    fetch(`/api/search-businesses?query=${query}`)
      .then(res => res.json())
      .then(data => {
        setBusinesses(data);
      })
      .catch(error => {
        console.error("Error fetching businesses:", error);
      })
      .finally(() => {
        setIsLoadingBusinesses(false);
      });
  }, [query, session, router]);

  useEffect(() => {
    if (!query || activeTab !== "funding") return;
    
    setIsLoadingOpportunities(true);
    // Use promise-based approach instead of async/await
    fetch(`/api/search-opportunities?query=${query}`)
      .then(res => res.json())
      .then(data => {
        setOpportunities(data);
      })
      .catch(error => {
        console.error("Error fetching opportunities:", error);
      })
      .finally(() => {
        setIsLoadingOpportunities(false);
      });
  }, [query, activeTab, session, router]);

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col gap-5 sm:flex-row justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">
            Search Results for &#34;{query}&#34;
          </h1>
          <div className="flex space-x-4">
            <Button
              variant={activeTab === "businesses" ? "default" : "outline"}
              onClick={() => setActiveTab("businesses")}
            >
              Businesses
            </Button>
            <Button
              variant={activeTab === "funding" ? "default" : "outline"}
              onClick={() => setActiveTab("funding")}
            >
              Funding Opportunities
            </Button>
          </div>
        </div>

        {activeTab === "businesses" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoadingBusinesses ? (
              // Loading skeleton for businesses
              Array(6)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className="animate-pulse bg-gray-200 rounded-md h-64"
                  ></div>
                ))
            ) : businesses.length > 0 ? (
              businesses.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))
            ) : (
              <p className="col-span-full text-center py-8">
                No matching businesses found for &#34;{query}&#34;
              </p>
            )}
          </div>
        )}

        {activeTab === "funding" && (
          <div className="flex flex-col gap-4">
            {isLoadingOpportunities ? (
              // Loading skeleton for opportunities
              Array(3)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className="animate-pulse bg-gray-200 rounded-md h-32"
                  ></div>
                ))
            ) : opportunities.length > 0 ? (
              opportunities.map((opportunity) => (
                <DynamicFundingCard 
                  key={opportunity.id} 
                  fundingOpportunity={opportunity} 
                  business={opportunity.business || null}
                  isSaved={false}
                  userId={session?.user?.id || ''}
                />
              ))
            ) : (
              <p className="text-center py-8">
                No matching funding opportunities found for &#34;{query}&#34;
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
