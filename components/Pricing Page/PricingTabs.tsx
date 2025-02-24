"use client";
import { useState } from "react";

interface PricingTabsProps {
  onTabChange: (tab: "startups" | "providers") => void;
}

export const PricingTabs = ({ onTabChange }: PricingTabsProps) => {
  const [activeTab, setActiveTab] = useState<"startups" | "providers">(
    "providers"
  );

  const handleTabClick = (tab: "startups" | "providers") => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <nav className="flex items-start self-center p-1 text-sm font-semibold text-center bg-white">
      <div className="flex gap-6 items-center p-1 min-w-60">
        <button
          onClick={() => handleTabClick("startups")}
          className={`gap-1.5 self-stretch px-2.5 py-1 my-auto rounded-[1000px] ${
            activeTab === "startups"
              ? "bg-red-100 border-b border-black text-stone-900"
              : "text-neutral-500"
          }`}
        >
          For Startups
        </button>
        <button
          onClick={() => handleTabClick("providers")}
          className={`gap-1.5 self-stretch px-2.5 py-1 my-auto rounded-[1000px] ${
            activeTab === "providers"
              ? "bg-red-100 border-b border-black text-stone-900"
              : "text-neutral-500"
          }`}
        >
          For Resource Providers
        </button>
      </div>
    </nav>
  );
};
