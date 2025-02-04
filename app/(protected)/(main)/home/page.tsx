"use client";

import { Button } from '@/components/ui/button';
import { CategoryCardBig } from './_components/category-card-big';
import { CategoryCardSmall } from './_components/category-card-small';
import { FundingCard } from '@/components/cards/funding-card';
import BusinessCardList from './_components/business';
import React, { useEffect, useState } from 'react';
import { getRecommendations } from '@/actions/get-recommendations';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const trlLevelMapping: { [key: string]: number } = {
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

  useEffect(() => {
    async function fetchData() {
      if (!session) {
        console.log("No session found, redirecting to login");
        router.push('/login');
        return;
      }

      const user = session.user;
      console.log("User details received:", user);

      if (!user?.type) {
        console.log("User type not found, redirecting to account type selection");
        router.push('/account-type');
        return;
      }

      if (!user.id) {
        console.error("User ID is undefined");
        return;
      }

      console.log("Fetching recommendations for user:", user);
      const trlLevelString = user.startup?.trlLevel || "TRL 1: Basic Research";
      const trllevel = trlLevelMapping[trlLevelString];
      if (!trllevel) {
        console.error("Invalid trlLevel:", trlLevelString);
        return;
      }

      const startupDetails = {
        id: user.id,
        name: user.name,
        location: user.startup?.location || 'Unknown',
        industry: user.startup?.industry || 'Unknown',
        sector: user.startup?.sector || 'Unknown',
        trllevel,
      };

      console.log("Startup details used for validation and API call:", startupDetails);

      const response = await getRecommendations(startupDetails);

      if (response.error) {
        console.error("Failed to fetch recommendations:", response.error);
        return;
      }

      console.log("API response:", response);

      const recommendations = response.content;
      if (!Array.isArray(recommendations)) {
        console.error("Recommendations is not an array:", recommendations);
        return;
      }

      console.log("Business IDs to fetch details for:", recommendations);

      const businessDetails = await Promise.all(
        recommendations.map(async (businessId: string) => {
          console.log(`Fetching details for businessId: ${businessId}`);
          const res = await fetch(`/api/get-business-details?businessId=${businessId}`);
          const data = await res.json();
          if (data.error) {
            console.log(`Business not found for businessId: ${businessId}`);
            return null;
          }
          console.log(`Business details fetched for businessId: ${businessId}`, data);
          return data;
        })
      );

      console.log("Business details fetched:", businessDetails.filter(Boolean));

      setRecommendedBusinesses(businessDetails.filter(Boolean));
      setFetched(true);
    }

    if (!fetched) {
      fetchData();
    }
  }, [session, router, fetched]);

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredBusinesses(recommendedBusinesses);
    } else {
      const filtered = recommendedBusinesses.filter(business =>
        selectedCategories.every(category =>
          business.categoryTags.includes(category)
        )
      );
      setFilteredBusinesses(filtered);
    }
  }, [selectedCategories, recommendedBusinesses]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategories(prevSelectedCategories =>
      prevSelectedCategories.includes(category)
        ? prevSelectedCategories.filter(c => c !== category)
        : [...prevSelectedCategories, category]
    );
  };

  const date = new Date(Date.now());

  const categories = [
    { name: "Incubation", imageUrl: "https://alcorfund.com/wp-content/uploads/2020/08/Startup-Incubator.png" },
    { name: "Acceleration Programs", imageUrl: "https://example.com/acceleration.jpg" },
    { name: "Startup Guidance", imageUrl: "https://example.com/guidance.jpg" },
    { name: "MVP Creation", imageUrl: "https://example.com/mvp.jpg" },
    { name: "Website Creation", imageUrl: "https://example.com/website.jpg" },
    { name: "Marketing Support", imageUrl: "https://example.com/marketing.jpg" },
    { name: "Branding", imageUrl: "https://example.com/branding.jpg" },
    { name: "Social Media Handling", imageUrl: "https://example.com/socialmedia.jpg" },
    { name: "Pitch deck expert", imageUrl: "https://example.com/pitchdeck.jpg" },
    { name: "Pitch Deck Creation", imageUrl: "https://example.com/pitchdeckcreation.jpg" },
    { name: "Prototype making (Digital)", imageUrl: "https://example.com/prototype-digital.jpg" },
    { name: "Prototype making (Hardware)", imageUrl: "https://example.com/prototype-hardware.jpg" }
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
        <BusinessCardList businesses={filteredBusinesses} />
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
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((item, idx) => (
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
          <Button variant="link" className="">
            View all
          </Button>
        </span>
      </section>
    </div>
  );
};

export default HomePage;