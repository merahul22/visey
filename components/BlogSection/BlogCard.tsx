import React from "react";
import Link from "next/link";
import Image from "next/image";

interface BlogCardProps {
  id: number;
  imageSrc: string;
  readingTime: string;
  title: string;
  category: "businesses" | "funding";
  filter: "latest" | "popular";
  link: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  imageSrc,
  readingTime,
  title,
  link,
}) => {
  return (
    <div className="blog-card">
      <Link href={link} legacyBehavior>
        <a>
          <div className="image-container">
            <Image
              src={imageSrc}
              alt={title}
              width={400}
              height={250}
              className="w-full h-48 object-cover"
            />
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-500">{readingTime}</p>
            <h2 className="text-xl font-bold mb-2">{title}</h2>
          </div>
        </a>
      </Link>
      <style jsx>{`
        .blog-card {
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s;
          width: 324px;
        }
        .blog-card:hover {
          transform: translateY(-5px);
        }
        .image-container {
          border-radius: 8px;
          background-color: #ffffff;
          display: flex;
          min-height: 280px;
          width: 100%;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }
        .p-4 {
          padding: 16px;
        }
        .text-sm {
          font-family: "Gothic A1", sans-serif;
          font-size: 16px;
          line-height: 16px;
          color: #4a4a4a;
          font-weight: 500;
          margin: 0;
        }
        .text-xl {
          font-family: "Gothic A1", sans-serif;
          font-size: 24px;
          line-height: 24px;
          color: #1e1e1e;
          font-weight: 500;
          margin: 8px 0 0 0;
        }
      `}</style>
    </div>
  );
};

export default BlogCard;
