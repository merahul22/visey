import { Check } from '@phosphor-icons/react/dist/ssr';
import React from 'react';
import { Button } from './ui/button';

const PricingBusiness = () => {
  return (
    <div>
      <div className="flex gap-4 flex-col md:flex-row items-center justify-center">
        <div className="border w-[324px] border-secondary-500 rounded-lg shadow-md px-4 py-2 flex flex-col gap-4 md:flex-1">
          <div className="flex flex-col gap-1">
            <p className="text-2xl font-semibold text-neutrals-700">
              1 Month Plan
            </p>
            <p className="text-2xl font-semibold">$119</p>
            <p className="text-sm text-neutrals-700">per month</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-x-2">
              <Check />
              <p className="text-neutrals-700 font-semibold">Get Visibility</p>
            </div>
            <div className="flex items-center gap-x-2">
              <Check />
              <p className="text-neutrals-700 font-semibold">Generate Leads</p>
            </div>
          </div>
          <Button className="bg-primary-500">Get Plan</Button>
        </div>
        <div className="border border-secondary-500 rounded-lg shadow-md px-4 py-2 flex flex-col gap-4 flex-1 w-[324px] bg-secondary-500">
          <div className="flex flex-col gap-1">
            <p className="text-2xl font-semibold text-base-white">
              3 Month Plan
            </p>
            <div className="flex gap-2">
              <p className="text-2xl text-neutrals-700 line-through">$119</p>
              <p className="text-2xl font-semibold text-base-white">$119</p>
            </div>
            <p className="text-sm text-base-white">per month</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-x-2">
              <Check />
              <p className="text-base-white font-semibold">Get Visibility</p>
            </div>
            <div className="flex items-center gap-x-2">
              <Check />
              <p className="text-base-white font-semibold">Generate Leads</p>
            </div>
          </div>
          <Button className="bg-base-white text-base-black hover:text-base-white">
            Get Plan
          </Button>
        </div>
        <div className="border rounded-lg shadow-md px-4 py-2 flex flex-col gap-4 flex-1 w-[324px]">
          <div className="flex flex-col gap-1">
            <p className="text-2xl font-semibold text-neutrals-700">
              1 Month Plan
            </p>
            <p className="text-2xl font-semibold">$119</p>
            <p className="text-sm text-neutrals-700">per month</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-x-2">
              <Check />
              <p className="text-neutrals-700 font-semibold">Get Visibility</p>
            </div>
            <div className="flex items-center gap-x-2">
              <Check />
              <p className="text-neutrals-700 font-semibold">Generate Leads</p>
            </div>
          </div>
          <Button className="bg-primary-500">Get Plan</Button>
        </div>
      </div>
    </div>
  );
};

export default PricingBusiness;
