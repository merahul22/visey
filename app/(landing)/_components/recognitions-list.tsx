"use client";

import React, { useEffect, useRef } from "react";

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

// Triple the items to create a seamless loop effect with plenty of content
const allImages = [...recognitionImages, ...recognitionImages, ...recognitionImages];

export function RecognitionsList() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    const speed = 20; // pixels per second - slow but visible
    let lastTime: number | null = null;

    const animate = (currentTime: number) => {
      if (lastTime === null) {
        lastTime = currentTime;
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const timeElapsed = currentTime - lastTime; // time in ms
      const scrollAmount = (speed * timeElapsed) / 1000;
      
      // Move scroll position and loop when needed
      if (scrollContainer.scrollLeft + scrollAmount >= scrollContainer.scrollWidth / 3) {
        // If we've scrolled through the first set, jump back to beginning
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += scrollAmount;
      }
      
      lastTime = currentTime;
      animationFrameId = requestAnimationFrame(animate);
    };

    // Initial scroll position at 0
    scrollContainer.scrollLeft = 0;
    
    // Start animation
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div className="relative w-full py-8 bg-white shadow-[0px_0px_40.1px_#00000029]">
      <h3 className="text-center [font-family:'Degular_Display-SemiBold',Helvetica] font-semibold text-[#1e1e1e] text-[32px] tracking-[-0.70px] leading-[38.4px] mb-8">
        Recognitions &amp; Features
      </h3>
      
      <div className="relative w-full overflow-hidden">
        <div 
          ref={scrollRef}
          className="flex items-center py-4 overflow-hidden whitespace-nowrap"
        >
          {allImages.map((img, index) => (
            <div key={index} className="flex-shrink-0 mx-8">
              <img
                className={`${img.height} object-contain`}
                alt={img.alt}
                src={img.src}
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
