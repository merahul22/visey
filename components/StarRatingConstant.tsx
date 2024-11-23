"use client";

import React from "react";
import { Star } from '@phosphor-icons/react/dist/ssr';

interface StarRatingProps {
  maxRating?: number;
  color?: string;
  size?: number;
  className?: string;
  messages?: string[];
  rating: number; // Since users can only view, this is the only prop needed for rating
}

interface StarProps {
  full: boolean;
  color: string;
  size: number;
}

const containerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle: React.CSSProperties = {
  display: "flex",
};

export default function StarRatingConstant({
  maxRating = 5,
  color = "#FF9529",
  size = 24,
  className = "",
  messages = [],
  rating,
}: StarRatingProps) {
  const textStyle: React.CSSProperties = {
    lineHeight: "1",
    margin: "0",
    fontSize: `${size / 1.5}px`,
  };

  return (
    <div style={containerStyle} className={className}>
      <p style={textStyle}>
        {messages.length === maxRating ? messages[rating - 1] : rating || ""}
      </p>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <MyStar key={i} full={rating >= i + 1} color={color} size={size} />
        ))}
      </div>
    </div>
  );
}

function MyStar({ full, color, size }: StarProps) {
  const starStyle: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    display: "block",
  };

  return (
    <span style={starStyle}>
      {full ? (
        <Star weight={"fill"} color={color} size={size} />
      ) : (
        <Star color={color} size={size} />
      )}
    </span>
  );
}
