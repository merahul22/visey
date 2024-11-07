import { FundingCard } from '@/components/cards/funding-card';
import { PencilSimple } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/button';
import { auth } from '@/auth';

export default async function Opportunities() {
  const session = await auth();
  const user = session?.user;

  const business = user?.business;

  return (
    <div className="space-y-6 pt-6 pb-4">
      <div className="flex justify-between items-center">
        <p className="font-semibold">Opportunities</p>
        <Button size="icon" variant="ghost" className="text-linkBlue">
          <PencilSimple size={20} />
        </Button>
      </div>

      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
        {business?.opportunities.length === 0 && (
          <div>
            <p className="text-sm">No opportunities added yet</p>
          </div>
        )}

        {business?.opportunities?.map((opportunity, idx) => (
          <FundingCard
            key={idx}
            title={opportunity.title}
            promoted={false}
            businessName={business.name}
            avatarUrl={opportunity.imageUrl as string}
            applyBy={opportunity.endDatetime}
            location={business.location}
          />
        ))}
      </div>
    </div>
  );
}
