import { auth } from '@/auth';
import ListBusinessForm from '@/components/form/ListBusinessForm';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await auth();

  const user = session?.user;

  if (
    user?.type === 'STARTUP' ||
    (user?.type === 'BUSINESS' && user.business)
  ) {
    redirect('/home');
  }

  return (
    <div className="flex items-center justify-start">
      <ListBusinessForm />
    </div>
  );
};

export default page;
