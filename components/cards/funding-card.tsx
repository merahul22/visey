import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { HeartStraight, MapPin } from "@phosphor-icons/react/dist/ssr";

export function FundingCard() {
  return (
    <div className="rounded-xl border p-4 space-y-4">
      <div className="h-40 bg-neutral-400"></div>
      <div className="flex flex-col gap-y-2">
        <div className="flex gap-x-6 justify-between items-start">
          <h3>New Studies in buissness media</h3>
          <p className="text-sm px-4 py-0.5 bg-secondary-200 rounded-full">
            Promoted
          </p>
        </div>
        <div className="flex gap-x-2 items-center">
          <Avatar className="w-8 h-8 rounded-full overflow-hidden">
            <AvatarImage src="https://picsum.photos/100" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="text-sm">Buissness name</p>
        </div>
        <p className="flex gap-x-2">
          <span>Apply By: </span>
          <span>December 25, 2024</span>
        </p>
        <div className="flex gap-x-1 items-center">
          <MapPin />
          <span>Delhi, India</span>
        </div>
        <div className="flex gap-x-3 items-center ml-auto">
          <HeartStraight className="pointer" size={30} />
          <Button variant={"secondary"}>Apply</Button>
        </div>
      </div>
    </div>
  );
}
