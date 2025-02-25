import { FundingCard } from "@/components/cards/funding-card";

const FundingRecommendations = async ({
  opportunities,
}: {
  opportunities: any;
}) => {
  return (
    <div className="space-y-4">
      <h2 className="">Recommended Opportunities</h2>
      <ul className="flex flex-col gap-4 items-center md:items-start">
        {opportunities.slice(0, 4).map((opportunity: any, index: number) => (
          <li key={index} className="w-full">
            <FundingCard fundingOpportunity={opportunity} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FundingRecommendations;
