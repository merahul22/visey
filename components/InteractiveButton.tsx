"use client";

import React from "react";

export default function InteractiveButton({ url, children }: { url: string; children: React.ReactNode }) {
  const handleExternalLink = () => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <button onClick={handleExternalLink} className="text-linkBlue p-0 h-auto">
      {children}
    </button>
  );
}