import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  ClockCountdown,
  ArrowDown,
  DotsThreeVertical,
  ThumbsUp,
  ThumbsDown,
} from "@phosphor-icons/react/dist/ssr";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

// import { CaretRight, PencilSimple } from "@phosphor-icons/react/dist/ssr";

export default function RatingReview() {
  return (
    <div className="space-y-6 pt-6 pb-4">
      <p className="font-semibold">Rating and Review</p>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex gap-x-4 items-center">
            <p className="font-semibold text-sm">4.1</p>
            <div className="flex justify-center gap-x-1">
              {Array.from({ length: 5 }).map((_, idx) => (
                <span key={idx}>⭐</span>
              ))}
            </div>
            <p className="text-sm">439 ratings</p>
          </div>
          <Button size="md" variant="secondary">
            Write a Review
          </Button>
        </div>

        <div className="flex gap-3 flex-wrap">
          <Button
            size="sm"
            variant="outline"
            className="py-3 gap-x-2 items-center"
          >
            <span>Top-Voted</span>
            <ArrowUpRight size={16} />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="py-3 gap-x-2 items-center"
          >
            <span>Most-Recent</span>
            <ClockCountdown size={16} />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="py-3 gap-x-2 items-center"
          >
            <span>Lowest-Rated</span>
            <ArrowDown size={16} />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4 ">
        <Avatar className="size-10 rounded-full">
          <AvatarImage src="https://picsum.photos/100" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <div className="flex justify-between">
            <h3 className="flex gap-x-2">
              <span>Person Name</span>
              <Image src="/img/badge.png" height={24} width={24} alt="badge" />
            </h3>
            <DotsThreeVertical size={20} />
          </div>

          <div className="space-y-3">
            <div className="flex gap-x-4 items-center">
              <p className="font-semibold text-sm">4.1</p>
              <div className="flex justify-center gap-x-1">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <span key={idx}>⭐</span>
                ))}
              </div>
              <p className="text-sm">439 ratings</p>
            </div>
            <p>The product is awesome, so awesome, I just love it!!!</p>
            <div className="flex gap-x-6">
              <div className="flex items-center gap-x-0.5">
                <Button size="icon" variant="ghost">
                  <ThumbsUp size={16} />
                </Button>

                <span className="text-sm">23</span>
              </div>

              <div className="flex items-center gap-x-0.5">
                <Button size="icon" variant="ghost">
                  <ThumbsDown size={16} />
                </Button>

                <span className="text-sm">3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
