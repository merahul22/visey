import { auth } from '@/auth';
import StartupDetailsForm from '@/components/form/StartupDetailsForm';
import { Startup } from '@prisma/client';
import React from 'react';

const page = async () => {
  const session = await auth();

  const user = session?.user;

  if (user?.type === 'BUSINESS') {
    return <div>Access Denied</div>;
  }

  const startup = user?.startup as Startup;

  return (
    <div className="flex justify-center mt-8 mb-20">
      <StartupDetailsForm startup={startup} />
    </div>
  );
};

export default page;
