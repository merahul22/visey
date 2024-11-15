"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CaretDown, CaretUp } from "@phosphor-icons/react/dist/ssr";
import { useState, useEffect } from "react";

const faqData = [
  {
    question: "How does Visey reduce my search time for services?",
    answer:
      "Visey simplifies your search by offering a curated marketplace of vetted service providers tailored specifically to startup needs. Instead of searching across multiple platforms, you can find, compare, and connect with the right providers in one place, saving you valuable time and effort.",
  },
  {
    question: "What is Visey, and how does it benefit my business?",
    answer:
      "Visey is a marketplace designed to connect businesses with startups actively seeking services like yours. By joining Visey, you gain access to a targeted audience of startups, allowing you to efficiently generate leads, build partnerships, and grow your customer base. Our platform also provides data-driven insights to help you optimize your marketing strategies and maximize your ROI.",
  },
  {
    question: "Is there a cost to join Visey?",
    answer:
      "Visey is completely free for startups. For businesses, we offer different pricing tiers. There is a free basic tier that allows you to get started, with premium options available that provide enhanced features and benefits, such as advanced analytics, lead generation and higher ranking. You can choose the plan that best aligns with your business goals.",
  },
  {
    question: "What kind of businesses can join Visey?",
    answer:
      "Visey is open to a wide range of businesses that provide essential services to startups, including but not limited to Legal, Financial, Marketing, Tech development, HR, Mentorship, Social Media. If your business supports startups in any capacity, Visey is the ideal platform to reach your target audience.",
  },
  {
    question: "What if I don't find the exact service I need?",
    answer:
      "We are constantly expanding our range of services. If you don't find what you're looking for, you can let us know, and we'll work to bring suitable providers to the platform.",
  },
  {
    question: "How do I connect with potential clients on Visey?",
    answer:
      "Startups can view your profile, explore your services, and reach out directly.",
  },
  {
    question: "How can I leave feedback on a service provider?",
    answer:
      "Startup users can leave reviews and ratings, building transparency and help other users make informed decisions.",
  },
  {
    question: "How does Visey promote my business to startups?",
    answer:
      "Visey's search features and category listings make it easy for startups to discover your services. Premium options may also be available to help boost your profile's visibility.",
  },
];

function FaqSection() {
  const [showAll, setShowAll] = useState(false);
  const [maxHeight, setMaxHeight] = useState("600px");

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  useEffect(() => {
    setMaxHeight(showAll ? "1000px" : "600px");
  }, [showAll]);

  // Show only the first 4 items initially
  const displayedFaqs = showAll ? faqData : faqData.slice(0, 4);

  return (
    <section className="bg-primary-landing">
      <section className="relative mb-10 pt-20 pb-10 text-base-white max-w-screen-xl xl:mx-auto">
        <div className="text-center">
          <p className="text-success-landing text-2xl font-semibold">FAQs</p>
          <h2 className="font-degular font-semibold text-heading4 md:text-heading3 lg:text-heading2 xl:text-heading1 leading-snug">
            Still not Convinced?
          </h2>
          <p className="text-base-black mt-1 text-lg font-medium">
            We&apos;ve got the answers
          </p>
        </div>
        <div className="pt-9 px-4">
          <div
            className={`transition-all duration-500 overflow-hidden`}
            style={{ maxHeight }}
          >
            <Accordion type="single" collapsible className="w-full space-y-4">
              {displayedFaqs.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="px-4 bg-secondary-landing font-semibold rounded-tl-xl rounded-tr-xl border-b-0 text-base">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-4 text-base font-medium">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        <Button
          variant={"landing"}
          size="sm"
          onClick={toggleShowAll}
          className="gap-x-2 text-base-black absolute -bottom-4 left-1/2 -translate-x-1/2 px-8 z-20"
        >
          <span>{showAll ? "Less" : "More"}</span>
          {showAll ? <CaretUp /> : <CaretDown />}
        </Button>
      </section>
    </section>
  );
}

export default FaqSection;