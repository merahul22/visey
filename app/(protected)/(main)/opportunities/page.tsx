import { auth } from '@/auth';
import { DotsThreeVertical, ListBullets, Plus, ShareNetwork, Trash } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import FundingOpportunityCardApplications from '@/components/cards/funding-opportunity-card-applications';
import Link from 'next/link';

const Opportunities = async () => {
  const session = await auth();
  const user = session?.user;

  if (user?.type === "STARTUP") {
    return <div>Access Denied</div>
  }

  return <div className="px-0 sm:px-4 mb-20">
    <div className="flex gap-4 items-center mt-2">
      <div className="cursor-pointer">
        <ShareNetwork />
      </div>
      <Button
        className="bg-secondary-100 text-neutrals-1000 border-2 border-neutrals-200 shadow-none hover:shadow-md hover:bg-secondary-100 rounded-full"
        size="sm"
      >
        Promote
      </Button>
      <div className="cursor-pointer">
        <Button variant="ghost" size="icon">
          <Trash />
        </Button>
      </div>
    </div>

    <div className="mt-2">
      <div className="flex flex-col gap-2 md:gap-0 justify-start md:flex-row md:justify-between md:items-center">
        <h1 className="text-xl">Posted Opportunity</h1>
        <div>
          <Button size="md">
            <Link href={"/post-funding-opportunity"}>
              <div className="flex items-center gap-2 font-medium">
                <span>Post New Opportunity</span>
                <Plus />
              </div>
            </Link>
          </Button>
        </div>
      </div>
    </div>

    <div className="mt-4">
      <div className="flex justify-between items-center relative">
        <div className="">
          <Tabs defaultValue="all">
            <div className="overflow-scroll">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
              </TabsList>
              <div className="absolute top-0 right-0">
                <Button variant="outline" size="sm" className="rounded-md">
                  <div className="flex items-center gap-2">
                    <ListBullets />
                    <span>Filter</span>
                  </div>
                </Button>
              </div>
            </div>

            <div className="mt-4 mb-4 text-primary-700">
              <div className="relative shadow-inner">
                <Input
                  className="flex-1 pr-10 border-none py-4"
                  type="text"
                  placeholder="Find in opportunities"
                />
                <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-600" />
              </span>
              </div>
            </div>

            <TabsContent value="all">
              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <FundingOpportunityCardApplications isPromoted={true} underReview={false} />
                  <div className="hidden sm:block cursor-pointer">
                    <DotsThreeVertical className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <FundingOpportunityCardApplications isPromoted={true} underReview={false} />
                  <div className="hidden sm:block cursor-pointer">
                    <DotsThreeVertical className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <FundingOpportunityCardApplications isPromoted={false} underReview={true} />
                  <div className="hidden sm:block cursor-pointer">
                    <DotsThreeVertical className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <FundingOpportunityCardApplications isPromoted={true} underReview={false} />
                  <div className="hidden sm:block cursor-pointer">
                    <DotsThreeVertical className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <FundingOpportunityCardApplications isPromoted={true} underReview={false} />
                  <div className="hidden sm:block cursor-pointer">
                    <DotsThreeVertical className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <FundingOpportunityCardApplications isPromoted={true} underReview={false} />
                  <div className="hidden sm:block cursor-pointer">
                    <DotsThreeVertical className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="active">
              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <FundingOpportunityCardApplications isPromoted={true} underReview={false} />
                  <div className="hidden sm:block cursor-pointer">
                    <DotsThreeVertical className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <FundingOpportunityCardApplications isPromoted={true} underReview={false} />
                  <div className="hidden sm:block cursor-pointer">
                    <DotsThreeVertical className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <FundingOpportunityCardApplications isPromoted={true} underReview={false} />
                  <div className="hidden sm:block cursor-pointer">
                    <DotsThreeVertical className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <FundingOpportunityCardApplications isPromoted={true} underReview={false} />
                  <div className="hidden sm:block cursor-pointer">
                    <DotsThreeVertical className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <FundingOpportunityCardApplications isPromoted={true} underReview={false} />
                  <div className="hidden sm:block cursor-pointer">
                    <DotsThreeVertical className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="past">
              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <FundingOpportunityCardApplications isPromoted={true} underReview={false} />
                  <div className="hidden sm:block cursor-pointer">
                    <DotsThreeVertical className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <FundingOpportunityCardApplications isPromoted={true} underReview={false} />
                  <div className="hidden sm:block cursor-pointer">
                    <DotsThreeVertical className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <FundingOpportunityCardApplications isPromoted={true} underReview={false} />
                  <div className="hidden sm:block cursor-pointer">
                    <DotsThreeVertical className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <FundingOpportunityCardApplications isPromoted={true} underReview={false} />
                  <div className="hidden sm:block cursor-pointer">
                    <DotsThreeVertical className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <FundingOpportunityCardApplications isPromoted={true} underReview={false} />
                  <div className="hidden sm:block cursor-pointer">
                    <DotsThreeVertical className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <FundingOpportunityCardApplications isPromoted={true} underReview={false} />
                  <div className="hidden sm:block cursor-pointer">
                    <DotsThreeVertical className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  </div>
}

export default Opportunities;