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
    <div className="flex flex-col items-center">
      <PostFundingOpportunity />
    </div>
  );
};

export default page;
