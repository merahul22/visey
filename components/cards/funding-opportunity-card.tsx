import Image from 'next/image';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  CaretRight,
  HeartStraight,
  MapPin,
} from '@phosphor-icons/react/dist/ssr';
import { Button } from '../ui/button';

interface Props {
  isPromoted: boolean;
  underReview: boolean;
}

const FundingOpportunityCard = ({isPromoted, underReview}: Props) => {
  return (
    <div className="flex items-center justify-center lg:justify-start flex-col gap-4 lg:flex-row lg:items-center lg:gap-10">
      <div className="border-2 rounded-xl px-4 py-4 space-y-2 max-w-fit">
        <div className="space-y-2 lg:flex gap-2">
          <div className="w-[300px] h-[135px] flex items-center">
            <Image
              src="/img/image-placeholder.png"
              width={300}
              height={135}
              alt="Funding Opportunity Image"
            />
          </div>
          <div className="space-y-2">
            <div className="flex gap-1">
              <h1 className="text-lg max-w-[160px]">
                New media studies in business
              </h1>
              {isPromoted && (
                <div className="max-w-[100px]">
                  <Button
                    size="sm"
                    className="bg-base-secondary text-base-black font-normal shadow-none border-2 px-4 py-0 hover:bg-base-secondary"
                  >
                    <p>Promoted</p>
                  </Button>
                </div>
              )}
              {underReview && (
                <div className="max-w-[100px]">
                  <p className="font-semibold text-lg">Under Review</p>
                </div>
              )}
            </div>
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>
                  <div>
                    <p>{'B'}</p>
                  </div>
                </AvatarFallback>
              </Avatar>
              <p>Business Name</p>
            </div>
            <div>
              <p>Apply By: 21 December 2024</p>
            </div>
            <div className="flex gap-2 items-center">
              <MapPin />
              <p>Delhi, India</p>
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="px-4">
            <HeartStraight className="w-6 h-6" />
          </div>
          <div className="flex items-center justify-between border-2 px-6 py-2 flex-1">
            <p>23 Applications received</p>
            <CaretRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundingOpportunityCard;
