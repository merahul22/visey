"use client";

import { QuestionMarkIcon } from "@radix-ui/react-icons";
import { useState, useEffect, useRef } from "react";

const HelpAndSupport = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close overlay when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsHovered(false); // Close overlay if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div className="relative" ref={ref}>
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center bg-neutrals-1000 cursor-pointer z-10 fixed right-8 bottom-20 md:bottom-8"
        onClick={() => setIsHovered((prev) => !prev)}
      >
        <QuestionMarkIcon className="w-6 h-6 text-base-white" />
        {isHovered && (
          <div className="absolute right-14 bottom-0 p-1 rounded-lg shadow-lg w-[236px] h-[96px] bg-neutrals-1000 text-base-white">
            <div className="flex items-center w-[228px] h-[40px]">
              <div className="text-primary ml-4 mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
              </div>
              <p>contact@visey.co.in</p>
            </div>
            <div className="flex items-center gap-1 w-[228px] h-[40px]">
              <div className="text-primary ml-4 mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                  />
                </svg>
              </div>
              <p>+91 78275 86754</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpAndSupport;
