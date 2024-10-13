import { BusinessCard } from "@/components/cards/business-card";

export function BusinessCardList() {
  return (
    <div className="space-y-4 sm:grid sm:grid-cols-2 sm:space-y-0 sm:gap-x-4 sm:gap-y-8 xl:grid-cols-3">
      {Array.from({ length: 5 }).map((_, idx) => (
        <BusinessCard key={idx} />
      ))}
    </div>
  );
}
