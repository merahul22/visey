"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import getAllOpportunities from "@/actions/get-all-opportunities";
import { FundingCard } from "@/components/cards/funding-card";

const FundingRecommendations = ({ opportunities }: { opportunities: any }) => {
  const [recommendedOpportunities, setRecommendedOpportunities] = useState<
    any[] | undefined
  >(opportunities);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="space-y-4">
      <h2 className="">Recommended Opportunities</h2>
      <ul className="flex flex-col gap-4 items-center md:items-start">
        {!recommendedOpportunities ? (
          Array(4)
            .fill(null)
            .map((_, index) => (
              <li
                key={index}
                className="h-[310px] bg-gray-300 rounded-lg animate-pulse"
              ></li>
            ))
        ) : recommendedOpportunities ? (
          (showAll
            ? recommendedOpportunities
            : recommendedOpportunities?.slice(0, 4)
          ).map((opportunity, index) => (
            <li key={index} className="w-full">
              <FundingCard fundingOpportunity={opportunity} />
            </li>
          ))
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <p>No funding opportunities available.</p>
        )}
      </ul>

      {/* Show "View All" button only if more than 3 recommendations exist */}
      {recommendedOpportunities && recommendedOpportunities.length > 4 && (
        <span className="block text-center mt-4">
          <Button
            variant="link"
            className=""
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "View All"}
          </Button>
        </span>
      )}
    </div>
  );
};

export default FundingRecommendations;
