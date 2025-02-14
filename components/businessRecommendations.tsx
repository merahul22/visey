"use client";

import { useEffect, useState } from "react";
import { getRecommendations } from "@/actions/get-recommendations";

const Recommendations = () => {
  const [recommendedBusinesses, setRecommendedBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendedBusinesses = async () => {
      try {
        const res = await getRecommendations(startupDetails);

        if (res.error) {
          setError(res.error);
        }

        const recommendations = res.content;

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
        console.log(error);
      }
    };

    fetchRecommendedBusinesses();
  });

  return <div>Recommendations</div>;
};

export default Recommendations;
