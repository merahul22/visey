"use client";

import React from "react";

// Define recognition items
const recognitionImages = [
  { src: "/recognitions/image-33.png", height: "h-[73px]", alt: "Recognition" },
  { src: "/recognitions/image-31.png", height: "h-[75px]", alt: "Recognition" },
  { src: "/recognitions/image-23.png", height: "h-[27px]", alt: "Recognition" },
  { src: "/whatsapp-image-2025-05-07-at-00-41-49-6045e179-2.png", height: "h-[60px]", alt: "Whatsapp image" },
  { src: "/recognitions/image-24.png", height: "h-[70px]", alt: "Recognition" },
  { src: "/recognitions/image-25.png", height: "h-[72px]", alt: "Recognition" },
  { src: "/recognitions/image-26.png", height: "h-[75px]", alt: "Recognition" },
  { src: "/recognitions/image-27.png", height: "h-[70px]", alt: "Recognition" },
  { src: "/recognitions/image-32.png", height: "h-[72px]", alt: "Recognition" },
  { src: "/recognitions/image-22.png", height: "h-[49px]", alt: "Recognition" },
];

export function RecognitionsList() {
  return (
    <div className="relative w-full py-8 bg-white shadow-[0px_0px_40.1px_#00000029]">
      <h3 className="text-center [font-family:'Degular_Display-SemiBold',Helvetica] font-semibold text-[#1e1e1e] text-[32px] tracking-[-0.70px] leading-[38.4px] mb-8">
        Recognitions &amp; Features
      </h3>
      
      <div className="relative w-full overflow-hidden">
        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-200px * ${recognitionImages.length}));
            }
          }
          .animate-scroll {
            animation: scroll 40s linear infinite;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>
        <div className="flex animate-scroll items-center">
          {[...recognitionImages, ...recognitionImages].map((img, index) => (
            <div key={index} className="relative flex items-center justify-center shrink-0 mx-8">
              <img
                className={`${img.height} w-auto object-contain opacity-80 hover:opacity-100 transition-all transform hover:scale-105 duration-300`}
                alt={img.alt}
                src={img.src}
                style={{
                  maxWidth: '180px'
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// This is a non-scrolling version that can be used as a fallback
export function RecognitionsListStatic() {
  return (
    <div className="relative w-full py-8 bg-white shadow-[0px_0px_40.1px_#00000029]">
      <h3 className="text-center [font-family:'Degular_Display-SemiBold',Helvetica] font-semibold text-[#1e1e1e] text-[32px] tracking-[-0.70px] leading-[38.4px] mb-8">
        Recognitions &amp; Features
      </h3>
      
      <div className="flex flex-wrap justify-center items-center gap-4 px-4 overflow-hidden">
        {recognitionImages.map((img, index) => (
          <div key={index} className="flex-shrink-0 mx-4">
            <img
              className={`${img.height} object-contain`}
              alt={img.alt}
              src={img.src}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
