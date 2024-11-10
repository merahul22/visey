import React from 'react';
import { Button } from './ui/button';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';

const CurrentPlan = () => {
  return (
    <div className="p-4 rounded-xl shadow-md">
      <div className="flex flex-col gap-2">
        <p className="text-xl text-neutrals-700 font-semibold">Plan Details</p>
        <div className="flex flex-col">
          <p className="text-xl font-bold">Free</p>
          <div className="flex gap-1 text-sm text-neutrals-700">
            <p className="font-semibold">Valid till:</p>
            <p>N/A</p>
          </div>
        </div>
      </div>
      <div className="mt-2 flex justify-end">
        <Button size="sm">
          <span>Upgrade Plan</span>
          <ArrowUpRight />
        </Button>
      </div>
    </div>
  );
};

export default CurrentPlan;
