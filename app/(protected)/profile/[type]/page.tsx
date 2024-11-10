// Example: /profile/[type].tsx
import { auth } from '@/auth';
import BusinessProfile from '@/components/profile/BusinessProfile';
import StartupProfile from '@/components/profile/StartupProfile';
import { Achievement, Business, Opportunity, Services } from '@prisma/client';
import { redirect } from 'next/navigation';

interface Params {
  type: string;
}

const ProfilePage = async ({ params }: { params: Params }) => {
  const session = await auth();
  const user = session?.user;

  if (!user?.type) {
    redirect('/account-type');
  }

  const userStartupProps = {
    image: user.image,
    startup: user.startup,
    email: user.email,
    phoneNumber: user.phoneNumber,
    createdAt: user.createdAt,
    preferences: user.preferences,
    name: user.name,
  };

  const userBusinessProps = {
    business: user.business as Business,
    services: user.business?.services as Services[],
    opportunities: user.business?.opportunities as Opportunity[],
    gallery: user.business?.gallery as string[],
    achievements: user.business?.achievements as Achievement[],
  };

  if (params.type === 'startup' && user?.type === 'STARTUP') {
    return <StartupProfile user={userStartupProps} />;
  } else if (params.type === 'business' && user?.type === 'BUSINESS') {
    return <BusinessProfile user={userBusinessProps} />;
  } else {
    return <div>Access Denied</div>; // Handle invalid access
  }
};

export default ProfilePage;
