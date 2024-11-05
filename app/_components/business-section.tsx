import { Funnel } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";


const businessSection = [
  {
    title: "Powerful Marketing Analytics",
    description:
      "Visey’s powerful analytics tools give you a clear picture of your business’ progress and the effectiveness of your strategies. Make informed decisions with real-time data at your fingertips.",
  },
  {
    title: "Reach your Target Audience",
    description:
      "Our Platform helps businesses efficiently identify and connect with startups actively seeking their services. No more wasted time on ineffective outreach—get in touch with the right audience.",
  },
  {
    title: "Build trust through Transparency",
    description:
      "Our platform’s integrated ratings and reviews system fosters transparency, helping you build credibility and trust with potential startups as clients",
  },
];


function BusinessSection() {
  return (
    <section className="relative px-4 py-28">
      <div
        className="absolute top-4 left-0 rotate-180 w-full h-20 bg-repeat-x opacity-10"
        style={{
          backgroundImage: "url('/triangle.png')",
          backgroundSize: "100px 100%",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="absolute left-0 top-32  w-full h-[1000px] opacity-10">
        <Image
          src="/img/bg-2.png"
          fill={true}
          objectFit="cover"
          alt="bg-wave"
        />
      </div>
      <div className="space-y-9">
        <div className="space-y-2 text-center">
          <h2 className="font-degular font-semibold text-heading4 leading-relaxed md:text-3xl">
            Visey for buissness
          </h2>
          <p className="text-sm">
            Unlock your full potential with our{" "}
            <span className="font-bold">cutting-edge features</span>
          </p>
        </div>
        <div className="space-y-4 mx-auto md:flex md:space-y-0 md:gap-x-4">
          {businessSection.map((data) => (
            <div
              key={data.title}
              className="p-10 rounded-2xl space-y-6 bg-primary-landing-light text-base-white flex-1"
            >
              <div className="p-2 rounded-full inline-flex justify-center items-center bg-success-landing">
                <Funnel size={36} className="text-[#709B08]" />
              </div>
              <div className="space-y-4 ">
                <h3 className="font-degular font-medium text-hero leading-tight">
                  {data.title}
                </h3>
                <p className="">{data.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-4 text-center sm:flex sm:space-y-0 sm:justify-between ">
          <div className="">
            <p className="text-xl font-semibold text-primary">Free Listing</p>
            <p className="">Go online</p>
          </div>
          <div className="">
            <p className="text-xl font-semibold text-primary">Get Leads</p>
            <p className="l">From across India</p>
          </div>
          <div className="">
            <p className="text-xl font-semibold text-primary">Close Deals</p>
            <p className="">Grow with Visey</p>
          </div>
        </div>
      </div>
      <div className="absolute left-0 -bottom-3  w-full h-[240px] opacity-50">
        <Image src="/wave-2.png" fill={true} objectFit="cover" alt="bg-wave" />
      </div>
    </section>
  );
}
export default BusinessSection;
