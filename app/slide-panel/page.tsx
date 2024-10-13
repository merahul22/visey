import { Separator } from "@/components/ui/separator";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  MapPin,
  PhoneCall,
  HeartStraight,
  ShareFat,
  Eye,
  ClockCountdown,
  Info,
} from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SlidePanel() {
  return (
    <section className="max-w-screen-md mx-auto rounded-lg overflow-hidden">
      <div className="h-44 bg-neutral-400"></div>
      <div className="p-4 space-y-2">
        <div className="flex gap-x-6 justify-between items-start">
          <h2 className="font-semibold text-xl md:text-2xl">Opportunity name</h2>
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
        <div className="py-4 space-y-3">
          <p className="flex gap-x-2">
            <span>Apply By: </span>
            <span>December 25, 2024</span>
          </p>
          <div className="flex gap-x-1 items-center">
            <MapPin />
            <span>Delhi, India</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-3">
          <button className="text-sm border rounded-full px-6 py-2">
            Tag 1
          </button>
          <button className="text-sm border rounded-full px-6 py-2">
            Tag 2
          </button>
          <button className="text-sm border rounded-full px-6 py-2">
            Tag 3
          </button>
        </div>
        <Separator />
        <div className="py-3 sm:flex justify-between items-center">
          <div className="flex items-center justify-between  sm:justify-normal sm:gap-x-4">
            <button className="shrink-0 border flex items-center gap-x-2 text-sm sm:text-base border-neutral-200 rounded-full px-6 py-2">
              <PhoneCall size={20} />
              <span>Show contact Details</span>
            </button>

            <button className="rounded-full p-2 hover:bg-neutral-100">
              <HeartStraight size={24} />
            </button>

            <button className="rounded-full p-2 hover:bg-neutral-100">
              <ShareFat size={24} />
            </button>
          </div>
          <div className="flex justify-center pt-2 sm:pt-0">
            <Button size="lg" className="rounded-full font-semibold">
              Apply
            </Button>
          </div>
        </div>
        <Separator />

        <div className="sm:flex sm:space-y-0 space-y-4 gap-12 py-3 ">
          <div className="flex items-center gap-x-4">
            <div className="inline-block p-2 rounded-full border">
              <ClockCountdown size={24} />
            </div>
            <span className="flex flex-col ">
              <span className="font-semibold">Time until Deadline</span>
              <span>21 Days left</span>
            </span>
          </div>
          <div className="flex items-center gap-x-4">
            <div className="inline-block p-2 rounded-full border">
              <Eye size={24} />
            </div>
            <span className="flex flex-col ">
              <span className="font-semibold">Number of Views</span>
              <span>10,768</span>
            </span>
          </div>
        </div>

        <Separator />

        <div className="space-y-4 py-3">
          <div>
            <h1 className="font-semibold text-xl md:text-2xl">Description</h1>
            <p>
              This opportunity is an excellent one for the women entrepreneurs
              in India.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Opportunity type</h2>
            <p>Funding</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Opportunity Sub-type</h2>
            <p>Grant</p>
          </div>
        </div>

        <Separator />

        <div className="space-y-4 py-3">
          <h1 className="text-xl md:text-2xl font-semibold">Eligibility Criteria</h1>
          <div className="space-y-4 sm:flex sm:space-y-0 justify-between items-start gap-x-10">
            <button className="shrink-0 border border-neutral-200 rounded-full font-semibold bg-neutrals-100 text-neutrals-900 py-2 px-6 ">
              Women Founders Preferred
            </button>
            <div className="flex gap-x-2 items-start">
              <Info className="shrink-0 text-neutrals-700" size={28} />
              <div className="border p-2 rounded-xl">
                <p className="text-neutrals-700">
                  This opportunity is an excellent one for the women
                  entrepreneurs in India.
                </p>
              </div>
            </div>
          </div>
          <p>
            Eligibility criteria text,Eligibility criteria text,Eligibility
            criteria text,
          </p>

          <div>
            <h2 className="font-semibold text-lg">Startup Product Stages</h2>
            <p>Ideation Mvp</p>
          </div>
          <div>
            <h2 className="font-semibold text-lg">Startup Funding Stages</h2>
            <p>Pre Seed, Seed, Series A</p>
          </div>
          <div>
            <h2 className="font-semibold text-lg">Preferred Industries</h2>
            <ul className="list-disc list-inside">
              <li>Aviation</li>
              <li>Aviation</li>
              <li>Aviation</li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-lg">Preferred Industries</h2>
            <ul className="list-disc list-inside">
              <li>Aviation</li>
              <li>Aviation</li>
              <li>Aviation</li>
            </ul>
          </div>
        </div>
        <Separator />

        <div className="py-3 space-y-2">
          <h1 className="text-xl md:text-2xl font-semibold">Website</h1>
          <Link href="www.google.com" className="block text-linkBlue">
            visey.dtu.ac.in
          </Link>
        </div>

        <Separator />

        <div className="py-3 space-y-4">
          <h1 className="text-xl md:text-2xl font-semibold">Have Queries?</h1>
          <p>Get in Touch with organizers</p>
          <div className="flex gap-x-2">
            <button className="shrink-0 border flex items-center gap-x-2 text-sm sm:text-base border-neutral-200 rounded-full px-6 py-2">
              <PhoneCall size={20} />
              <span>Show contact Details</span>
            </button>
            <Button size="lg" className="rounded-full text-base-black bg-primary-200">
              Message
            </Button>
          </div>
        </div>

        <Separator />

        <div className="py-6 flex justify-center">
          <Button size="lg" className="rounded-full text-base font-semibold">
              Apply
          </Button>
        </div>
      </div>
    </section>
  );
}
