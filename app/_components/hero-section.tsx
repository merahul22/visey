import Image from "next/image";

import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";

function HeroSection() {
  return (
    <section className="bg-primary-landing text-base-white md:min-h-[70vh] lg:h-[85vh]">
      {/* <Navbar /> */}
      <div className="px-4 pt-28 md:flex md:items-center max-w-screen-xl mx-auto">
        <div className="space-y-8 md:flex-1">
          <div className="space-y-4">
            <h1 className="font-degular text-heading4 md:text-heading2 xl:text-heading1 leading-tight">
              We help startups & SMEs meet their resource needs quick
            </h1>
            <p className="font-gothic text-sm md:text-base">
              Visey marketplace makes it easy for startups and SME owners to
              find the right resources by connecting them with businesses that
              can fulfill their needs, in just three simple clicks.
            </p>
          </div>
          <Button className="py-3 px-10 bg-success-landing gap-x-4 text-lg text-base-black">
            <span>Start Now</span>
            <ArrowUpRight size={20} />
          </Button>
        </div>
        <div className="relative size-[22rem] mx-auto -left-2 md:flex-1">
          <Image
            src="/img/hero-img.png"
            alt="hero image"
            fill={true}
            objectFit="contain"
          />
        </div>
      </div>
    </section>
  );
}
export default HeroSection;
