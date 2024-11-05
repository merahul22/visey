import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { HeartStraight, MapPin } from "@phosphor-icons/react/dist/ssr";

interface FundingCardProps {
  title: string;
  promoted: boolean;
  businessName: string;
  avatarUrl?: string;
  applyBy: string;
  location: string;
}

export function FundingCard({
  title,
  promoted,
  businessName,
  avatarUrl,
  applyBy,
  location,
}: FundingCardProps) {
  return (
    <div className="rounded-xl border p-4 space-y-4">
      <div className="h-40 bg-neutral-400"></div>
      <div className="flex flex-col gap-y-2">
        <div className="flex gap-x-6 justify-between items-start">
          <h3>{title}</h3>
          {promoted && (
            <p className="text-sm px-4 py-0.5 bg-secondary-200 rounded-full">
              Promoted
            </p>
          )}
        </div>
        <div className="flex gap-x-2 items-center">
          <Avatar className="w-8 h-8 rounded-full overflow-hidden">
            <AvatarImage src={avatarUrl ?? "https://picsum.photos/100"} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="text-sm">{businessName}</p>
        </div>
        <p className="flex gap-x-2 text-sm">
          <span>Apply By: </span>
          <span>{applyBy}</span>
        </p>
        <div className="flex gap-x-1 items-center">
          <MapPin />
          <span>{location}</span>
        </div>
        <div className="flex gap-x-3 items-center ml-auto">
          <HeartStraight className="pointer" size={30} />
          <Button variant={"secondary"}>Apply</Button>
        </div>
      </div>
    </div>
  );
}
