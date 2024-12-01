import Image from 'next/image';
import { ArrowUpRight, Funnel, Command, Aperture  } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const cardData = [
  {
    title: 'Filter & Match',
    description: 'To find the right match for your startup needs',
  },
  {
    title: 'Data Support',
    description: 'Visualize trends and monitor key performances',
  },
  {
    title: 'All Startups',
    description: 'Accross India, accross stages',
  },
];

const stats = [
  {
    title: '1',
    subtitle: 'Days',
  },
  {
    title: '567h+',
    subtitle: 'Hours saved',
  },
  {
    title: '825+',
    subtitle: 'Business Listed',
  },
];

const features = [
  {
    title: 'Find',
    subtitle: 'Resource in 3-clicks',
  },
  {
    title: 'Connect',
    subtitle: 'With Business that offer what you need',
  },
  {
    title: 'Rate',
    subtitle: 'Your experience',
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
          className="object-cover object-left"
          alt="bg-wave"
          priority
        />
      </div>

      {/* Content container with max-width */}
      <div className="relative max-w-screen-xl mx-auto px-4 py-9 md:py-14 lg:py-20">
        {/* Stats section */}
        <div className="relative z-10 space-y-6 text-center sm:flex sm:space-y-0 sm:justify-between">
          {stats.map((stat) => (
            <div key={stat.title} className="flex-grow space-y-1">
              <p className="font-degular text-heading4 lg:text-heading3 xl:text-heading2">
                {stat.title}
              </p>
              <p className="text-xl lg:text-hero  text-primary font-medium">
                {stat.subtitle}
              </p>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="pt-9 md:pt-16 lg:pt-24 xl:pt-24 space-y-9 md:space-y-14 xl:space-y-20">
          <div className="space-y-4 text-center md:space-y-4">
            <h2 className="font-degular font-semibold text-heading4 md:text-heading3 lg:text-heading2 xl:text-heading1 leading-snug">
              India&apos;s first Marketplace, for startups to find resource
              providers
            </h2>

            <p className="text-lg">
              Find businesses for all your startup needs in{' '}
              <span className="font-bold">one destination</span>
            </p>
          </div>

          <div className="flex flex-col items-center gap-6 md:flex-row md:items-stretch">
            {cardData.map((data, idx) => (
              <div
                key={data.title}
                className="relative z-10 p-10 rounded-2xl space-y-6 bg-primary-landing-light text-base-white w-10/12 h-[286px] md:h-auto"
              >
                <div className="p-2 rounded-full inline-flex justify-center items-center bg-success-landing">
                  {idx === 0 && <Funnel size={36} className="text-[#709B08]" />}
                  {idx === 1 && <Aperture size={36} className="text-[#709B08]" />}
                  {idx === 2 && <Command size={36} className="text-[#709B08]" />}
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

          <div className="flex flex-col items-center">
            <h3 className="font-degular font-semibold text-2xl text-center text-feature md:text-3xl lg:text-heading3">
              Visey is Startup&apos;s support system
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center w-full py-9 md:pt-14 md:pb-12 lg:pt-16">
              {features.map((feat) => (
                <div key={feat.title} className="flex flex-col items-center">
                  <p className="font-degular text-heading4 text-primary">
                    {feat.title}
                  </p>
                  <p className="font-medium text-lg">{feat.subtitle}</p>
                </div>
              ))}
            </div>

            <Button variant="landing" className="py-2.5 px-10 text-xl relative z-10">
              <Link href="/demo-account-type">
                <span className="flex items-center gap-x-3">
                  <span>Start Now</span>
                  <ArrowUpRight weight="bold" />
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom wave - full width */}
      <div className="absolute left-0 bottom-0 w-full h-[400px] md:h-[850px]">
        <Image
          src="/cards-bg.png"
          fill={true}
          className="object-contain opacity-40"
          alt="bg-wave"
        />
      </div>
    </section>
  );
}
export default MarketplaceSection;
