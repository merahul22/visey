import { auth } from '@/auth';
import PostFundingOpportunity from '@/components/form/PostFundingOpportunity';
import React from 'react';

const page = async () => {
  const session = await auth();

  const user = session?.user;

  if (user?.type === 'STARTUP') {
    return <div>Access Denied</div>;
  }

  return (
    <div className="flex justify-center mt-8">
      <div className="xl:min-w-[700px]">
        <PostFundingOpportunity />
      </div>
    </div>
  );
};

export default page;
