import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BusinessCard } from '@/components/cards/business-card';
import { Separator } from '@/components/ui/separator';
import { FundingCard } from '@/components/cards/funding-card';

const page = () => {
  const date = new Date(Date.now());

  return <div className="mb-20">
    <h1 className="text-xl font-semibold">Saved</h1>
    <Tabs defaultValue="business" className="mt-2">
      <div className="overflow-scroll">
        <TabsList>
          <TabsTrigger value={'business'}>Business</TabsTrigger>
          <TabsTrigger value={'opportunities'}>Funding
            Opportunities</TabsTrigger>
        </TabsList>
      </div>
      <Separator className="mt-4 mb-4" />
      <TabsContent value={"business"}>
        <div
          className="space-y-4 sm:grid sm:grid-cols-2 sm:space-y-0 sm:gap-x-4 sm:gap-y-8 xl:grid-cols-3">
          {Array.from({ length: 5 }).map((_, idx) => (
            <BusinessCard key={idx} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value={"opportunities"}>
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((item, idx) => (
            <FundingCard
              key={idx}
              promoted
              title="New Studies in Business Media"
              businessName="Business Name"
              avatarUrl="https://picsum.photos/100"
              applyBy={date}
              location="Delhi, India"
            />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  </div>
}

export default page;