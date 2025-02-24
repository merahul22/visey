"use client"
import React from "react";
import BlogSection from "@/components/BlogSection/BlogSection";

const BlogPage: React.FC = () => {
  return (
    <div className="blog-page">
      <BlogSection />
      <style jsx>{`
        .blog-page {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 24px;
          background-color: #ffffff;
          border-radius: 24px;
        }
      `}</style>
    </div>
  );
};

export default BlogPage;
