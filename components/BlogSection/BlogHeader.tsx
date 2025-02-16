import React from "react";

interface BlogHeaderProps {
  activeFilter: "latest" | "popular";
  setActiveFilter: (filter: "latest" | "popular") => void;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ activeFilter, setActiveFilter }) => {
  return (
    <header className="blog-header">
      <h1 className="blog-title">Blog</h1>
      <div className="blog-filters">
        <button
          className={`filter-button ${activeFilter === "latest" ? "filter-button-active" : ""}`}
          onClick={() => setActiveFilter("latest")}
        >
          Latest
        </button>
        <button
          className={`filter-button ${activeFilter === "popular" ? "filter-button-active" : ""}`}
          onClick={() => setActiveFilter("popular")}
        >
          Popular
        </button>
      </div>
      <style jsx>{`
        .blog-header {
          display: flex;
          width: 100%;
          padding: 24px;
          align-items: center;
          gap: 12px;
          justify-content: space-between;
          flex-wrap: wrap;
        }
        .blog-title {
          color: #3f3f3f;
          font-family: "Degular Display", sans-serif;
          font-weight: 600;
          font-size: 64px;
          line-height: 64px;
          letter-spacing: 0%;
          margin-left: 0px; /* Adjusted to move title a little to the left */
        }
        .blog-filters {
          display: flex;
          align-items: center;
          gap: 8px;
          justify-content: flex-end;
          flex-wrap: wrap;
          flex: 1;
          font-family: "Inter", sans-serif;
          font-size: 16px;
          line-height: 1.2;
        }
        .filter-button {
          border-radius: 1000px;
          min-height: 40px;
          padding: 11px 28px;
          background-color: transparent;
          border: none;
          cursor: pointer;
          color: #1e1e1e;
          font-weight: 600;
          font-family: "Typeface/Family/Body", sans-serif;
          font-size: 14px;
          line-height: 16.8px;
          letter-spacing: 0%;
          text-align: center;
        }
        .filter-button-active {
          background-color: #f8dee6;
          color: #d43a63;
        }
        @media (max-width: 991px) {
          .blog-header {
            padding-right: 20px;
          }
          .blog-title {
            font-size: 40px;
            line-height: 40px;
          }
          .filter-button {
            padding: 8px 20px;
          }
        }
      `}</style>
    </header>
  );
};

export default BlogHeader;
