import React from "react";
import BlogCard from "./BlogCard";

interface BlogData {
  id: number;
  imageSrc: string;
  readingTime: string;
  title: string;
  category: "businesses" | "funding";
  filter: "latest" | "popular";
  link: string;
}

const blogData: BlogData[] = [
  {
    id: 1,
    imageSrc: "https://api.outrank.so/storage/v1/object/public/article-images/4cbd6bc9-b269-4add-a8fe-31e246005bcd/ai-image-c02e9a20-5905-4bec-81ec-e697a957670d.jpg",
    readingTime: "Reading time: 10 min",
    title: "Your Complete Guide: A Startup Business Plan Template For Success",
    category: "businesses",
    filter: "latest",
    link: "/blogs/your-complete-guide-a-startup-business-plan-template-for-success",
  },
  {
    id: 2,
    imageSrc: "https://api.outrank.so/storage/v1/object/public/article-images/4cbd6bc9-b269-4add-a8fe-31e246005bcd/ai-image-287dc386-fc15-423a-9414-d655dbf103d2.jpg",
    readingTime: "Reading time: 12 min",
    title: "Startup Pitch Deck Template: A Complete Guide to Winning Investor Attention",
    category: "funding",
    filter: "popular",
    link: "/blogs/startup-pitch-deck-template-complete-guide-winning-investor-attention",
  },
  {
    id: 3,
    imageSrc: "https://api.outrank.so/storage/v1/object/public/article-images/4cbd6bc9-b269-4add-a8fe-31e246005bcd/ai-image-f2c7ad14-b277-42b8-acb9-aac7972afb0f.jpg",
    readingTime: "Reading time: 15 min",
    title: "Business Model Canvas Template: Your Complete Guide to Strategic Business Transformation",
    category: "businesses",
    filter: "latest",
    link: "/blogs/business-model-canvas-template-your-complete-guide-to-strategic-business-transformation",
  },
  {
    id: 4,
    imageSrc: "https://api.outrank.so/storage/v1/object/public/article-images/4cbd6bc9-b269-4add-a8fe-31e246005bcd/ai-image-f2c7ad14-b277-42b8-acb9-aac7972afb0f.jpg",
    readingTime: "Reading time: 14 min",
    title: "Essential Startup Resources for Entrepreneurs: A Complete Guide to Launch and Growth",
    category: "funding",
    filter: "popular",
    link: "/blogs/essential-startup-resources-for-entrepreneurs-a-complete-guide-to-launch-and-growth",
  },
  {
    id: 5,
    imageSrc: "/img/image-placeholder.webp",
    readingTime: "Reading time: 1 min",
    title: "5 Successful Business Models for the Digital Age",
    category: "businesses",
    filter: "latest",
    link: "",
  },
  {
    id: 6,
    imageSrc: "/img/image-placeholder.webp",
    readingTime: "Reading time: 1 min",
    title: "Crowdfunding: A New Era of Business Financing",
    category: "funding",
    filter: "popular",
    link: "",
  },
];

interface BlogCardGridProps {
  activeTab: "businesses" | "funding";
  activeFilter: "latest" | "popular";
}

const BlogCardGrid: React.FC<BlogCardGridProps> = ({ activeTab, activeFilter }) => {
  const filteredBlogs = blogData
    .filter((blog) => blog.category === activeTab)
    .sort((a, b) => (activeFilter === "latest" ? b.id - a.id : a.id - b.id))
    .filter((blog): blog is BlogData => blog !== undefined); // Ensure no undefined values

  return (
    <div className="blog-card-grid">
      {filteredBlogs.length > 0 ? (
        filteredBlogs.map((blog) => <BlogCard key={blog.id} {...blog} />)
      ) : (
        <p className="no-blogs">No blogs available</p>
      )}
      <style jsx>{`
        .blog-card-grid {
          display: flex;
          margin-top: 36px;
          width: 100%;
          align-items: flex-start;
          gap: 56px;
          justify-content: flex-start; /* Adjusted to align with the title */
          flex-wrap: wrap;
          margin-left: 24px; /* Adjusted to align with the title */
        }
        .no-blogs {
          font-family: "Inter", sans-serif;
          font-size: 16px;
          color: #717171;
          width: 100%; /* Ensure it takes full width */
          text-align: left; /* Align text to the left */
          margin-left: 24px; /* Adjusted to align with the title */
        }
        @media (max-width: 991px) {
          .blog-card-grid {
            gap: 28px;
          }
        }
      `}</style>
    </div>
  );
};

export default BlogCardGrid;