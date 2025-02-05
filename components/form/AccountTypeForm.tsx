"use client";

import { CheckIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import { selectType } from "@/actions/select-type";
import { useRouter } from "next/navigation";

const AccountTypeForm = () => {
  const [currentType, setCurrentType] = useState<string>("");
  const [loading, startTransition] = useTransition();
  const router = useRouter();

  const onSubmit = () => {
    startTransition(async () => {
      const res = await selectType(
        currentType === "STARTUP" ? "STARTUP" : "BUSINESS",
      );

      if (res.success) {
        if (currentType === "STARTUP") {
          router.push("/list-preferences");
        } else {
          router.push("/list-business");
        }
      }
    });
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="lg:w-[540px] w-[320px]">
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-center">Sign Up Type</h1>
          <p className="text-sm text-neutrals-600 text-center">
            Select account type
          </p>
        </div>
        <div className="mt-4 space-y-4">
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center gap-4 lg:items-stretch lg:flex-row">
              <div
                className={`border-2 w-[220px] border-neutrals-400 rounded-lg p-4 cursor-pointer hover:border-primary-500 ${
                  currentType === "BUSINESS"
                    ? "border-primary-500 shadow-lg"
                    : ""
                }`}
                onClick={() => setCurrentType("BUSINESS")}
              >
                <h2 className="text-xl font-semibold mb-4">
                  List my Business, to reach startups
                </h2>
                <ul className="text-sm text-neutrals-500 flex flex-col gap-2">
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-5 h-5" />
                    Find Clients
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-5 h-5" />
                    Greater Visibility
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-5 h-5" />
                    Generate Leads
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-5 h-5" />
                    List Opportunities
                  </li>
                </ul>
              </div>
              <div
                className={`border-2 w-[220px] border-neutrals-400 rounded-lg p-4 cursor-pointer hover:border-primary-500 ${
                  currentType === "STARTUP"
                    ? "border-primary-500 shadow-lg"
                    : ""
                }`}
                onClick={() => setCurrentType("STARTUP")}
              >
                <h2 className="text-xl font-semibold mb-4">
                  Find Resources, for my needs
                </h2>
                <ul className="text-sm text-neutrals-500 flex flex-col gap-2">
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-5 h-5" />
                    Find Responses Quickly
                  </li>
                  <li className="flex items-center gap-2">
                    <div>
                      <CheckIcon className="w-5 h-5" />
                    </div>
                    Get Personalized Recommendations
                  </li>
                  <li className="flex items-center gap-2">
                    <div>
                      <CheckIcon className="w-5 h-5" />
                    </div>
                    Create your Startup&apos;s Resume
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Button className="w-full mt-8" onClick={onSubmit} disabled={loading}>
          Continue
        </Button>
      </div>
    </div>
  );
};
export default AccountTypeForm;
