import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

const BlogCTA = () => {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-primary-100 mt-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl text-[#9D0543]">Visey</h1>
        <p>Can help you connect with right resources for your startup for free</p>
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

export const ViseyBanner = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-4 py-2 bg-primary-100 mt-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-degular font-bold text-[#9D0543]">Visey</h1>
        <p className="font-gothic font-medium">
          Can help you connect with right resources for your startup for free
        </p>
      </div>
      <div className="mt-4 md:mt-0">
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

export default BlogCTA;
