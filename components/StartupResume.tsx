"use client";

import { Separator } from "@/components/ui/separator";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { Startup } from "@prisma/client";

const StartupResume = ({ startup }: { startup: Startup | null }) => {
  const date = new Date(startup?.registrationDate as Date);

  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="p-6">
      <div className="">
        <h1 className="text-xl mb-4">Startup Resume</h1>
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div>
            <Image
              src={
                startup?.image ||
                "https://res.cloudinary.com/dlriuadjv/image/upload/v1729353205/xbbb0zw6js60dxnq64qj.png"
              }
              height={150}
              width={150}
              alt="Profile Photo"
              className="rounded-full"
            />
          </div>

          <div className="flex flex-col gap-y-4 items-start">
            <div className="flex flex-col items-start">
              <h3 className="flex justify-center gap-x-2 ">
                <span>{startup?.name}</span>
                <Image
                  src="/img/badge.png"
                  height={24}
                  width={24}
                  alt="badge"
                />
              </h3>
              <p className="text-linkBlue text-sm">
                {startup?.registeredName || "N/A"}
              </p>
              <p className="text-sm">{startup?.description || "N/A"}</p>
            </div>
            <div className="flex gap-x-2">
              <Button
                variant="outline"
                size="sm"
                className="py-1.5 rounded-full"
              >
                {startup?.industry || "N/A"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="py-1.5 rounded-full"
              >
                {startup?.sector || "N/A"}
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
          <Link
            href={startup?.websiteUrl || "#"}
            className="text-linkBlue text-sm"
          >
            {startup?.websiteUrl || "N/A"}
          </Link>
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-semibold">Progress</h1>

          <div className="">
            <h3 className="font-semibold">Startup Product Stage</h3>
            <p className="text-sm ">{startup?.productStage || "N/A"}</p>
          </div>
          <div className="">
            <h3 className="font-semibold">Startup Funding Stage</h3>
            <p className="text-sm ">{startup?.fundingStage || "N/A"}</p>
          </div>
          <div className="">
            <h3 className="font-semibold">TRL Level</h3>
            <p className="text-sm ">{startup?.trlLevel || "N/A"}</p>
          </div>
        </div>
      </article>

      <Separator className="mt-4 mb-4" />

      <article className="space-y-4">
        <h1 className="text-lg font-semibold">Product</h1>

        <div className="space-y-2">
          <h3 className="font-semibold">Idea (Max 100-150 words)</h3>
          <p className="text-sm ">{startup?.idea || "N/A"}</p>
        </div>
        <div className="">
          <h3 className="font-semibold">
            What is the problem you are trying to solve? (Max 200-300 words)
          </h3>
          <p className="text-sm ">{startup?.problem || "N/A"}</p>
        </div>
        <div className="">
          <h3 className="font-semibold">
            Market Size/Potential Market Opportunity
          </h3>
          <p className="text-sm ">{startup?.marketSize || "N/A"}</p>
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
          <h3 className="font-semibold">Demo Video</h3>
          <Link
            href="https://google.drive.com"
            className="text-linkBlue text-sm"
          >
            {startup?.demoVideoUrl || "N/A"}
          </Link>
        </div>
        <div className="">
          <h3 className="font-semibold">Pitch Deck</h3>
          <Link
            href="https://google.drive.com"
            className="text-linkBlue text-sm"
          >
            {startup?.pitchDeckUrl || "N/A"}
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
            <p className="text-sm">{startup?.foundersDetail || "N/A"}</p>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold">
            Team Size (including both part-time and full-time)
          </h3>
          <p className="text-sm">{startup?.teamSize || "N/A"}</p>
        </div>
        <div className="sapce-y-2">
          <h3 className="font-semibold">Number of full-time members</h3>
          <p className="text-sm">{startup?.noOfFte || "N/A"}</p>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">
            Number of part-time members (write 0 if not applicable)
          </h3>
          <p className="text-sm">{startup?.noOfInterns || "N/A"}</p>
        </div>
      </article>

      <Separator className="mb-4 mt-4" />

      <article className="space-y-4">
        <h1 className="text-lg font-semibold">Other Details</h1>

        <div className="space-y-2">
          <h3 className="font-semibold">DPIIT Recognized</h3>
          <p className="text-sm">{startup?.dpiitRecognized ? "Yes" : "No"}</p>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold">
            Company Registration Date (If applicable)
          </h3>
          <p className="text-sm">{formattedDate || "N/A"}</p>
        </div>
      </article>

      <Separator className="mb-4 mt-4" />

      <article className="space-y-4">
        <h1 className="text-lg font-semibold">Contact</h1>

        <div className="">
          <h3 className="font-semibold">Contact Number</h3>
          <p className="text-sm">{startup?.contactNumber || "N/A"}</p>
        </div>
        <div className="">
          <h3 className="font-semibold">Contact Email Id</h3>
          <p className="text-sm">{startup?.email || "N/A"}</p>
        </div>
      </article>
    </div>
  );
};

export default StartupResume;
