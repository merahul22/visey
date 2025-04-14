import { ChartLineUp, UsersThree, Eye } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

const businessSection = [
  {
    title: "Actionable Insights for Growth",
    description:
      "Visey’s platform offers analytics for valuable insights to help you better serve the needs of startups.",
  },
  {
    title: "Reach your Target Audience",
    description:
      "Visey enables your business to efficiently connect with Indian startups actively seeking your services.",
  },
  {
    title: "Build Trust Through Transparency",
    description:
      "Integrated verification, ratings and reviews ensure transparency, fostering trust and credibility among startups and resource providers.",
  },
];

const features = [
  {
    title: "Free Listing",
    subtitle: "Go Online",
  },
  {
    title: "Get Leads",
    subtitle: "From across India",
  },
  {
    title: "Close Deals",
    subtitle: "Grow with Visey",
  },
];

function BusinessSection() {
  return (
    <section className="relative" aria-labelledby="business-section-heading">
      {/* Decorative Top Triangle */}
      <div
        className="relative rotate-180 w-full h-20 bg-repeat-x opacity-10"
        aria-hidden="true"
        style={{
          backgroundImage: "url('/triangle.png')",
          backgroundSize: "100px 100%",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Content Section */}
      <div className="relative px-4 pt-9 pb-20 space-y-9 md:space-y-14 xl:space-y-20">
        {/* Heading */}
        <div className="space-y-2 text-center">
          <h2
            id="business-section-heading"
            className="font-degular font-semibold text-heading4 md:text-heading3 lg:text-heading2 xl:text-heading1 leading-snug"
          >
            Visey for Resource Providers
          </h2>
          <p className="text-lg font-gothic">
            Unlock your full potential with our{" "}
            <span className="font-bold">cutting-edge features</span>
          </p>
        </div>

        {/* Business Features */}
        <div className="max-w-screen-2xl mx-auto flex flex-col gap-6 md:flex-row">
          {businessSection.map((data, idx) => (
            <div
              key={data.title}
              className="px-10 pt-10 pb-24 rounded-2xl space-y-6 bg-primary-landing-light text-base-white flex-1"
            >
              <div className="p-2 rounded-full inline-flex justify-center items-center bg-success-landing">
                {idx === 0 && (
                  <ChartLineUp size={36} className="text-[#709B08]" />
                )}
                {idx === 1 && (
                  <UsersThree size={36} className="text-[#709B08]" />
                )}
                {idx === 2 && <Eye size={36} className="text-[#709B08]" />}
              </div>
              <div className="space-y-4">
                <h3 className="font-degular font-medium text-hero leading-tight">
                  {data.title}
                </h3>
                <p>{data.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="max-w-screen-xl mx-auto flex flex-col gap-4 md:flex-row md:justify-between py-9 md:py-12 lg:py-16">
          {features.map((feat) => (
            <div key={feat.title} className="flex-grow text-center pb-6"> {/* Added pb-6 for consistent bottom padding */}
              <p className="font-degular text-heading4 text-primary">
                {feat.title}
              </p>
              <p className="font-medium font-gothic text-lg">{feat.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Decorative Background Image */}
        <div
          className="absolute z-[-1] opacity-20 left-0 bottom-0 w-full h-[1500px] md:h-[900px]"
          aria-hidden="true"
        >
          <Image
            src="/business-bg.webp"
            fill
            className="object-contain"
            alt="Abstract business background"
            loading="lazy"
          />
        </div>
      </div>

      {/* Decorative Bottom Wave */}
      <div
        className="absolute inset-x-0 -bottom-6 w-full h-[250px] md:h-[200px] lg:h-[300px] opacity-60 transform scale-x-[-1] -rotate-180"
        aria-hidden="true"
      >
        <Image
          src="/wave-real-2.png"
          fill
          className="object-cover object-left"
          alt="Wave-shaped decorative background"
          loading="lazy"
        />
      </div>
    </section>
  );
}

export default BusinessSection;
