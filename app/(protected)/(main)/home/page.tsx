"use client";

import { Button } from "@/components/ui/button";
import { CategoryCardBig } from './_components/category-card-big';
import { CategoryCardSmall } from './_components/category-card-small';
import { FundingCard } from '@/components/cards/funding-card';
import BusinessCardList from './_components/business';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { getRecommendations } from '@/actions/get-recommendations';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const trlLevelMapping: Record<string, number> = {
  "TRL 1: Basic Research": 1,
  "TRL 2: Applied Research": 2,
  "TRL 3: Critical Function or Proof of Concept Established": 3,
  "TRL 4: Lab Testing/Validation of Alpha Prototype Component/Process": 4,
  "TRL 5: Laboratory Testing of Integrated/Semi-Integrated System": 5,
  "TRL 6: Prototype System Verified": 6,
  "TRL 7: Integrated Pilot System Demonstrated": 7,
  "TRL 8: System Incorporated in Commercial Design": 8,
  "TRL 9: System Proven and Ready for Full Commercial Deployment": 9,
};

const HomePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [recommendedBusinesses, setRecommendedBusinesses] = useState<any[]>([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState<any[]>([]);
  const [fetched, setFetched] = useState(false);
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [opportunitiesError, setOpportunitiesError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
    // async function fetchData() {
      if (!session) {
        console.log("No session found, redirecting to login");
        router.push('/login');
        return;
      }

      const user = session.user;
      // console.log("User details received:", user);

      if (!user?.type) {
        // console.log("User type not found, redirecting to account type selection");
        router.push('/account-type');
        return;
      }

      if (!user.id) {
        console.log("User ID is undefined");
        return;
      }

      //console.log("Fetching recommendations for user:", user);
      const trlLevelString = user.startup?.trlLevel || "TRL 1: Basic Research";
      const trlLevel = isNaN(Number(trlLevelString))
        ? trlLevelMapping[trlLevelString] || 1
        : Number(trlLevelString);

      const startupDetails = {
        id: user.id!,
        name: user.startup?.name || "Unknown",
        location: user.startup?.location || "Unknown",
        industry: user.startup?.industry || "Unknown",
        sector: user.startup?.sector || "Unknown",
        trllevel: trlLevel,
      };

      try {
        const response = await getRecommendations(startupDetails);
        if (response.error) throw new Error(response.error);

        const recommendations = response.content;
        if (!Array.isArray(recommendations)) throw new Error("Invalid data");

        const businessDetails = await Promise.all(
          recommendations.map(async (businessId: string) => {
            const res = await fetch(
              `/api/get-business-details?businessId=${businessId}`,
            );
            const data = await res.json();
            return data.error ? null : data;
          }),
        );

        setRecommendedBusinesses(businessDetails.filter(Boolean));
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    if (!recommendedBusinesses.length) {
      fetchData();
    }
  }, [session, router, recommendedBusinesses.length]);

  const filteredBusinessesMemo = useMemo(() => {
    if (!selectedCategories.length) return recommendedBusinesses;
    return recommendedBusinesses.filter((business) =>
      selectedCategories.every((category) =>
        business.categoryTags.includes(category),
      ),
    );
  }, [selectedCategories, recommendedBusinesses]);

  const handleCategoryClick = useCallback((category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  }, []);

  const date = new Date(Date.now());

  const categories = [
    { name: "Marketing Tools", imageUrl: "/img/Category Images/Icon 1.png" },
    { name: "App Development", imageUrl: "/img/Category Images/Icon 2.png" },
    { name: "Prototype Builders", imageUrl: "/img/Category Images/Icon 3.png" },
    { name: "Legal & Compliance Support", imageUrl: "/img/Category Images/Icon 4.png" },
    { name: "Crowdfunding Platforms", imageUrl: "/img/Category Images/Icon 5.png" }
  ];

  const bigCategories = [
    { name: "", imageUrl: "/img/Category Images/Category 1- Visey.png" },
    { name: "", imageUrl: "/img/Category Images/Category 2- Visey.png" },
    { name: "", imageUrl: "/img/Category Images/Category 3- Visey.png" },
    { name: "", imageUrl: "/img/Category Images/Category 4- Visey.png" },
  ];

  return (
    <div className="space-y-10 mb-20">
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-semibold">Search For</h2>
        <div className="hidden overflow-x-auto md:flex gap-x-4">
          {bigCategories.map((category, idx) => (
            <CategoryCardBig key={idx} category={category.name} imageUrl={category.imageUrl} />
          ))}
        </div>

        <div className="overflow-x-auto flex gap-x-4">
          {categories.map((category, idx) => (
            <CategoryCardSmall
              key={idx}
              category={category.name}
              imageUrl={category.imageUrl}
              onClick={() => handleCategoryClick(category.name)}
              selected={selectedCategories.includes(category.name)}
            />
          ))}
        </div>
      </section>
      <section className="space-y-4">
        <span className="space-y-3">
          <h2 className="text-xl md:text-2xl font-semibold">Recommended</h2>
          <p>Selected Categories:</p>
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((category, idx) => (
              <span key={idx} className="py-0.5 px-2.5 rounded-full border bg-gray-200">
                {category}
              </span>
            ))}
          </div>
        </span>
        <BusinessCardList businesses={filteredBusinessesMemo} />
        <span className="block text-center">
          <Button variant="link" className="">
            View all
          </Button>
        </span>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-semibold">
          Funding Opportunities
        </h2>
        {opportunitiesError ? (
          <p className="text-red-500">{opportunitiesError}</p>
        ) : (
          <div className="flex flex-col gap-4">
            {opportunities.map((opportunity, idx) => (
              <FundingCard
                key={idx}
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
        )}
        <span className="block text-center">
          <Button variant="link" className="">
            View all
          </Button>
        </span>
      </section>
    </div>
  );
};

export default HomePage;