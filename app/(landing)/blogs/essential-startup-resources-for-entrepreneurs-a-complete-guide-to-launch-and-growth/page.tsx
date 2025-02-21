import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CaretRight, CaretLeft } from "@phosphor-icons/react/dist/ssr";
import { Metadata } from "next";
import { ViseyBanner } from "@/components/BlogCTA";

export const metadata: Metadata = {
  title: "Essential Startup Resources for Entrepreneurs: A Complete Guide to Launch and Growth",
  description: "A comprehensive guide to essential startup resources for entrepreneurs. Learn how to launch and grow your startup effectively.",
};

// Fetch Markdown Content
const getMarkdownContent = () => {
  const filePath = path.join(
    process.cwd(),
    "blog-files",
    "Essential Startup Resources for Entrepreneurs_ A Complete Guide to Launch and Growth.md"
  );
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(fileContent);
  return content;
};

const Page = () => {
  const markdownContent = getMarkdownContent();

  return (
    <div className="max-w-[1000px] mx-auto mt-16 mb-24 px-4">
      <h1 className="font-degular text-heading4 md:text-heading2 xl:text-heading1 leading-tight font-semibold text-[#3f3f3f]">
        Essential Startup Resources for Entrepreneurs: A Complete Guide to Launch and Growth
      </h1>
      <h2 className="text-2xl font-medium mt-2">
        A comprehensive guide to essential startup resources for entrepreneurs. Learn how to launch and grow your startup effectively.
      </h2>

      {/* Hero Image */}
      <div className="mt-4 flex items-center justify-center">
        <Image
          src="https://api.outrank.so/storage/v1/object/public/article-images/4cbd6bc9-b269-4add-a8fe-31e246005bcd/ai-image-f2c7ad14-b277-42b8-acb9-aac7972afb0f.jpg"
          alt="Startup Resources Image"
          width={1000}
          height={500}
        />
      </div>

      {/* Render Markdown Content */}
      <div className="mt-6 prose prose-lg prose-gray max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]} // Allows raw HTML rendering
          components={{
            h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-6 mb-4" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold mt-5 mb-3" {...props} />,
            h3: ({ node, ...props }) => <h3 className="text-xl font-semibold mt-4 mb-2" {...props} />,
            p: ({ node, ...props }) =>
              props.children?.toString().includes("[[BANNER]]") ? <ViseyBanner /> : <p className="mt-4 leading-relaxed" {...props} />,
            ul: ({ node, ...props }) => <ul className="list-disc list-inside mt-2" {...props} />,
            ol: ({ node, ...props }) => <ol className="list-decimal list-inside mt-2" {...props} />,
            li: ({ node, ...props }) => <li className="ml-4 mt-1" {...props} />,
            blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-gray-400 pl-4 italic text-gray-600" {...props} />,
            table: ({ node, ...props }) => <table className="border-collapse border border-gray-300 w-full mt-4" {...props} />,
            thead: ({ node, ...props }) => <thead className="bg-gray-100" {...props} />,
            tbody: ({ node, ...props }) => <tbody className="divide-y divide-gray-200" {...props} />,
            tr: ({ node, ...props }) => <tr className="border border-gray-300" {...props} />,
            th: ({ node, ...props }) => <th className="border border-gray-300 px-4 py-2 font-semibold text-left" {...props} />,
            td: ({ node, ...props }) => <td className="border border-gray-300 px-4 py-2" {...props} />,
            code: ({ node, className, children, ...props }) => {
              const isInline = Array.isArray(children) && children.length === 1 && typeof children[0] === "string";
              return (
                <code
                  className={`bg-gray-100 text-red-500 px-1 rounded ${isInline ? "inline" : "block p-2"} ${className || ""}`}
                  {...props}
                >
                  {children}
                </code>
              );
            },
          }}
        >
          {markdownContent}
        </ReactMarkdown>
      </div>

      {/* Additional Content */}
      <ViseyBanner />
      <p className="mt-4">Also read:</p>
      <div className="flex items-center justify-center">
        <div>
          <Button variant="link" className="text-sm text-base-black">
            <div className="flex items-center gap-2">
              <CaretLeft />
              <span>Previous</span>
            </div>
          </Button>
          <Button variant="link" className="text-sm text-base-black">
            <div className="flex items-center gap-2">
              <span>Next</span>
              <CaretRight />
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
