"use client";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import {
  DotsThreeVertical,
  ThumbsDown,
  ThumbsUp,
} from '@phosphor-icons/react/dist/ssr';
import StarRatingConstant from '@/components/StarRatingConstant';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface Rating {
  id?: string;
  user: {
    id: string;
    name: string;
    image: string;
  };
  rating: number;
  comment: string;
  createdAt: Date;
  likes: number;
  dislikes: number;
}

const UserRating = (props: Rating) => {
  const date = new Date(props.createdAt);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return <>
    <div className="p-4 space-y-4 ">
      <Avatar className="size-10 rounded-full">
        <AvatarImage src={props.user?.image} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="space-y-2">
        <div className="flex justify-between">
          <h3 className="flex gap-x-2">
            <span>{props.user?.name}</span>
            <Image src="/img/badge.png" height={24} width={24} alt="badge" />
          </h3>
          <div className="cursor-pointer">
            <DotsThreeVertical size={20} />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <StarRatingConstant rating={props.rating} />
            <p className="text-sm">{formattedDate}</p>
          </div>
          <p>{props.comment}</p>
          <div className="flex gap-x-6">
            <div className="flex items-center gap-x-0.5">
              <Button size="icon" variant="ghost">
                <ThumbsUp size={16} />
              </Button>

              <span className="text-sm">{props.likes}</span>
            </div>

            <div className="flex items-center gap-x-0.5">
              <Button size="icon" variant="ghost">
                <ThumbsDown size={16} />
              </Button>

              <span className="text-sm">{props.dislikes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Separator className="my-4" />
  </>
}

export default UserRating;