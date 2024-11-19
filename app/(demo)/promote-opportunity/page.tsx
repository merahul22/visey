'use client';

import React from 'react';
import { Check, ShieldCheck } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const OpportunityPricingPage = () => {
  return (
    <div className="space-y-12">
      <div className="rounded-lg bg-[#ffdfbf] mt-10">
        <div className="bg-primary-600 text-base-white py-2 rounded-t-lg text-sm text-center font-semibold">
          <p>Start free and Upgrade to unlock business features.</p>
        </div>

        <div className="flex flex-col items-center px-8 py-4 gap-4 lg:flex-row lg:justify-between">
          <div>
            <Image
              src="/img/create-resume.png"
              width={200}
              height={140}
              alt="Logo"
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-x-2">
              <p className="font-semibold">visey</p>
              <p className="bg-[#ff9529] font-semibold px-2 rounded-lg">Ads</p>
            </div>
            <div>
              <div>
                <p className="text-2xl font-semibold">10 Days + 2 Free</p>
                <p className="text-sm">
                  Effectively reach your target audience
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-x-4">
              <div className="text-success-300">
                <ShieldCheck />
              </div>
              <p>More Responses</p>
            </div>
            <div className="flex items-center gap-x-4">
              <div className="text-success-300">
                <ShieldCheck />
              </div>
              <p>More Visibility</p>
            </div>
            <div className="flex items-center gap-x-4">
              <div className="text-success-300">
                <ShieldCheck />
              </div>
              <p>Rank Higher</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 pr-2">
            <div className="flex flex-col items-center">
              <div>
                <Button>Run Ad</Button>
              </div>
              <p className="text-linkBlue underline text-sm cursor-pointer font-semibold mt-2">
                Buy on Call
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-center font-semibold mb-8">Other Plans for you</h1>
        <div className="flex gap-4 flex-col md:flex-row items-center justify-center">
          <div className="border w-[324px] border-secondary-500 rounded-lg shadow-md px-4 py-2 flex flex-col gap-4 md:flex-1">
            <div className="flex flex-col gap-1">
              <p className="text-2xl font-semibold text-neutrals-700">
                7 Day Plan
              </p>
              <p className="text-2xl font-semibold">$119</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-x-2">
                <Check />
                <p className="text-neutrals-700 font-semibold">
                  Get Visibility
                </p>
              </div>
              <div className="flex items-center gap-x-2">
                <Check />
                <p className="text-neutrals-700 font-semibold">
                  Generate Leads
                </p>
              </div>
            </div>
            <Button className="bg-primary-500">Get Plan</Button>
          </div>
          <div className="border border-secondary-500 rounded-lg shadow-md px-4 py-2 flex flex-col gap-4 flex-1 w-[324px] bg-secondary-500">
            <div className="flex flex-col gap-1">
              <p className="text-2xl font-semibold text-base-white">
                10 Days + 2 Free
              </p>
              <div className="flex gap-2">
                <p className="text-2xl text-neutrals-700 line-through">$101</p>
                <p className="text-2xl font-semibold text-base-white">$79</p>
              </div>
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
                21 Days + 4 Free
              </p>
              <p className="text-2xl font-semibold">$179</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-x-2">
                <Check />
                <p className="text-neutrals-700 font-semibold">
                  Get Visibility
                </p>
              </div>
              <div className="flex items-center gap-x-2">
                <Check />
                <p className="text-neutrals-700 font-semibold">
                  Generate Leads
                </p>
              </div>
            </div>
            <Button className="bg-primary-500">Get Plan</Button>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-center font-semibold mb-8">FAQs</h1>
        <div className="text-base flex justify-center">
          <Accordion
            type="single"
            collapsible
            className="w-[324px] lg:w-[800px] flex flex-col gap-2"
          >
            <AccordionItem value="item-1" className="border-2 border-primary-100 px-6 rounded-md">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-2 border-primary-100 px-6 rounded-md">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that matches the other
                components&apos; aesthetic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-2 border-primary-100 px-6 rounded-md">
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>
                Yes. It&apos;s animated by default, but you can disable it if
                you prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <div className="flex justify-center cursor-pointer">
        <p className="text-linkBlue underline">View Terms & Conditions</p>
      </div>
    </div>
  );
};

export default OpportunityPricingPage;
