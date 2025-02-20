import { FundingCard } from "@/components/cards/funding-card";
import { PencilSimple } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { Opportunity } from "@prisma/client";

export default function Opportunities({
  opportunities,
  name,
  location,
  isPublic,
}: {
  opportunities: Opportunity[];
  name: string;
  location: string;
  isPublic: boolean;
}) {
  return (
    <div className="space-y-6 pt-6 pb-4">
      <div className="flex justify-between items-center">
        <p className="font-semibold">Opportunities</p>
        {!isPublic && (
          <Button size="icon" variant="ghost" className="text-linkBlue">
            <PencilSimple size={20} />
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {(!opportunities || opportunities.length === 0) && (
          <div>
            <p className="text-sm">No opportunities added yet</p>
          </div>
        )}

        {opportunities &&
          opportunities.map((opportunity) => (
            <FundingCard
              key={opportunity.id}
              fundingOpportunity={opportunity}
            />
          ))}
      </div>
    </div>
  );
}
