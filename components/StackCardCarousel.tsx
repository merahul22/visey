'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import Image from 'next/image';
// import { cn } from '@/lib/utils';

interface Testimonial {
  image: string;
  content: string;
}

const TestimonialCarousel: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      image: '/img/testimonial1.png',
      content: 'An absolute must have for startups and businesses',
    },
    { image: '/img/testimonial1.png', content: 'Testimonial 2' },
    { image: '/img/testimonial1.png', content: 'Testimonial 3' },
    { image: '/img/testimonial1.png', content: 'Testimonial 4' },
    { image: '/img/testimonial1.png', content: 'Testimonial 5' },
  ];

  const [activeIndex, setActiveIndex] = useState<number>(2);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const getOrder = (index: number): number => {
    const diff = index - activeIndex;
    const numItems = testimonials.length;
    if (diff < 0) {
      return numItems + diff;
    }
    return diff;
  };

  const getPosition = (order: number): number => {
    if (order === 0) return 0;
    const direction = order > testimonials.length / 2 ? -1 : 1;
    return direction * (80 * Math.min(order, testimonials.length - order));
  };

  const getScale = (order: number): number => {
    if (order === 0) return 1;
    return Math.max(
      0.85,
      1 - 0.08 * Math.min(order, testimonials.length - order)
    );
  };

  const getZIndex = (order: number): number => {
    if (order === 0) return 5;
    return 5 - Math.min(order, testimonials.length - order);
  };

  const handleDragStart = (): void => {
    setIsDragging(true);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent, info: PanInfo): void => {
    setIsDragging(false);
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    // Consider both displacement and velocity for swipe detection
    const shouldSwipe = Math.abs(offset) > 50 || Math.abs(velocity) > 500;

    if (shouldSwipe) {
      const direction = offset > 0 ? -1 : 1;
      const newIndex =
        (activeIndex + direction + testimonials.length) % testimonials.length;
      setActiveIndex(newIndex);
    }
  };

  return (
    <div className="relative w-full h-96   flex items-center justify-center overflow-hidden">
      <AnimatePresence>
        {testimonials.map((testimonial, index) => {
          const order = getOrder(index);
          const rotateVal = order * 10;
          return (
            <motion.div
              key={testimonial.content}
              // className={cn(
              //   'space-y-4 absolute w-72 h-full bg-[#FDFFF6]  rounded-xl p-6 shadow-lg select-none',
              //   order == 0 && 'bg-[#D7FF7B] cursor-grab active:cursor-grabbing'
              // )}
              style={{
                zIndex: getZIndex(order),
                rotate: `rotate(${rotateVal}deg)`,
              }}
              animate={{
                x: getPosition(order),
                scale: getScale(order),
                opacity: order === 0 ? 1 : 0.8,
              }}
              drag={order === 0 ? 'x' : false}
              dragConstraints={{ left: -100, right: 100 }}
              dragElastic={0.1} // Reduced from default 1
              dragMomentum={false} // Disabled momentum
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              transition={{
                duration: isDragging ? 0 : 0.3,
                type: 'spring',
                stiffness: 150, // Increased from 100
                damping: 25, // Increased from 20
                mass: 0.8, // Added mass for snappier feel
              }}
            >
              <div className="relative h-64 w-full rounded-xl overflow-hidden">
                <Image
                  src={testimonial.image}
                  fill
                  objectFit="cover"
                  alt={testimonial.content}
                />
              </div>
              {order == 0 && (
                <p className="text-center text-base-black">
                  &apos;{testimonial.content}&apos;
                </p>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default TestimonialCarousel;
