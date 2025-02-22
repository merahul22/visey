import React, { useState } from "react";
import BlogHeader from "./BlogHeader";
import BlogTabs from "./BlogTabs";
import BlogCardGrid from "./BlogCardGrid";

const BlogSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"businesses" | "funding">(
    "businesses"
  );
  const [activeFilter, setActiveFilter] = useState<"latest" | "popular">(
    "latest"
  );

  return (
    <section className="blog-section">
      <BlogHeader activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      <BlogTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <BlogCardGrid activeTab={activeTab} activeFilter={activeFilter} />
      <style jsx>{`
        .blog-section {
          border-radius: 24px;
          background-color: #ffffff;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          padding: 24px;
        }
        @media (max-width: 991px) {
          .blog-section {
            padding: 0 20px;
          }
        }
      `}</style>
    </section>
  );
};

export default BlogSection;
