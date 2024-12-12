import { ChartLineUp, UsersThree, Eye } from '@phosphor-icons/react/dist/ssr';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import React from 'react';

const page = () => {
  return (
    <div className="m-8 mb-24 p-8 border-2 rounded-xl">
      <div>
        <h1 className="font-degular font-semibold text-heading4 md:text-heading3 lg:text-heading2 xl:text-heading1 leading-snug text-[#3f3f3f]">
           Partner With Us
        </h1>
        <p className="font-medium">
          At Visey, we’re committed to empowering the entrepreneurial ecosystem
          across India, and we
          believe that collaboration is key to this journey. By partnering with
          us, you’ll join a network
          of forward-thinking investors, mentors, service providers, and
          stakeholders who are all
          dedicated to supporting innovative startups and breaking down barriers
          for entrepreneurs
          everywhere.
        </p>
      </div>
      <div className="pt-16">
        <h2 className="font-semibold text-2xl mb-8 text-center">Why Partner with Us?</h2>
        <div className="max-w-screen-2xl mx-auto flex flex-col gap-6 md:flex-row">
          <div
            className="px-10 pt-10 pb-24 rounded-2xl space-y-6 bg-primary-landing-light text-base-white flex-1"
          >
            <div
              className="p-2 rounded-full inline-flex justify-center items-center bg-success-landing">
              <ChartLineUp size={36} className="text-[#709B08]" />
            </div>
            <div className="space-y-4 ">
              <h3 className="font-degular font-medium text-hero leading-tight">
                Access to a Dynamic Startup Community
              </h3>
              <p className="">
                Connect with passionate entrepreneurs and promising
                startups across India.
                Share your expertise, showcase your offerings, and build
                relationships with the leaders
                of tomorrow.
              </p>
            </div>
          </div>
          <div
            className="px-10 pt-10 pb-24 rounded-2xl space-y-6 bg-primary-landing-light text-base-white flex-1"
          >
            <div
              className="p-2 rounded-full inline-flex justify-center items-center bg-success-landing">
              <UsersThree size={36} className="text-[#709B08]" />
            </div>
            <div className="space-y-4 ">
              <h3 className="font-degular font-medium text-hero leading-tight">
                Create Lasting Impact
              </h3>
              <p className="">
                Together, we can break down barriers in the entrepreneurial journey,
                accelerate startup growth, and foster an environment where innovation can thrive. Partnering
                with Visey isn’t just a collaboration; it’s a commitment to building a resilient and
                accessible ecosystem.
              </p>
            </div>
          </div>
          <div
            className="px-10 pt-10 pb-24 rounded-2xl space-y-6 bg-primary-landing-light text-base-white flex-1"
          >
            <div
              className="p-2 rounded-full inline-flex justify-center items-center bg-success-landing">
              <Eye size={36} className="text-[#709B08]" />
            </div>
            <div className="space-y-4 ">
              <h3 className="font-degular font-medium text-hero leading-tight">
                Mutual Growth Opportunities
              </h3>
              <p className="">
                As a Visey partner, you gain access to a powerful network of resources,
                insights, and strategic alliances. Together, we create value and unlock growth opportunities
                for both our partners and the startups we serve.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-16">
        <h2 className="font-semibold text-2xl text-center">Who we partner with?</h2>
        <p className="pt-8">We’re looking for partners from diverse areas of the startup ecosystem, including:</p>
        <ul className="pt-6 list-disc pl-4">
          <li>
            <p>
              <span className="font-semibold">Investors:</span>
              aiming to support impactful ventures
            </p>
          </li>
          <li>
            <p>
              <span className="font-semibold">Mentors:</span>
              eager to guide entrepreneurs with their expertise
            </p>
          </li>
          <li>
            <p>
              <span className="font-semibold">Incubators & Accelerators:</span>
              sharing our vision for ecosystem growth
            </p>
          </li>
          <li>
            <p>
              <span className="font-semibold">Service Providers:</span>
              offering tools and resources for startup success
            </p>
          </li>
          <li>
            <p>
              <span className="font-semibold">Entrepreneurial Events:</span>
              interested in collaborating to create engaging, impactful experiences for the startup community
            </p>
          </li>
        </ul>
        <p className="pt-8">
          Let’s work together to shape the future of innovation in India. Reach out to us at <span className="font-semibold">contact@visey.co.in</span> to explore how
          we can make a difference, together. Also you can directly call us on <span className="font-semibold">+91 78275 86754</span>
        </p>
      </div>
      <div className="pt-16">
        <h2 className="font-semibold text-2xl text-center">Our Team will Connect With You Soon!</h2>
        <form
          action=""
          className="bg-primary-landing rounded-2xl mx-auto p-8 mt-9 mb-1 md:w-8/12 xl:w-6/12 md:rounded-full md:flex md:items-center md:gap-x-6"
        >
          <div className="md:flex-1">
            <Input
              className="border-0 shadow-none h-12  text-base-white placeholder:text-base-white"
              placeholder="Your name"
            />
            <Separator />
            <Input
              className="border-0 shadow-none h-12 text-base-white placeholder:text-base-white"
              placeholder="Your email"
            />
          </div>
          <Link href="/demo-account-type">
            <Button variant="landing"
                    className="w-11/12 py-3 px-4 rounded-full shadow-2xl mt-6 md:mt-0 md:shrink-0 md:w-auto md:p-6 md:aspect-square cursor-pointer">
              Sign up
            </Button>
          </Link>
        </form>
      </div>
    </div>
  )
};

export default page;