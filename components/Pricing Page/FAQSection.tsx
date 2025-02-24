"use client";
import { useState } from "react";
import Image from "next/image"; // Import Image from next/image

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
}

export const FAQSection = ({ faqs }: FAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="flex flex-col py-3 mt-10 w-full rounded-2xl">
      <h2 className="text-base font-semibold leading-tight text-center text-stone-900">
        FAQs
      </h2>
      <div className="self-center mt-6 max-w-[800px] w-[800px] max-md:max-w-full">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="flex overflow-hidden items-start p-2 w-full bg-white rounded-lg border border-red-200 border-solid min-w-[324px] shadow-[0px_0px_4px_rgba(110,110,110,0.2)] mt-3 first:mt-0"
          >
            <div className="flex-1 shrink w-full rounded basis-0 min-w-60">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex flex-wrap justify-between items-center px-6 py-3 w-full bg-white min-h-10 rounded-[1000px]"
              >
                <span className="flex-1 shrink self-stretch my-auto text-base leading-tight basis-0 text-stone-900 text-left">
                  {faq.question}
                </span>
                <div className="flex justify-center items-center self-stretch my-auto w-4 min-h-4 rounded-[1000px]">
                  <Image
                    src="/img/pricingPage.png"
                    alt={openIndex === index ? "Collapse" : "Expand"}
                    width={16}
                    height={16}
                    className="object-contain self-stretch my-auto w-4 aspect-square"
                  />
                </div>
              </button>
              {openIndex === index && (
                <div className="px-6 py-3 text-base text-stone-900">
                  {faq.answer}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
