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

  if (params.type === 'startup' && user?.type === 'STARTUP') {
    return <StartupProfile user={user} />;
  } else if (params.type === 'business' && user?.type === 'BUSINESS') {
    return <BusinessProfile />;
  } else {
    return <div>Access Denied</div>; // Handle invalid access
  }
};

export default ProfilePage;
