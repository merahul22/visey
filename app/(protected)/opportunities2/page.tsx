import React from "react";
import { FundingCard } from "@/components/cards/funding-card";
import getAllOpportunities from "@/actions/get-all-opportunities";

const OpportunitiesPage = async () => {
  const opportunities = (await getAllOpportunities()) || [];

  return (
    <main className="container mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-center">Funding Opportunities</h1>
        <p className="text-center text-gray-600">
          Explore the latest funding opportunities tailored for your needs.
        </p>
      </header>

      {opportunities.length > 0 ? (
        <section className="space-y-8">
          {opportunities.map((opportunity) => (
            <div key={opportunity.id} className="flex justify-center">
              <FundingCard key={opportunity.id} fundingOpportunity={opportunity} />
            </div>
          ))}
        </section>
      ) : (
        <section className="text-center py-10">
          <p className="text-lg text-gray-500">No funding opportunities available at the moment.</p>
        </section>
      )}
    </main>
  );
};

export default OpportunitiesPage;