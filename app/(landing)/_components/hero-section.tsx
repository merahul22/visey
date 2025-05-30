import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section
      className="relative bg-primary-landing text-base-white overflow-hidden lg:h-screen"
      aria-labelledby="hero-heading"
    >
      {/* Decorative Background Wave - Bottom */}
      <div
        className="absolute inset-x-0 -bottom-6 w-full h-[250px] md:h-[200px] lg:h-[300px] opacity-80"
        aria-hidden="true"
      >
        <Image
          src="/herowave2.svg"
          fill
          className="object-cover object-left"
          alt="Decorative wave background"
          loading="lazy"
        />
      </div>

      {/* Decorative Background Wave - Top */}
      <div
        className="absolute inset-x-0 top-0 w-full h-[250px] md:h-[200px] lg:h-[300px] opacity-80"
        aria-hidden="true"
      >
        <Image
          src="/Surajmukhi.svg"
          fill
          className="object-cover object-left"
          alt="Decorative sunflower background"
          loading="lazy"
        />
      </div>

      <div className="max-w-screen-2xl mx-auto py-24">
        {/* Main Content Container */}
        <div className="relative flex flex-col gap-20 lg:flex-row">
          {/* Left Content */}
          <div className="px-4 md:px-8 lg:pl-8 xl:pl-24 lg:w-3/4 lg:py-24">
            <div className="space-y-8">
              {/* Heading */}
              <div className="space-y-4">
                <h1
                  id="hero-heading"
                  className="font-degular text-heading4 md:text-heading2 xl:text-heading1 leading-tight"
                >
                  The one-stop place for founders to get unstuck, level-up their startup &amp; MSME journeys
                </h1>
              </div>
              {/* Call-to-Action */}
              <Button
                variant="landing"
                className="py-3 px-10 text-lg text-base-black hover:scale-105 transition-transform font-bold"
              >
                <Link href="/login" className="flex items-center gap-4">
                  <span className="font-bold">Find Resources</span>
                  <ArrowUpRight size={20} className="font-bold" />
                </Link>
              </Button>
            </div>
          </div>          {/* Right Image Section */}
          <div className="relative w-full">
            {/* Main Image */}
            <div className="relative w-[786px] h-[572px]">
              <Image
                src="/new-hero-img.png"
                alt="Entrepreneur analyzing resources for their startup"
                fill
                className="object-cover"
                quality={100}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
