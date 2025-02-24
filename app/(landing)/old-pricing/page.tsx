import BusinessPricingPage from '@/app/(protected)/(main)/promote-business/page';
import OpportunityPricingPage from '@/app/(protected)/(main)/promote-opportunity/page';

const page = () => {
  return <div className="p-10 pb-20">
    <div className="pt-8">
      <h1  className="font-degular font-semibold text-heading4 md:text-heading3 lg:text-heading2 xl:text-heading1 leading-snug text-[#3f3f3f] text-center">Pricing</h1>
      <p className="font-medium pt-2 text-center">Start free, Upgrade to unlock business features</p>
    </div>
    <div className="pt-10">
      <div className="text-center">
        <h2 className="text-3xl font-semibold">Visey Promote: Improve business visibility</h2>
        <p className="pt-1 font-medium">Perfect for increasing business awareness and driving engagement</p>
      </div>
      <div>
        <BusinessPricingPage />
      </div>
    </div>
    <div className="pt-24">
      <div className="text-center">
        <h2 className="text-3xl font-semibold">Visey Ads: Run ads for your funding opportunities</h2>
        <p className="pt-1 font-medium">Create targeted ad campaigns and get more responses</p>
      </div>
      <div>
        <OpportunityPricingPage />
      </div>
    </div>
  </div>
}

export default page;