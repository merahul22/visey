import React from 'react';

interface CategoryCardBigProps {
  category: string;
  imageUrl: string;
}

export function CategoryCardBig({ category, imageUrl }: CategoryCardBigProps) {
  return (
    <article className="shrink-0 border rounded-md w-80 p-1.5 space-y-2">
      <div className="relative w-full" style={{ paddingBottom: '65.76%' }}>
        <img src={imageUrl} alt={category} className="absolute top-0 left-0 w-full h-full object-cover rounded-md" />
      </div>
      <div className="w-full">
        <p className="text-center">{category}</p>
      </div>
    </article>
  );
}
