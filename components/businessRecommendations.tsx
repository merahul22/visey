"use client";

import { useEffect, useState, useMemo } from "react";
import { getRecommendations } from "@/actions/get-recommendations";

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

const BusinessRecommendations = ({ data }: { data: any }) => {
  const [recommendedBusinesses, setRecommendedBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Memoize the data to avoid unnecessary re-renders
  const memoizedData = useMemo(() => data, [data]);

  useEffect(() => {
    const fetchRecommendedBusinesses = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch recommendations
        const res = await getRecommendations(memoizedData);

        if (res.error) {
          setError(res.error);
          return;
        }

        // Fetch details for each recommended business
        const recommendations = res.content;
        const businessDetails = await Promise.all(
          recommendations.map(async (businessId: string) => {
            try {
              const res = await fetch(
                `/api/get-business-details?businessId=${businessId}`,
              );
              const data = await res.json();
              return data.error ? null : data;
            } catch (error) {
              console.error("Failed to fetch business details:", error);
              return null;
            }
          }),
        );

        // Filter out null values and update state
        setRecommendedBusinesses(businessDetails.filter(Boolean));
      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
        setError("An error occurred while fetching recommendations.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedBusinesses();
  }, [memoizedData]);

  if (loading) {
    return <div>Loading recommendations...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Recommended Businesses</h2>
      {recommendedBusinesses.length > 0 ? (
        <ul>
          {recommendedBusinesses.map((business, index) => (
            <li key={index}>
              <h3>{business.name}</h3>
              <p>{business.description}</p>
              {/* Add more business details as needed */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No recommendations found.</p>
      )}
    </div>
  );
};

export default BusinessRecommendations;
