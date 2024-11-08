// Example: /profile/[type].tsx
import { auth } from '@/auth';
import BusinessProfile from '@/components/profile/BusinessProfile';
import StartupProfile from '@/components/profile/StartupProfile';
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

  const userProps = {
    image: user.image,
    startup: user.startup,
    email: user.email,
    phoneNumber: user.phoneNumber,
    createdAt: user.createdAt,
    preferences: user.preferences,
    name: user.name,
  };

  if (params.type === 'startup' && user?.type === 'STARTUP') {
    return <StartupProfile user={userProps} />;
  } else if (params.type === 'business' && user?.type === 'BUSINESS') {
    return <BusinessProfile />;
  } else {
    return <div>Access Denied</div>; // Handle invalid access
  }
};

export default ProfilePage;
