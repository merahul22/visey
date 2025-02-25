import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { BusinessCard } from "@/components/cards/business-card";
import { Separator } from "@/components/ui/separator";
import { FundingCard } from "@/components/cards/funding-card";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import getSavedFundingOpportunities from "@/actions/get-saved-funding-opportunities";
import { toast } from "sonner";

const Page = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect(DEFAULT_LOGIN_REDIRECT);
  }

  const res = await getSavedFundingOpportunities(user.id as string);

  if (res.error) {
    toast.error("Cannot get saved funding opportunities");
  }

  const savedFundingOpportunities = res.data;

  return (
    <div className="mb-20">
      <h1 className="text-xl font-semibold">Saved</h1>
      <Tabs defaultValue="business" className="mt-2">
        <div className="overflow-scroll">
          <TabsList>
            <TabsTrigger value={"business"}>Business</TabsTrigger>
            <TabsTrigger value={"opportunities"}>
              Funding Opportunities
            </TabsTrigger>
          </TabsList>
        </div>
        <Separator className="mt-4 mb-4" />
        <TabsContent value={"business"}>
          <div className="space-y-4 sm:grid sm:grid-cols-2 sm:space-y-0 sm:gap-x-4 sm:gap-y-8 xl:grid-cols-3">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx}>Business</div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value={"opportunities"}>
          <div className="flex flex-col gap-4">
            {savedFundingOpportunities?.map((op) => (
              <FundingCard
                key={op.opportunity.id}
                fundingOpportunity={op.opportunity}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
