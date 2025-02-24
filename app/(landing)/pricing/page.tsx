"use client";
import { useState } from "react";
import { PricingHeader } from "@/components/Pricing Page/PricingHeader";
import { PricingTabs } from "@/components/Pricing Page/PricingTabs";
import { PricingCard } from "@/components/Pricing Page/PricingCard";
import { PromotionalBanner } from "@/components/Pricing Page/PromotionalBanner";
import { FAQSection } from "@/components/Pricing Page/FAQSection";
import { PricingPlan } from "@/components/Pricing Page/types"; // Import the PricingPlan type

const resourceProviderPlans: PricingPlan[] = [
  {
    title: "Starter Pack",
    price: "2999",
    duration: "mo",
    features: [
      "I) Generate leads per month",
      "II) Suggestive analytics",
      "III) Silver verification",
    ],
  },
  {
    title: "Booster Pack",
    price: "6559",
    duration: "mo",
    features: [
      "I) Generate leads per month",
      "II) Suggestive analytics",
      "III) Audience targeting engine",
      "IV) Golden Verification",
    ],
  },
  {
    title: "Growth Pack",
    price: "11999",
    duration: "mo",
    features: [
      "I) Generate leads per month",
      "II) Suggestive analytics",
      "III) Audience targeting engine",
      "IV) Visey Assured certification",
      "V) Personalized Profile consultation",
    ],
  },
  {
    title: "Custom Pack",
    price: "",
    duration: "",
    isCustom: true,
    features: [
      "Get the greatness of Growth Pack, customized to your business needs.",
    ],
  },
];

const startupPlans: PricingPlan[] = [
  {
    title: "Free Plan",
    price: "0",
    duration: "mo",
    features: [
      "I) Access to basic features",
      "II) Community support",
      "III) Limited analytics",
    ],
  },
];

const promoteFeatures = [
  "Increase Visibility",
  "Generate Leads",
  "Rank Higher",
];

const adsFeatures = ["More Responses", "More Visibility", "Rank Higher"];

const faqs1 = [
  {
    question: "Q1. What is the Starter Pack?",
    answer: "The Starter Pack includes generating leads per month, suggestive analytics, and silver verification.",
  },
  {
    question: "Q2. What is the Booster Pack?",
    answer: "The Booster Pack includes generating leads per month, suggestive analytics, audience targeting engine, and golden verification.",
  },
  {
    question: "Q3. What is the Growth Pack?",
    answer: "The Growth Pack includes generating leads per month, suggestive analytics, audience targeting engine, Visey Assured certification, and personalized profile consultation.",
  },
  {
    question: "Q4. What is the Custom Pack?",
    answer: "The Custom Pack includes the greatness of the Growth Pack, customized to your business needs.",
  },
];

const faqs2 = [
  {
    question: "Q1. What is Visey Ads?",
    answer: "Visey Ads allows you to run ads for your funding opportunities and create targeted ad campaigns to get more responses.",
  },
  {
    question: "Q2. What is the Trial Pack?",
    answer: "The Trial Pack includes better visibility, reaching the target audience, and higher registration chances for 7 days.",
  },
  {
    question: "Q3. What is the Budget Pack?",
    answer: "The Budget Pack includes better visibility, reaching the target audience, higher registration chances, and 2 complementary days (10+2) for 12 days.",
  },
  {
    question: "Q4. What is the Take-off Pack?",
    answer: "The Take-off Pack includes better visibility, reaching the target audience, higher registration chances, and 4 complementary days (21+4) for 25 days.",
  },
];

const PricingPage = () => {
  const [activeTab, setActiveTab] = useState<"startups" | "providers">(
    "providers"
  );

  const plans = activeTab === "providers" ? resourceProviderPlans : startupPlans;

  return (
    <main className="p-8">
      <PricingHeader />

      <section className="mt-16 w-full max-md:mt-10 max-md:max-w-full">
        <div className="pb-3 w-full max-md:max-w-full">
          <div className="flex flex-col py-3 w-full leading-tight rounded-2xl max-md:max-w-full">
            <PricingTabs onTabChange={setActiveTab} />

            <div className="flex flex-wrap gap-4 justify-center items-stretch px-3 mt-4 w-full rounded max-md:max-w-full">
              {activeTab === "providers" ? (
                resourceProviderPlans.map((plan, index) => (
                  <PricingCard
                    key={index}
                    title={plan.title}
                    price={plan.price || ""}
                    duration={plan.duration || ""}
                    features={plan.features}
                    isCustom={plan.isCustom}
                  />
                ))
              ) : (
                <article className="flex flex-col py-3 leading-tight text-center text-black rounded-2xl">
                  <figure className="self-center">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/85ade60a2b3dfb2d98e1511de49f84b979df07f0b52446d009f0603f03f075a2?placeholderIfAbsent=true&apiKey=0a8470b31f9346658a7b5208415b7acf"
                      alt="No charges illustration"
                      className="object-contain w-56 max-w-full aspect-square"
                    />
                  </figure>
                  <section className="flex flex-col gap-4 mt-4">
                    <h2 className="text-2xl font-bold max-md:max-w-full">
                      No charges
                    </h2>
                    <p className="text-base max-md:max-w-full">
                      We don't charge our entrepreneurs. If you're here to find resources for
                      your business, Visey is here to support your big dreams.
                    </p>
                  </section>
                </article>
              )}
            </div>
          </div>

          <PromotionalBanner
            title="3 Months Plan"
            subtitle="Generate Leads & Rank Higher"
            features={promoteFeatures}
            imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/84976f49773782b71f586ff76544e114f10499c890b7f7b18e13e4b980093619?placeholderIfAbsent=true"
            badgeText="Promote"
            badgeColor="bg-pink-400 bg-opacity-30"
            buttonText="Promote Business for Rs 9/day"
          />

          <FAQSection faqs={faqs1} /> {/* First FAQ section */}

          <div className="mt-10 text-sm leading-tight text-center text-sky-700">
            <a href="#" className="underline text-[rgba(0,92,192,1)]">
              View Terms & Conditions
            </a>
          </div>
        </div>
      </section>

      <section className="mt-16 w-full max-md:mt-10 max-md:max-w-full">
        <header className="w-full leading-snug text-center text-black">
          <h2 className="text-3xl font-bold">
            Visey Ads: Run ads for your funding opportunities
          </h2>
          <p className="mt-3 text-xl font-medium">
            Create targeted ad campaigns and get more responses
          </p>
        </header>

        <div className="pb-3 mt-14 w-full max-md:mt-10">
          <div className="flex flex-col py-3 w-full leading-tight rounded-2xl">
            <nav className="flex items-start self-center p-1 text-sm font-semibold text-center bg-white text-stone-900">
              <div className="flex gap-6 items-center p-1">
                <span className="gap-1.5 self-stretch px-2.5 py-1 my-auto bg-red-100 border-b border-black min-h-[25px] rounded-[1000px]">
                  For Resource Providers
                </span>
              </div>
            </nav>

            <div className="flex flex-col justify-center py-3 mt-4 w-full rounded-2xl">
              <div className="flex flex-wrap gap-4 justify-center items-stretch w-full rounded">
                <PricingCard
                  title="Trial Pack"
                  price="59"
                  duration="7 days"
                  features={[
                    "I) Better Visibility",
                    "II) Reach Target Audience",
                    "III) Higher Registration Chances",
                  ]}
                  borderColor="border-purple-500"
                  titleColor="text-purple-600"
                />
                <PricingCard
                  title="Budget Pack"
                  price="79"
                  duration="12 days"
                  features={[
                    "I) Better Visibility",
                    "II) Reach Target Audience",
                    "III) Higher Registration Chances",
                    "IV) 2 Complementary Days (10+2)",
                  ]}
                  borderColor="border-purple-500"
                  titleColor="text-purple-600"
                />
                <PricingCard
                  title="Take-off pack"
                  price="179"
                  duration="25 days"
                  features={[
                    "I) Better Visibility",
                    "II) Reach Target Audience",
                    "III) Higher Registration Chances",
                    "IV) 4 Complementary Days (21+4)",
                  ]}
                  borderColor="border-purple-500"
                  titleColor="text-purple-600"
                />
              </div>
            </div>
          </div>

          <PromotionalBanner
            title="10 Days + 2 Free"
            subtitle="Effectively reach your target audience"
            features={adsFeatures}
            imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/84976f49773782b71f586ff76544e114f10499c890b7f7b18e13e4b980093619?placeholderIfAbsent=true"
            badgeText="Ads"
            badgeColor="bg-orange-400 bg-opacity-50"
            buttonText="Run Ad"
            lowerBgColor="bg-[#ffead4]" // Pass the new background color value
            buttonWidth="w-3/4" // Reduce the button width
          />

          <FAQSection faqs={faqs2} /> {/* Second FAQ section */}

          <div className="mt-10 text-sm leading-tight text-center text-sky-700">
            <a href="#" className="underline text-[rgba(0,92,192,1)]">
              View Terms & Conditions
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PricingPage;