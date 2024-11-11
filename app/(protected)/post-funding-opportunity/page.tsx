import { auth } from '@/auth';
import PostFundingOpportunity from '@/components/form/PostFundingOpportunity';
import { Business } from '@prisma/client';
import React from 'react';

const page = async () => {
  const session = await auth();

  const user = session?.user;

  if (user?.type === 'STARTUP') {
    return <div>Access Denied</div>;
  }

  const business = user?.business as Business;

  return (
    <div className="flex justify-center mt-4">
      <div className="xl:min-w-[700px]">
        <PostFundingOpportunity business={business} />
      </div>
    </div>
  );
};

export default page;
