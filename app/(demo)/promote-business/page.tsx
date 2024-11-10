import React from 'react';
import { ShieldCheck } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Footer from '@/components/Footer';
import PricingBusiness from '@/components/PricingBusiness';

const Page = () => {
  return (
    <div className="space-y-12">
      <div className="rounded-lg bg-primary-100 mt-10">
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
              <p className="bg-[#ff83b6] font-semibold px-2 rounded-lg">
                Promote
              </p>
            </div>
            <div>
              <div>
                <p className="text-2xl font-semibold">3 Months Plan</p>
                <p className="text-sm">Generate Leads & Access Analytics</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-x-4">
              <div className="text-success-300">
                <ShieldCheck />
              </div>
              <p>Increase Visibility</p>
            </div>
            <div className="flex items-center gap-x-4">
              <div className="text-success-300">
                <ShieldCheck />
              </div>
              <p>Generate Leads</p>
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
                <Button>Promote Business for Rs 9/day</Button>
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
        <PricingBusiness />
      </div>
      <div>
        <h1 className="text-center font-semibold mb-8">FAQs</h1>
        <div className="text-base flex justify-center">
          <Accordion
            type="single"
            collapsible
            className="w-[324px] lg:w-[800px]"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that matches the other
                components&apos; aesthetic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
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
      <Footer />
    </div>
  );
};

export default Page;
