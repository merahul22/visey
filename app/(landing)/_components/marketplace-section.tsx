"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Funnel,
  Command,
  Aperture,
} from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const cardData = [
  {
    title: "Get your first funding & more",
    description:
      "Grants, Equity Investments, Founder fellowship and Loans for your business",
  },
  {
    title: "Build your team",
    description:
      "CTO, accounting, marketing & more, we’ll help you find the right match in seconds",
  },
  {
    title: "Get investor ready startup resume",
    description:
      "Effortless document creation and sharing",
  },
];

const features = [
  {
    title: "Find Free",
    subtitle: "Resources in 3-clicks",
  },
  {
    title: "Connect",
    subtitle: "With Resource Providers that offer what you need",
  },
  {
    title: "Rate & Review",
    subtitle: "Your experience",
  },
];

function MarketplaceSection() {
  // Intersection Observer hook
  const { ref: statsRef, inView: statsInView } = useInView({
    threshold: 0, // Trigger when 30% of the section is visible
    triggerOnce: true, // Animate only once
  });

  // Days counter logic
  const [daysFromStart, setDaysFromStart] = useState(0);

  useEffect(() => {
    const calculateDays = () => {
      const startDate = new Date("2024-11-14"); // Start date
      const today = new Date(); // Today's date
      const differenceInTime = today.getTime() - startDate.getTime(); // Difference in milliseconds
      const daysDifference = Math.floor(
        differenceInTime / (1000 * 60 * 60 * 24),
      ); // Convert to days
      setDaysFromStart(daysDifference);
    };

    calculateDays();

    // Update daily at midnight
    const interval = setInterval(
      () => {
        calculateDays();
      },
      1000 * 60 * 60 * 24,
    ); // 24 hours

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const stats = [
    {
      value: daysFromStart, // Dynamically calculate days
      subtitle: "Days",
    },
    {
      value: 567,
      subtitle: "Active Users",
    },
    {
      value: 825,
      subtitle: "Resources Providers Listed",
    },
  ];

  return (
    <section
      className="relative w-full"
      aria-labelledby="marketplace-heading"
      ref={statsRef}
    >
      {/* Top wave - full width */}
      <div
        className="absolute inset-x-0 top-0 w-full h-[250px] md:h-[200px] lg:h-[300px] opacity-60"
        aria-hidden="true"
      >
        <Image
          src="/numberwave.svg"
          fill
          className="object-cover object-left"
          alt="Background wave image"
          loading="lazy"
        />
      </div>

      {/* Content container with max-width */}
      <div className="relative max-w-screen-xl mx-auto px-4 py-9 md:py-14 lg:py-20">
        {/* Stats section */}
        <div className="relative z-10 space-y-6 text-center sm:flex sm:space-y-0 sm:justify-between">
          {stats.map((stat, index) => (
            <div key={index} className="flex-grow space-y-1">
              <p className="font-degular text-heading4 lg:text-heading3 xl:text-heading2">
                {statsInView ? (
                  <>
                    <CountUp
                      start={0}
                      end={stat.value}
                      duration={2}
                      separator=","
                    />
                    {stat.subtitle === "Hours saved" && "h+"}
                    {stat.subtitle === "Businesses Listed" && "+"}
                  </>
                ) : (
                  0
                )}
              </p>
              <p className="text-xl lg:text-hero text-primary font-medium">
                {stat.subtitle}
              </p>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="pt-9 md:pt-16 lg:pt-24 xl:pt-24 space-y-9 md:space-y-14 xl:space-y-20">
          {/* Heading and Subheading */}
          <div className="space-y-4 text-center md:space-y-4">
            <h2
              id="marketplace-heading"
              className="font-degular font-semibold text-heading4 md:text-heading3 lg:text-heading2 xl:text-heading1 leading-snug"
            >
              India&#39;s First Marketplace for Startups to Find Resource
              Providers.
              {/* India&apos;s First Marketplace for Startups to Find Resource Providers */}
            </h2>
            <p className="font-gothic font-medium text-lg">
              Discover all business solutions for your startup needs in{" "}
              <span className="font-bold">one trusted destination</span> with
              visey.
            </p>
          </div>

          {/* Cards Section */}
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-stretch">
            {cardData.map((data, idx) => (
              <div
                key={data.title}
                className="relative z-10 p-10 rounded-2xl space-y-6 bg-primary-landing-light text-base-white w-10/12 h-[286px] md:h-auto"
              >
                <div className="p-2 rounded-full inline-flex justify-center items-center bg-success-landing">
                  {idx === 0 && <Funnel size={36} className="text-[#709B08]" />}
                  {idx === 1 && (
                    <Aperture size={36} className="text-[#709B08]" />
                  )}
                  {idx === 2 && (
                    <Command size={36} className="text-[#709B08]" />
                  )}
                </div>
                <div className="space-y-2">
                  <h3 className="font-degular font-medium text-hero">
                    {data.title}
                  </h3>
                  <p className="font-gothic">{data.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Features Section */}
          <div className="flex flex-col items-center">
            <h3 className="font-degular font-semibold text-2xl text-center text-feature md:text-3xl lg:text-heading3">
              Find the right resources in seconds, not hours.
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center w-full py-9 md:pt-14 md:pb-12 lg:pt-16">
              {features.map((feat) => (
                <div key={feat.title} className="flex flex-col items-center">
                  <p className="font-degular text-heading4 text-primary">
                    {feat.title}
                  </p>
                  <p className="font-gothic font-medium text-lg">
                    {feat.subtitle}
                  </p>
                </div>
              ))}
            </div>

            {/* Call-to-Action */}
            <Button
              variant="landing"
              className="py-2.5 px-10 text-xl relative z-10"
            >
              <Link href="/login">
                <span className="flex items-center gap-x-3">
                  <span>Start Now</span>
                  <ArrowUpRight weight="bold" />
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom wave - full width */}
      <div
        className="absolute left-0 bottom-0 w-full h-[400px] md:h-[850px]"
        aria-hidden="true"
      >
        <Image
          src="/cards-bg.png"
          fill
          className="object-contain opacity-40"
          alt="Background wave image"
          loading="lazy"
        />
      </div>
    </section>
  );
}

export default MarketplaceSection;
