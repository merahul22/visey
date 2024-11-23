import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

import { HeartStraight, ShareFat, Star } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/button';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import About from '@/components/profile/_components/about';
import Service from '@/components/profile/_components/services';
import Achievements from '@/components/profile/_components/achivements';
import Opportunities from '@/components/profile/_components/opportunities';
import Gallery from '@/components/profile/_components/gallery';
import RatingReview from '@/components/profile/_components/rating-review';
import ContactOverlay from '../ContactDetails';
import StarRatingConstant from '../StarRatingConstant';
import { Achievement, Business, Opportunity, Services } from '@prisma/client';

interface BusinessProfileProps {
  userId: string | undefined;
  business: Business | null;
  services: Services[];
  opportunities: Opportunity[];
  achievements: Achievement[];
  gallery: string[];
}

export default function BusinessProfilePrivate({ user, }: {
  user: BusinessProfileProps;
}) {
  const business = user.business;

  if (!business) {
    return (
      <div className="">
        <p>Business not found</p>
      </div>
    );
  }

  return (
    <section className="flex gap-x-12">
      <div className="flex-1 max-w-screen-md rounded-xl overflow-hidden">
        <div className="h-24 md:h-40 bg-neutral-400"></div>
        <div className="-mt-10  md:-mt-20 flex justify-center">
          <Avatar className="size-36 md:size-44 border-[6px] border-white  rounded-full overflow-hidden">
            <AvatarImage src="" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="p-4 space-y-4">
          <div className="space-y-0.5">
            <div className="flex gap-x-6 justify-between items-start">
              <p className="text-xl md:text-2xl">{business?.name}</p>
              <p className="text-sm px-4 py-0.5 bg-secondary-200 rounded-full">
                Promoted
              </p>
            </div>
            <p className="text-linkBlue text-sm">
              {business?.registeredName || 'Business Registered Name'}
            </p>
            <p className="">
              {business?.description || 'Business Description'}
            </p>
          </div>
          <div className="flex gap-x-4 items-center">
            <div className="flex justify-center gap-x-1">
              <StarRatingConstant rating={4.1} />
            </div>
            <p className="text-sm">439 ratings</p>
          </div>

          <div className="flex items-center gap-4">
            <ContactOverlay
              contactNumber={business?.contactNumber}
              email={business?.email}
              websiteUrl={business?.websiteUrl}
            />

            <div className="-translate-y-1 flex gap-x-2 items-center">
              <Button variant="ghost" size="icon">
                <HeartStraight size={24} />
              </Button>

              <Button variant="ghost" size="icon">
                <ShareFat size={24} />
              </Button>
            </div>
          </div>
        </div>

        <Separator />

        <div className="py-6">
          <Tabs defaultValue="overview">
            <div className="overflow-scroll">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="overview">
              <About
                location={business?.location}
                description={business?.description}
                isPublic={false}
              />
              <Separator />
              <Service
                services={user.services}
                isPublic={false}
              />
              <Separator />
              <Achievements
                achievements={user.achievements}
                isPublic={false}
              />
              <Separator />
              <Opportunities
                opportunities={user.opportunities}
                name={business?.name as string}
                location={business?.location as string}
                isPublic={false}
              />
              <Separator />
              <Gallery
                gallery={user.gallery}
                isPublic={false}
              />
              <Separator />
              <RatingReview
                businessId={ business.id }
                userId={ user.userId }
                isPublic={false}
              />
            </TabsContent>
            <TabsContent value="services">
              <Service
                services={user.services}
                isPublic={false}
              />
            </TabsContent>
            <TabsContent value="reviews">
              <RatingReview
                businessId={ business.id }
                userId={ user.userId }
                isPublic={false}
              />
            </TabsContent>
            <TabsContent value="gallery">
              <Gallery
                gallery={user.gallery}
                isPublic={false}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div className="hidden lg:flex max-w-64 flex-col gap-y-12">
        <div className="space-y-2">
          <h2 className="font-medium">Categories Listed In</h2>
          <div className="flex gap-2 flex-wrap">
            {business?.categoryTags?.map((category) => (
              <Button size="sm" variant="outline" key={category}>
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="p-2 border rounded-lg  mx-auto">
          <div className="bg-neutrals-400 rounded-lg w-32 aspect-[1/4]"></div>
        </div>

        <div className="border rounded-xl p-6 space-y-2">
          <Button className="w-full">Contact Business</Button>
          <Button variant="outline" className="gap-x-2 items-center w-full">
            <Star className="shrink-0 -translate-y-[1.5px]" size={16} />
            <span>Rate this business</span>
          </Button>
        </div>

        <div className="p-2 border rounded-lg  mx-auto">
          <div className="bg-neutrals-400 rounded-lg w-32 aspect-[1/4]"></div>
        </div>
      </div>
    </section>
  );
}
