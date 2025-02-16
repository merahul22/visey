import React from "react";
import BlogCard from "./BlogCard";

interface BlogData {
  id: number;
  imageSrc: string;
  readingTime: string;
  title: string;
  category: "businesses" | "funding";
  filter: "latest" | "popular";
}

const blogData: BlogData[] = [
  {
    id: 1,
    imageSrc: "/img/image-placeholder.webp",
    readingTime: "Reading time: 1 min",
    title:
      "30 Best Startup Ideas in India: Opportunities for New Entrepreneurs",
    category: "businesses",
    filter: "latest",
  },
  {
    id: 2,
    imageSrc: "/img/image-placeholder.webp",
    readingTime: "Reading time: 1 min",
    title: "Top 10 Funding Sources for Small Businesses",
    category: "funding",
    filter: "popular",
  },
  {
    id: 3,
    imageSrc: "/img/image-placeholder.webp",
    readingTime: "Reading time: 1 min",
    title: "How to Write a Winning Business Plan",
    category: "businesses",
    filter: "latest",
  },
  {
    id: 4,
    imageSrc: "/img/image-placeholder.webp",
    readingTime: "Reading time: 1 min",
    title: "Understanding Venture Capital: A Guide for Startups",
    category: "funding",
    filter: "popular",
  },
  {
    id: 5,
    imageSrc: "/img/image-placeholder.webp",
    readingTime: "Reading time: 1 min",
    title: "5 Successful Business Models for the Digital Age",
    category: "businesses",
    filter: "latest",
  },
  {
    id: 6,
    imageSrc: "/img/image-placeholder.webp",
    readingTime: "Reading time: 1 min",
    title: "Crowdfunding: A New Era of Business Financing",
    category: "funding",
    filter: "popular",
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
