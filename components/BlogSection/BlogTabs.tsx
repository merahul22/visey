import React from "react";

interface BlogTabsProps {
  activeTab: "businesses" | "funding";
  setActiveTab: (tab: "businesses" | "funding") => void;
}

const BlogTabs: React.FC<BlogTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="tabs">
      <button
        className={`tab-button ${activeTab === "businesses" ? "active" : ""}`}
        onClick={() => setActiveTab("businesses")}
      >
        Businesses
      </button>
      <button
        className={`tab-button ${activeTab === "funding" ? "active" : ""}`}
        onClick={() => setActiveTab("funding")}
      >
        Funding Opportunities
      </button>
      <style jsx>{`
        .tabs {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          gap: 24px;
          margin-left: 24px;
          margin-top: 36px; /* Adjusted gap */
        }
        .tab-button {
          padding: 10px;
          background: transparent;
          border: none;
          cursor: pointer;
          font-family: "Typeface/Family/Body", sans-serif;
          font-weight: 600;
          font-size: 14px;
          line-height: 16.8px;
          letter-spacing: 0%;
          text-align: center;
          color: #717171;
        }
        .tab-button.active {
          box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
          border-bottom: 1px solid #717171;
        }
      `}</style>
    </div>
  );
};

export default BlogTabs;