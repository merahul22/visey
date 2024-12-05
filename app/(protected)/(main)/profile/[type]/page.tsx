import { auth } from '@/auth';
import BusinessProfilePrivate from '@/components/profile/BusinessProfilePrivate';
import StartupProfile from '@/components/profile/StartupProfile';
import { Achievement, Business, Opportunity, Services } from '@prisma/client';
import { redirect } from 'next/navigation';

interface Params {
  type: string;
}

const ProfilePage = async (props: { params: Promise<Params> }) => {
  const params = await props.params;
  const session = await auth();

  if (!session || !session.user) {
    return <div>Not logged in!</div>
  }

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
    userId: user.id,
    business: user.business as Business,
    services: user.business?.services as Services[],
    opportunities: user.business?.opportunities as Opportunity[],
    gallery: user.business?.gallery as string[],
    achievements: user.business?.achievements as Achievement[],
  };

  if (params.type === 'startup' && user?.type === 'STARTUP') {
    return <div className="mb-20">
      <StartupProfile user={userStartupProps} />
    </div>
  } else if (params.type === 'business' && user?.type === 'BUSINESS') {
    return <div className="mt-10 max-w-[1200px] mx-auto mb-20">
      <BusinessProfilePrivate user={userBusinessProps} />
    </div>
  } else {
    return <div>Access Denied</div> // Handle invalid access
  }
};

export default ProfilePage;
