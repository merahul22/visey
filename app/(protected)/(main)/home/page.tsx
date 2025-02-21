import { Button } from "@/components/ui/button";
import { CategoryCardBig } from "./_components/category-card-big";
import { CategoryCardSmall } from "./_components/category-card-small";
import React from "react";
import BusinessRecommendations from "@/components/businessRecommendations";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import FundingRecommendations from "@/components/fundingRecommendations";
import getAllOpportunities from "@/actions/get-all-opportunities";

const categories = [
  { name: "Marketing Tools", imageUrl: "/img/Category Images/Icon 1.png" },
  { name: "App Development", imageUrl: "/img/Category Images/Icon 2.png" },
  { name: "Prototype Builders", imageUrl: "/img/Category Images/Icon 3.png" },
  {
    name: "Legal & Compliance Support",
    imageUrl: "/img/Category Images/Icon 4.png",
  },
  {
    name: "Crowdfunding Platforms",
    imageUrl: "/img/Category Images/Icon 5.png",
  },
];

const bigCategories = [
  { name: "", imageUrl: "/img/Category Images/Category 1- Visey.png" },
  { name: "", imageUrl: "/img/Category Images/Category 2- Visey.png" },
  { name: "", imageUrl: "/img/Category Images/Category 3- Visey.png" },
  { name: "", imageUrl: "/img/Category Images/Category 4- Visey.png" },
];

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

const HomePage = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user || !session) {
    redirect("/login");
  }

  if (!user.type) {
    redirect("/account-type");
  }

  const businessRecommendations =
    user.type === "STARTUP"
      ? {
          id: user.startup?.id,
          name: user.startup?.name,
          location: user.startup?.location,
          industry: user.startup?.industry,
          sector: user.startup?.sector,
          trllevel: isNaN(Number(user.startup?.trlLevel))
            ? trlLevelMapping[user.startup?.trlLevel || 0]
            : Number(user?.startup?.trlLevel),
        }
      : {
          id: user.business?.id,
          name: user.business?.name,
          location: user.business?.location,
          industry: user.business?.category,
          trllevel: 0,
          sector: "",
        };

  const opportunities = await getAllOpportunities();

  return (
    <div className="space-y-10 mb-20">
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-semibold">Search For</h2>
        <div className="hidden overflow-x-auto md:flex gap-x-4">
          {bigCategories.map((category, idx) => (
            <CategoryCardBig
              key={idx}
              category={category.name}
              imageUrl={category.imageUrl}
            />
          ))}
        </div>

        <div className="overflow-x-auto flex gap-x-4">
          {categories.map((category, idx) => (
            <CategoryCardSmall
              key={idx}
              category={category.name}
              imageUrl={category.imageUrl}
            />
          ))}
        </div>
      </section>
      <section className="space-y-4">
        <span className="space-y-3">
          <h2 className="text-xl md:text-2xl font-semibold">Recommended</h2>
          <p>Selected Categories:</p>
          <div className="flex flex-wrap gap-2">
            {/*{selectedCategories.map((category, idx) => (*/}
            {/*  <span*/}
            {/*    key={idx}*/}
            {/*    className="py-0.5 px-2.5 rounded-full border bg-gray-200"*/}
            {/*  >*/}
            {/*    {category}*/}
            {/*  </span>*/}
            {/*))}*/}
          </div>
        </span>
        <BusinessRecommendations data={businessRecommendations} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-semibold">
          Funding Opportunities
        </h2>
        <FundingRecommendations opportunities={opportunities} />
      </section>
    </div>
  );
};

export default HomePage;
