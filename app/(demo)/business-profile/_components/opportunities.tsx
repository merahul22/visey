import { FundingCard } from "@/components/cards/funding-card";
import { PencilSimple } from "@phosphor-icons/react/dist/ssr";

export default function Opportunities() {
  return (
    <div className="space-y-6 pt-6 pb-4">
      <div className="flex justify-between items-center">
        <p className="font-semibold">Opportunities</p>
        <PencilSimple size={20} />
      </div>

      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
        {Array.from({ length: 3 }).map((_, idx) => (
          <FundingCard
            key={idx}
            promoted
            title="New Studies in Business Media"
            businessName="Business Name"
            avatarUrl="https://picsum.photos/100"
            applyBy="December 25, 2024"
            location="Delhi, India"
          />
        ))}
      </div>
    </div>
  );
}
