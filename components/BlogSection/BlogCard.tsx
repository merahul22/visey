import React from "react";
import Link from "next/link";

interface BlogCardProps {
  imageSrc: string;
  readingTime: string;
  title: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ imageSrc, readingTime, title }) => {
  const slug = title.toLowerCase().replace(/ /g, "-");

  return (
    <Link href={`/blogs/${slug}`}>
      <article className="blog-card">
        <div className="image-container">
          <img src={imageSrc} alt={title} className="blog-image" />
        </div>
        <div className="blog-content">
          <p className="reading-time">{readingTime}</p>
          <h2 className="blog-title">{title}</h2>
        </div>
        <style jsx>{`
          .blog-card {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            width: 324px;
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
          .blog-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 4px;
          }
          .blog-content {
            display: flex;
            margin-top: 16px;
            width: 100%;
            flex-direction: column;
          }
          .reading-time {
            font-family: "Gothic A1", sans-serif;
            font-size: 16px;
            line-height: 16px;
            color: #4a4a4a;
            font-weight: 500;
            margin: 0;
          }
          .blog-title {
            font-family: "Gothic A1", sans-serif;
            font-size: 24px;
            line-height: 24px;
            color: #1e1e1e;
            font-weight: 500;
            margin: 8px 0 0 0;
          }
        `}</style>
      </article>
    </Link>
  );
};

export default BlogCard;
