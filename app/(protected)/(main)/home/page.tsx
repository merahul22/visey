"use client";

import { Button } from "@/components/ui/button";
import { CategoryCardBig } from "./_components/category-card-big";
import { CategoryCardSmall } from "./_components/category-card-small";
import { FundingCard } from "@/components/cards/funding-card";
import BusinessCardList from "./_components/business";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { getRecommendations } from "@/actions/get-recommendations";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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

  useEffect(() => {
    const fetchData = async () => {
      if (!session) {
        console.log("No session found, redirecting to login");
        router.push("/login");
        return;
      }

      const user = session.user;
      if (!user?.type) {
        router.push("/account-type");
        return;
      }

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

  const filteredBusinesses = useMemo(() => {
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
    {
      name: "Incubation",
      imageUrl:
        "https://alcorfund.com/wp-content/uploads/2020/08/Startup-Incubator.png",
    },
    {
      name: "Acceleration Programs",
      imageUrl: "https://example.com/acceleration.jpg",
    },
    { name: "Startup Guidance", imageUrl: "https://example.com/guidance.jpg" },
    { name: "MVP Creation", imageUrl: "https://example.com/mvp.jpg" },
    { name: "Website Creation", imageUrl: "https://example.com/website.jpg" },
    {
      name: "Marketing Support",
      imageUrl: "https://example.com/marketing.jpg",
    },
    { name: "Branding", imageUrl: "https://example.com/branding.jpg" },
    {
      name: "Social Media Handling",
      imageUrl: "https://example.com/socialmedia.jpg",
    },
    {
      name: "Pitch deck expert",
      imageUrl: "https://example.com/pitchdeck.jpg",
    },
    {
      name: "Pitch Deck Creation",
      imageUrl: "https://example.com/pitchdeckcreation.jpg",
    },
    {
      name: "Prototype making (Digital)",
      imageUrl: "https://example.com/prototype-digital.jpg",
    },
    {
      name: "Prototype making (Hardware)",
      imageUrl: "https://example.com/prototype-hardware.jpg",
    },
  ];

  return (
    <div className="space-y-10 mb-20">
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-semibold">Search For</h2>
        <div className="hidden overflow-x-auto md:flex gap-x-4">
          {Array.from({ length: 5 }).map((_, idx) => (
            <CategoryCardBig key={idx} />
          ))}
        </div>

        <div className="overflow-x-auto flex gap-x-4">
          {categories.map(({ name, imageUrl }, idx) => (
            <CategoryCardSmall
              key={idx}
              category={name}
              imageUrl={imageUrl}
              onClick={() => handleCategoryClick(name)}
              selected={selectedCategories.includes(name)}
            />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-semibold">Recommended</h2>
        <div className="flex flex-wrap gap-2">
          {selectedCategories.map((category, idx) => (
            <span
              key={idx}
              className="py-0.5 px-2.5 rounded-full border bg-gray-200"
            >
              {category}
            </span>
          ))}
        </div>
        <BusinessCardList businesses={filteredBusinesses} />
        <span className="block text-center">
          <Button variant="link">View all</Button>
        </span>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-semibold">
          Funding Opportunities
        </h2>
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <FundingCard
              key={idx}
              promoted
              title="New Studies in Business Media"
              businessName="Business Name"
              avatarUrl="https://picsum.photos/100"
              applyBy={date}
              location="Delhi, India"
            />
          ))}
        </div>
        <span className="block text-center">
          <Button variant="link">View all</Button>
        </span>
      </section>
    </div>
  );
};

export default HomePage;
