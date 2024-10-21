import { Separator } from '@/components/ui/separator';
import React from 'react';
import { Button } from './ui/button';
import Image from 'next/image';
import { auth } from '@/auth';
import Link from 'next/link';

const StartupResume = async () => {
  const session = await auth();

  const user = session?.user;

  return (
    <div className="p-6">
      <div className="">
        <h1 className="text-xl mb-4">Startup Resume</h1>
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div>
            <Image
              src={user?.image || ''}
              height={150}
              width={150}
              alt="Profile Photo"
              className="rounded-full"
            />
          </div>

          <div className="flex flex-col gap-y-4 items-start">
            <div className="flex flex-col items-start">
              <h3 className="flex justify-center gap-x-2 ">
                <span>Startup Name</span>
                <Image
                  src="/img/badge.png"
                  height={24}
                  width={24}
                  alt="badge"
                />
              </h3>
              <p className="text-linkBlue text-sm">Company Registered Name</p>
              <p className="text-sm">We make home decor from old clothes</p>
            </div>
            <div className="flex gap-x-2">
              <Button variant="outline" size="sm" className="py-1.5">
                Industry
              </Button>
              <Button variant="outline" size="sm" className="py-1.5">
                Sector
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Separator className="mt-4 mb-4" />
      {/* intro section */}
      <article className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-semibold">Website</h3>
          <Link href="www.visey.dtu.ac.in" className="text-linkBlue text-sm">
            www.visey.dtu.ac.in
          </Link>
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-semibold">Progress</h1>

          <div className="">
            <h3 className="font-semibold">Startup Product Stage*</h3>
            <p className="text-sm ">Ideation</p>
          </div>
          <div className="">
            <h3 className="font-semibold">Startup Funding Stage*</h3>
            <p className="text-sm ">Ideation</p>
          </div>
          <div className="">
            <h3 className="font-semibold">TRL Level*</h3>
            <p className="text-sm ">Ideation</p>
          </div>
        </div>
      </article>

      <Separator className="mt-4 mb-4" />

      <article className="space-y-4">
        <h1 className="text-lg font-semibold">Product</h1>

        <div className="space-y-2">
          <h3 className="font-semibold">Idea (Max 100-150 words)*</h3>
          <p className="text-sm ">Ideation</p>
        </div>
        <div className="">
          <h3 className="font-semibold">
            What is the problem you are trying to solve? (Max 200-300 words)*
          </h3>
          <p className="text-sm ">Pre-Seed</p>
        </div>
        <div className="">
          <h3 className="font-semibold">
            Market Size/Potential Market Opportunity
          </h3>
          <p className="text-sm ">200 Million</p>
        </div>
        <div className="">
          <h3 className="font-semibold">
            2 Major Competitors (For each competitor: Name, Description in 2
            sentences)*
          </h3>
          <div className="space-y-1">
            <p className="text-sm ">Instagram: Social media with reels</p>
            <p className="text-sm ">
              Facebook: Social media long standing in market
            </p>
          </div>
        </div>
        <div className="">
          <h3 className="font-semibold">Demo Video*</h3>
          <Link
            href="https://google.drive.com"
            className="text-linkBlue text-sm"
          >
            https://google.drive.com
          </Link>
        </div>
        <div className="">
          <h3 className="font-semibold">Pitch Deck*</h3>
          <Link
            href="https://google.drive.com"
            className="text-linkBlue text-sm"
          >
            https://google.drive.com
          </Link>
        </div>
      </article>

      <Separator className="mb-4 mt-4" />

      <article className="space-y-4">
        <h1 className="text-lg font-semibold">Team</h1>

        <div className="space-y-2">
          <h3 className="font-semibold">
            Founders Details (For each founder, in this format: Name, Role,
            About, Linkedin URL)*
          </h3>
          <div className="">
            <p className="text-sm">
              Aditya Jain, CMO, 3rd Year BBA,
              https://www.linkedin.com/in/adityajain19/
            </p>
            <p className="text-sm">
              Facebook: Social media long standing in market
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold">
            Team Size (including both part-time and full-time)*
          </h3>
          <p className="text-sm">3</p>
        </div>
        <div className="sapce-y-2">
          <h3 className="font-semibold">Number of full-time members*</h3>
          <p className="text-sm">3</p>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">
            Number of part-time members (write 0 if not applicable)*
          </h3>
          <p className="text-sm">0</p>
        </div>
      </article>

      <Separator className="mb-4 mt-4" />

      <article className="space-y-4">
        <h1 className="text-lg font-semibold">Other Details</h1>

        <div className="space-y-2">
          <h3 className="font-semibold">DPIIT Recognized</h3>
          <p className="text-sm">Ideation</p>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold">
            Company Registration Date (If applicable)
          </h3>
          <p className="text-sm">11/09/2024</p>
        </div>
      </article>

      <Separator className="mb-4 mt-4" />

      <article className="space-y-4">
        <h1 className="text-lg font-semibold">Contact</h1>

        <div className="">
          <h3 className="font-semibold">Contact Number*</h3>
          <p className="text-sm">+91 123456789</p>
        </div>
        <div className="">
          <h3 className="font-semibold">Contact Email Id*</h3>
          <p className="text-sm">contact@gmail.com</p>
        </div>
      </article>
    </div>
  );
};

export default StartupResume;
