import { auth } from '@/auth';
import BusinessSettings from '@/components/settings/BusinessSettings';
import StartupSettings from '@/components/settings/StartupSettings';
import { redirect } from 'next/navigation';

interface Params {
  type: string;
}

interface User {
  id: string | undefined;
  email: string;
  phoneNumber: string;
}

const ProfilePage = async ({ params }: { params: Params }) => {
  const session = await auth();
  const user = session?.user;

  if (!user?.type) {
    redirect('/account-type');
  }

  const userProps: User = {
    id: user.id,
    email: user.email,
    phoneNumber: user.phoneNumber,
  };

  if (params.type === 'startup' && user?.type === 'STARTUP') {
    return <StartupSettings user={userProps} />;
  } else if (params.type === 'business' && user?.type === 'BUSINESS') {
    return <BusinessSettings />;
  } else {
    return <div>Access Denied</div>; // Handle invalid access
  }
};

export default ProfilePage;
