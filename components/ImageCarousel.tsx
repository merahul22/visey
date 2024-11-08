'use client';

import Image from 'next/image';
import React, { useState } from 'react';

export function ImageCarousel() {
  const [activeIndex, setActiveIndex] = useState(2);

  const slides = [
    {
      image: '/api/placeholder/400/300',
      caption: 'First slide',
    },
    {
      image: '/api/placeholder/400/300',
      caption: 'Second slide',
    },
    {
      image: '/api/placeholder/400/300',
      caption: 'An absolute must have for startups and businesses',
    },
    {
      image: '/api/placeholder/400/300',
      caption: 'Fourth slide',
    },
    {
      image: '/api/placeholder/400/300',
      caption: 'Fifth slide',
    },
  ];

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative pt-12 pb-8">
      {/* Cards Stack */}
      <div className="relative h-80 w-full">
        {slides.map((slide, index) => {
          const offset = index - activeIndex;
          const isActive = index === activeIndex;

          let transform = '';
          // const rotation = '';
          const zIndex = slides.length - Math.abs(offset);
          let opacity = 1;

          if (offset < 0) {
            transform = `translateX(-${Math.abs(offset) * 10}%) scale(${
              1 - Math.abs(offset) * 0.1
            })`;
            opacity = 1 - Math.abs(offset) * 0.5;
            // rotation = `rotate(${offset * 5}deg)`;
          } else if (offset > 0) {
            transform = `translateX(${offset * 10}%) scale(${
              1 - Math.abs(offset) * 0.1
            })`;
            opacity = 1 - Math.abs(offset) * 0.5;
            // rotation = `rotate(${offset * 5}deg)`
          }

          return (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full transition-all duration-300 ease-in-out
                         ${isActive ? 'shadow-lg' : 'shadow-md'}`}
              style={{
                transform,
                zIndex,
                opacity,
              }}
            >
              <div className="bg-white rounded-lg p-4 mx-auto w-4/5">
                <div className="w-full h-48 object-cover rounded-lg mb-4">
                  <Image
                    src={slide.image}
                    alt={`Slide ${index + 1}`}
                    fill
                    objectFit="cover"
                  />
                </div>
                <p className="text-center text-sm text-gray-600">
                  {slide.caption}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300
                       ${
                         activeIndex === index
                           ? 'bg-blue-500 w-4'
                           : 'bg-gray-300'
                       }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
