import { auth } from '@/auth';
import { Plus, ShareNetwork } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import FundingOpportunityCardApplications from '@/components/cards/funding-opportunity-card-applications';
import Link from 'next/link';
import getBusinessOpportunities from '@/actions/get-business-opportunities';
import { redirect } from 'next/navigation';
import { isDateAfterToday, isDateBeforeToday } from "@/lib/dates";
import ManageOpportunityActions from '@/components/manage-opportunity-actions';

type OpportunitiesPageProps = {
  searchParams: Promise<{ q?: string }>;
};

const Opportunities = async ({ searchParams }: OpportunitiesPageProps) => {
  const resolvedSearchParams = await searchParams;
  const session = await auth();
  const user = session?.user;

  // Only business users can access this page
  if (user?.type === "STARTUP") {
    return <div>Access Denied</div>;
  }

  // Business must exist to manage opportunities
  if (!user?.business?.id) {
    redirect('/list-business');
  }

  // Get opportunities created by this business
  const opportunities = await getBusinessOpportunities(user.business.id);
  // Filter opportunities based on search query
  const filteredOpportunities = opportunities.filter(opp => {
    if (!resolvedSearchParams.q) return true;
    
    const query = resolvedSearchParams.q.toLowerCase();
    return (opp.title?.toLowerCase().includes(query) || 
            opp.description?.toLowerCase().includes(query));
  });

  return (
    <div className="px-0 sm:px-4 mb-20">
      <div className="mt-2">
        <div className="flex flex-col gap-2 md:gap-0 justify-start md:flex-row md:justify-between md:items-center">
          <h1 className="text-xl">Posted Opportunities</h1>
          <div>
            <Button size="md">
              <Link href="/post-funding-opportunity">
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
          <div className="w-full">
            <Tabs defaultValue="all">
              <TabsList className="w-full sm:w-auto">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
              </TabsList>

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
                  {filteredOpportunities.map((opportunity) => (
                    <div key={opportunity.id} className="flex gap-2">
                      <FundingOpportunityCardApplications 
                        opportunity={opportunity}
                        isPromoted={false} 
                        underReview={false} 
                      />
                      <div className="hidden sm:block">
                        <ManageOpportunityActions opportunityId={opportunity.id} />
                      </div>
                    </div>
                  ))}
                  {filteredOpportunities.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No opportunities posted yet. Create your first opportunity!
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="active">
                <div className="flex flex-col gap-4">                  {filteredOpportunities
                    .filter(opp => isDateAfterToday(opp.endDatetime))
                    .map((opportunity) => (
                      <div key={opportunity.id} className="flex gap-2">
                        <FundingOpportunityCardApplications 
                          opportunity={opportunity}
                          underReview={false} 
                        />
                        <div className="hidden sm:block">
                          <ManageOpportunityActions opportunityId={opportunity.id} />
                        </div>
                      </div>
                    ))}
                  {filteredOpportunities.filter(opp => isDateAfterToday(opp.endDatetime)).length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No active opportunities found.
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="past">
                <div className="flex flex-col gap-4">
                  {filteredOpportunities
                    .filter(opp => isDateBeforeToday(opp.endDatetime))
                    .map((opportunity) => (
                      <div key={opportunity.id} className="flex gap-2">
                        <FundingOpportunityCardApplications 
                          opportunity={opportunity}
                          isPromoted={false} 
                          underReview={false} 
                        />
                        <div className="hidden sm:block">
                          <ManageOpportunityActions opportunityId={opportunity.id} />
                        </div>
                      </div>
                    ))}
                  {filteredOpportunities.filter(opp => isDateBeforeToday(opp.endDatetime)).length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No past opportunities found.
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Opportunities;