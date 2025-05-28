"use client";

import * as React from "react";
import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
}

export function ImageGallery({ images }: { images: string[] }) {
  return (
    <div className="flex justify-center gap-4">
      {images.slice(0, 4).map((src, index) => (
        <article
          key={index}
          className="flex flex-col justify-center items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
        >
          <div className="w-24 h-24 flex items-center justify-center">
            <Image
              src={src}
              alt={`Partner ${index + 1}`}
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
        </article>
      ))}
    </div>
  );
}

export default ImageGallery;
