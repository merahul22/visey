import { auth } from '@/auth';
import Settings from '@/components/settings/Settings';
import { redirect } from 'next/navigation';

const ProfilePage = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user?.type) {
    redirect('/account-type');
  }

  const userProps = {
    id: user.id,
    email: user.email,
    phoneNumber: user.phoneNumber,
    hasPassword: user.hasPassword,
  };

  return <Settings user={userProps} />;
};

export default ProfilePage;
