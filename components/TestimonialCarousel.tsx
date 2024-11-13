import * as React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';

interface Testimonial {
  image: string;
  content: string;
}

export function CarouselDemo({ slides }: { slides: Testimonial[] }) {
  return (
    <Carousel className="w-full max-w-xs relative">
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6 ">
                  <div className="flex flex-col gap-8 items-center">
                    <div>
                      <Image
                        src={slide.image}
                        alt="testimonial"
                        height={240}
                        width={280}
                      />
                    </div>
                    <p className="text-center font-medium">{slide.content}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-0 top-full md:top-1/2 md:-left-10" />
      <CarouselNext className="absolute right-0 top-full md:top-1/2 md:-right-10" />
    </Carousel>
  );
}
