import { Funnel } from '@phosphor-icons/react/dist/ssr';
// import Image from 'next/image';

const businessSection = [
  {
    title: 'Powerful Marketing Analytics',
    description:
      'Visey’s powerful analytics tools give you a clear picture of your business’ progress and the effectiveness of your strategies. Make informed decisions with real-time data at your fingertips.',
  },
  {
    title: 'Reach your Target Audience',
    description:
      'Our Platform helps businesses efficiently identify and connect with startups actively seeking their services. No more wasted time on ineffective outreach—get in touch with the right audience.',
  },
  {
    title: 'Build trust through Transparency',
    description:
      'Our platform’s integrated ratings and reviews system fosters transparency, helping you build credibility and trust with potential startups as clients',
  },
];

const features = [
  {
    title: 'Free Listing',
    subtitle: 'Go Online',
  },
  {
    title: 'Get Leads',
    subtitle: 'From across India',
  },
  {
    title: 'Close Deals',
    subtitle: 'Grow with Visey',
  },
];

function BusinessSection() {
  return (
    <section className="relative">
      <div
        className="relative rotate-180 w-full h-20 bg-repeat-x opacity-10"
        style={{
          backgroundImage: "url('/triangle.png')",
          backgroundSize: '100px 100%',
          backgroundPosition: 'center',
        }}
      ></div>

      <div className="px-4 space-y-9 pt-9 pb-20">
        <div className="space-y-2 text-center">
          <h2 className="font-degular font-semibold text-heading4 md:text-heading3 lg:text-heading2 xl:text-heading1 leading-snug">
            Visey for buissness
          </h2>
          <p className="text-lg">
            Unlock your full potential with our{' '}
            <span className="font-bold">cutting-edge features</span>
          </p>
        </div>
        <div className="space-y-4 mx-auto md:flex md:space-y-0 md:gap-x-8 md:mx-8">
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
        <div className="max-w-screen-xl mx-auto flex flex-col gap-4 md:flex-row md:justify-between w-full">
          {features.map((feat) => (
            <div
              key={feat.title}
              className="flex-grow text-center py-9 md:py-12 lg:py-16"
            >
              <p className="font-degular text-heading4 text-primary">
                {feat.title}
              </p>
              <p className="font-medium text-lg">{feat.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="absolute left-0 -bottom-3  w-full h-[240px] opacity-50">
        <Image src="/wave-2.png" fill={true} objectFit="cover" alt="bg-wave" />
      </div> */}
    </section>
  );
}
export default BusinessSection;
