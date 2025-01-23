import BusinessProfilePublic from "@/components/profile/BusinessProfilePublic";
import { getBusinessById } from "@/actions/get-business-by-id";
import { Achievement, Business, Opportunity, Services } from "@prisma/client";
import { auth } from "@/auth";

interface FullBusiness extends Business {
  services: Services[];
  achievements: Achievement[];
  opportunities: Opportunity[];
}

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  const response = await getBusinessById(id);
  const session = await auth();
  if (!session || !session.user) {
    return <div>Not logged in!</div>;
  }

  const user = session.user;

  if (response?.error) {
    return (
      <div className="mt-10 max-w-[1200px] mx-auto mb-20">
        <div className="text-red-500">Error: {response.error}</div>
      </div>
    );
  }

  if (!response?.success || !response.business) {
    return (
      <div className="mt-10 max-w-[1200px] mx-auto mb-20">
        <div>Business not found</div>
      </div>
    );
  }

  const business = response.business as FullBusiness;

  const userBusinessProps = {
    userId: user.id,
    business: business,
    services: business.services,
    opportunities: business.opportunities,
    gallery: business.gallery,
    achievements: business.achievements,
  };

  return (
    <div>
      <div className="mt-10 max-w-[1200px] mx-auto mb-20">
        <BusinessProfilePublic user={userBusinessProps} />
      </div>
    </div>
  );
}

export default Page;
