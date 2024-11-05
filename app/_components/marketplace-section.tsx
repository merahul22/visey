import Image from "next/image";
import { ArrowUpRight, Funnel } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";

const cardData = [
  {
    title: "Filter & Match",
    description: "To find the right match for your startup needs",
  },
  {
    title: "Data Support",
    description: "Visualize trends and monitor key performances",
  },
  {
    title: "All Startups",
    description: "Accross India, accross stages",
  },
];

function MarketplaceSection() {
  return (
    <section className="relative w-full">
      {/* Top wave - full width */}
      <div className="absolute inset-x-0 top-0 w-full h-[250px] md:h-[200px] lg:h-[300px] opacity-60">
        <Image
          src="/wave-real-2.png"
          fill={true}
          objectFit="cover"
          alt="bg-wave"
          priority
        />
      </div>

      {/* Content container with max-width */}
      <div className="relative max-w-screen-xl mx-auto px-4 py-14">
        {/* Stats section */}
        <div className="relative z-10 space-y-6 text-center sm:flex sm:space-y-0 sm:justify-between">
          <div className="space-y-0.5">
            <p className="font-degular text-heading4">157k+</p>
            <p className="text-xl lg:text-3xl text-primary font-medium">
              Active Users
            </p>
          </div>
          <div className="space-y-0.5">
            <p className="font-degular text-heading4">937h+</p>
            <p className="text-xl lg:text-3xl text-primary font-medium">
              Time Saved
            </p>
          </div>
          <div className="space-y-0.5">
            <p className="font-degular text-heading4">25k+</p>
            <p className="text-xl lg:text-3xl text-primary font-medium ">
              Buissness Listed
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="pt-9 md:pt-16 space-y-9">
          <div className="space-y-4 text-center md:space-y-4">
            <h2 className="font-degular font-semibold text-heading4 leading-snug">
              India&apos;s first Marketplace, for startups to find resource
              providers
            </h2>

            <p className="text-sm">
              Find businesses for all your startup needs in{" "}
              <span className="font-bold">one destination</span>
            </p>
          </div>

          <div className="flex flex-col items-center gap-y-6 md:flex-row md:gap-y-0 md:gap-x-6 md:items-stretch">
            {cardData.map((data) => (
              <div
                key={data.title}
                className="p-10 rounded-2xl space-y-6 bg-primary-landing-light text-base-white w-10/12 h-[286px] md:h-auto"
              >
                <div className="p-2 rounded-full inline-flex justify-center items-center bg-success-landing">
                  <Funnel size={36} className="text-[#709B08]" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-degular font-medium text-hero">
                    {data.title}
                  </h3>
                  <p className="">{data.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-9">
            <h3 className="font-degular font-semibold text-2xl text-center">
              Visey is Startup&apos;s support system
            </h3>
            <div className="space-y-6 text-center sm:flex sm:space-y-0 sm:justify-between">
              <div className="flex flex-col justify-between">
                <p className="font-degular text-heading4 text-primary">Find</p>
                <p className="text-lg">Resources in 3-clicks</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-degular text-heading4 text-primary">
                  Connect
                </p>
                <p className="text-lg">
                  With Business that offer what you need
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-degular text-heading4 text-primary">Rate</p>
                <p className="text-lg">your experience</p>
              </div>
            </div>

            <Button className="block py-3 px-10 text-xl mx-auto">
              <span className="flex items-center gap-x-3">
                <span>Start Now</span>
                <ArrowUpRight weight="bold" />
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom wave - full width */}
      <div className="absolute left-0 bottom-0 w-full h-[240px] md:h-[400px]">
        <Image
          src="/img/bg-1.png"
          fill={true}
          objectFit="cover"
          alt="bg-wave"
        />
      </div>
    </section>
  );
}
export default MarketplaceSection;
