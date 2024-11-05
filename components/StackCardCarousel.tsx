'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TestimonialCarousel = () => {
  const testimonials = [
    { id: 1, content: "Testimonial 1", author: "John Doe" },
    { id: 2, content: "Testimonial 2", author: "Jane Smith" },
    { id: 3, content: "Testimonial 3", author: "Alice Johnson" },
    { id: 4, content: "Testimonial 4", author: "Bob Wilson" },
    { id: 5, content: "Testimonial 5", author: "Carol Brown" },
  ];

  const [activeIndex, setActiveIndex] = useState(2);
  const [isDragging, setIsDragging] = useState(false);

  const getOrder = (index) => {
    const diff = index - activeIndex;
    const numItems = testimonials.length;
    if (diff < 0) {
      return numItems + diff;
    }
    return diff;
  };

  const getPosition = (order) => {
    if (order === 0) return 0;
    const direction = order > testimonials.length / 2 ? -1 : 1;
    return direction * (80 * Math.min(order, testimonials.length - order));
  };

  const getScale = (order) => {
    if (order === 0) return 1;
    return Math.max(0.85, 1 - 0.08 * Math.min(order, testimonials.length - order));
  };

  const getZIndex = (order) => {
    if (order === 0) return 5;
    return 5 - Math.min(order, testimonials.length - order);
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (_, info) => {
    setIsDragging(false);
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    // Consider both displacement and velocity for swipe detection
    const shouldSwipe = Math.abs(offset) > 50 || Math.abs(velocity) > 500;

    if (shouldSwipe) {
      const direction = offset > 0 ? -1 : 1;
      const newIndex = (activeIndex + direction + testimonials.length) % testimonials.length;
      setActiveIndex(newIndex);
    }
  };

  return (
    <div className="relative w-full h-96 flex items-center justify-center overflow-hidden">
      <AnimatePresence>
        {testimonials.map((testimonial, index) => {
          const order = getOrder(index);
          return (
            <motion.div
              key={testimonial.id}
              className={`absolute w-64 bg-white rounded-lg p-6 shadow-lg select-none
                ${order === 0 ? 'cursor-grab active:cursor-grabbing' : ''}`}
              style={{ 
                zIndex: getZIndex(order),
              }}
              animate={{
                x: getPosition(order),
                scale: getScale(order),
                opacity: order === 0 ? 1 : 0.8,
              }}
              drag={order === 0 ? "x" : false}
              dragConstraints={{ left: -100, right: 100 }}
              dragElastic={0.1}  // Reduced from default 1
              dragMomentum={false}  // Disabled momentum
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              transition={{
                duration: isDragging ? 0 : 0.3,
                type: "spring",
                stiffness: 150,  // Increased from 100
                damping: 25,     // Increased from 20
                mass: 0.8       // Added mass for snappier feel
              }}
            >
              <p className="text-gray-800 mb-4">{testimonial.content}</p>
              <p className="text-gray-600 font-medium">{testimonial.author}</p>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default TestimonialCarousel;