"use client";

import Image from 'next/image';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { testimonials } from './data';
import useEmblaCarousel from 'embla-carousel-react';
import { type EmblaCarouselType } from 'embla-carousel';

export default function TestimonialsCarousel() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'center',
    slidesToScroll: 1
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  // Detect screen size for responsive design
  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 640);
    setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // Track the active slide
  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect(emblaApi);
    emblaApi.on('select', () => onSelect(emblaApi));
    emblaApi.on('reInit', () => onSelect(emblaApi));

    return () => {
      emblaApi.off('select', () => onSelect(emblaApi));
      emblaApi.off('reInit', () => onSelect(emblaApi));
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className={`flex-[0_0_100%] min-w-0 pl-4 md:flex-[0_0_50%] lg:flex-[0_0_33.333%] ${isMobile ? 'basis-full' : ''}`}
            >
              <div className="p-1">
                <Card className={`${selectedIndex === index ? 'bg-[#eaffb9] border-[#d7ff7a]' : 'bg-[#fdfff6] border-[#8ed023]'} border-2 h-full shadow-md transition-all duration-300 hover:shadow-lg`}>                <CardContent className="flex flex-col h-full p-6">
                  <div className="flex-grow mb-4">
                    <p className="text-base text-gray-700 italic leading-relaxed">
                      {testimonial.quote}
                    </p>
                  </div>
                  
                  <div className="flex items-center mt-auto pt-4 border-t border-gray-100">
                    <Avatar className="h-12 w-12 border-2 border-[#8ed023]">
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="ml-3">
                      <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                      <p className="text-xs text-gray-500">{testimonial.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center mt-8 gap-4">
        <button 
          onClick={() => emblaApi?.scrollPrev()} 
          className="h-10 w-10 flex items-center justify-center rounded-full border-2 border-[#8ed023] bg-white hover:bg-[#eaffb9] transition-all"
          aria-label="Previous"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="#535353" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button 
          onClick={() => emblaApi?.scrollNext()} 
          className="h-10 w-10 flex items-center justify-center rounded-full border-2 border-[#8ed023] bg-white hover:bg-[#eaffb9] transition-all"
          aria-label="Next"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 6L15 12L9 18" stroke="#535353" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
