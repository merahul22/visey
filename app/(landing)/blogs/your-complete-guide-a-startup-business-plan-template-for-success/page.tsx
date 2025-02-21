import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CaretRight, CaretLeft, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Complete Guide: A Startup Business Plan Template For Success",
  description: "A comprehensive guide to creating a startup business plan template for success. Learn how to define your path, attract investors, avoid pitfalls, and more."
};

const Page = () => {
  return (
    <div className="max-w-[1000px] mx-auto mt-16 mb-24">
      <h1 className="font-degular text-heading4 md:text-heading2 xl:text-heading1 leading-tight font-semibold text-[#3f3f3f]">
        Your Complete Guide: A Startup Business Plan Template For Success
      </h1>
      <h2 className="text-2xl font-medium mt-2">
        A comprehensive guide to creating a startup business plan template for success. Learn how to define your path, attract investors, avoid pitfalls, and more.
      </h2>
      <div className="mt-4 flex items-center justify-center">
        <Image
          src={"https://api.outrank.so/storage/v1/object/public/article-images/4cbd6bc9-b269-4add-a8fe-31e246005bcd/ai-image-c02e9a20-5905-4bec-81ec-e697a957670d.jpg"}
          alt={"Business Plan Image"}
          width={328}
          height={324}
        />
      </div>
      <p className="mt-4">
        A startup business plan template acts as a foundation for new ventures. It outlines the essential pieces needed to build your business successfully. This practical framework helps walk you through each step of launching a company, from defining your market to planning your finances.
      </p>
      <div className="space-y-4">
        <div className="mt-4">
          <h3 className="font-semibold">Clarity and Focus: Defining Your Path to Success</h3>
          <p>
            A business plan template helps you spell out your company vision and outline specific strategies to achieve it. When you map everything out clearly, you can spot potential issues early and stay focused on what matters most. Just like you wouldn't build a house without blueprints, trying to build a business without a solid plan can lead to wasted time and money.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Attracting Investors: Speaking the Language of Funding</h3>
          <p>
            For startups seeking money from investors, a well-written business plan is key. It shows potential funders exactly how their investment could grow. Using a business plan template helps present your ideas professionally, backed by solid research and numbers. Research shows that companies with business plans are 30% more likely to grow compared to those without plans. Additionally, startups that create business plans are 7% more likely to achieve high growth rates.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Avoiding Pitfalls: Navigating the Startup Landscape</h3>
          <p>
            A business plan template provides a tested structure that helps you consider all important aspects of your business. It makes sure you think through critical elements like market analysis, competition, and financial planning. This structured approach helps reduce risks and improves your chances of success. You can then focus more energy on building your product and growing your customer base.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Adaptability and Growth: A Living Document for Your Startup</h3>
          <p>
            Your business plan should change and grow along with your company. As market conditions shift and you learn more about your customers, update your plan to reflect new insights and directions. A good template gives you the flexibility to adjust while keeping you focused on sustainable growth and long-term success.
          </p>
        </div>
      </div>
      <p className="mt-4">Also read:</p>
      <div className="flex items-center justify-center">
        <div>
          <Button variant="link" className="text-sm text-base-black">
            <div className="flex items-center gap-2">
              <div>
                <CaretLeft />
              </div>
              <span>Previous</span>
            </div>
          </Button>
          <Button variant="link" className="text-sm text-base-black">
            <div className="flex items-center gap-2">
              <span>Next</span>
              <div>
                <CaretRight />
              </div>
            </div>
          </Button>
        </div>
      </div>
      <div className="mt-4">
        <ViseyBanner />
      </div>
    </div>
  );
};

const ViseyBanner = () => {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-primary-100 mt-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl text-[#9D0543]">Visey</h1>
        <p>
          Can help you connect with right resources for your startup for free
        </p>
      </div>
      <div>
        <Button>
          Start Now
          <div>
            <ArrowUpRight />
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Page;
  