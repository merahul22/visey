"use client";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { HeartStraight, MapPin } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';

interface FundingCardProps {
  id: string;
  title: string;
  promoted: boolean;
  businessName: string;
  avatarUrl?: string;
  applyBy: Date | null;
  location: string;
}

export function FundingCard({
  id,
  title,
  promoted,
  businessName,
  avatarUrl,
  applyBy,
  location,
}: FundingCardProps) {
  const router = useRouter();
  const date = new Date(applyBy as Date);

  const formattedDate = `${date.getDate()} ${date.toLocaleString('default', {
    month: 'long',
  })}, ${date.getFullYear()}`;

  const handleApplyClick = () => {
    router.push(`/apply-opportunity?id=${id}`);
  };

  return (
    <div className="flex lg:justify-start flex-col gap-4 lg:flex-row lg:items-center lg:gap-10">
      <div className="border-2 rounded-xl px-4 py-4 space-y-2 max-w-fit">
        <div className="space-y-2 lg:flex gap-6">
          <div className="w-[220px] h-[135px] flex items-center justify-center">
            <Image
              src="/img/funding-opportunity-placeholder.png"
              width={300}
              height={135}
              className="rounded-lg mt-4 flex items-center justify-center"
              alt="Funding Opportunity Image"
            />
          </div>
          <div className="space-y-2">
            <div className="flex gap-1">
              <h1 className="text-lg max-w-[200px]">
                {title}
              </h1>
              {promoted && (
                <div className="max-w-[100px]">
                  <Button
                    size="sm"
                    className="bg-base-secondary text-base-black font-normal shadow-none border-2 px-4 py-0 hover:bg-base-secondary"
                  >
                    <p>Promoted</p>
                  </Button>
                </div>
              )}
            </div>
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage src={`${avatarUrl}`} />
                <AvatarFallback>
                  <div>
                    <p>{'B'}</p>
                  </div>
                </AvatarFallback>
              </Avatar>
              <p>{businessName}</p>
            </div>
            <div>
              <p>Apply By: {formattedDate}</p>
            </div>
            <div className="flex gap-2 items-center">
              <MapPin />
              <p>{location}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center justify-end">
          <div className="px-4 cursor-pointer">
            <HeartStraight className="w-6 h-6" />
          </div>
          <Button variant="secondary" onClick={handleApplyClick}>
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}
