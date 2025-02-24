import Image from "next/image"; // Import Image from next/image

interface PromotionalBannerProps {
  title: string;
  subtitle: string;
  features: string[];
  imageUrl: string;
  badgeText: string;
  badgeColor: string;
  buttonText: string;
  buttonLink?: string;
  lowerBgColor?: string;
  buttonWidth?: string;
}

export const PromotionalBanner = ({
  title,
  subtitle,
  features,
  imageUrl,
  badgeText,
  badgeColor,
  buttonText,
  buttonLink = "#",
  lowerBgColor = "bg-red-100",
  buttonWidth = "w-full",
}: PromotionalBannerProps) => {
  return (
    <section className="mt-10 w-full bg-red-100 rounded-2xl">
      <header className="flex-1 shrink gap-2.5 self-stretch p-3 w-full text-base font-semibold leading-tight text-center text-white bg-pink-600 rounded-2xl basis-0">
        Start free and Upgrade to unlock business features.
      </header>

      <div className={`flex flex-wrap gap-3 justify-between items-center px-4 py-1 w-full ${lowerBgColor}`}>
        <div className="flex flex-col justify-center self-stretch py-0.5 pr-2 pl-3 my-auto w-[200px]">
          <div className="flex flex-col justify-center px-1.5 py-1 w-full min-h-[135px]">
            <Image
              src={imageUrl}
              alt=""
              width={168}
              height={127}
              className="object-contain flex-1 rounded aspect-[1.32] w-[168px]"
            />
          </div>
        </div>

        <div className="flex flex-col self-stretch my-auto leading-tight text-stone-900 w-[232px]">
          <div className="flex gap-1.5 justify-center items-start self-start text-lg font-semibold text-center whitespace-nowrap">
            <span>visey</span>
            <span
              className={`gap-4 self-stretch px-3 py-0.5 rounded-md ${badgeColor}`}
            >
              {badgeText}
            </span>
          </div>

          <div className="flex flex-col justify-center mt-2 w-full">
            <h3 className="text-3xl font-semibold">{title}</h3>
            <p className="flex gap-2 items-start text-base">
              <span className="self-stretch py-1.5 rounded">{subtitle}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start self-stretch my-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex gap-4 items-center px-3 py-0.5 mt-3 first:mt-0"
            >
              <div className="flex justify-center items-center self-stretch my-auto w-4 min-h-4 rounded-[1000px]">
                <Image
                  src="/img/pricingPage.png"
                  alt=""
                  width={16}
                  height={16}
                  className="object-contain self-stretch my-auto w-4 aspect-square"
                />
              </div>
              <span className="self-stretch my-auto text-base leading-tight text-stone-900">
                {feature}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-center self-stretch pt-2.5 my-auto font-semibold leading-tight min-w-60 w-[298px]">
          <div className="flex flex-col items-center pr-3 w-full text-base text-white">
            <button className={`overflow-hidden gap-1.5 self-center px-6 py-3 bg-pink-600 min-h-10 rounded-[1000px] max-md:px-5 ${buttonWidth}`}>
              {buttonText}
            </button>
          </div>
          <div className="self-center px-3 max-w-full text-sm text-sky-700 w-[108px]">
            <a
              href={buttonLink}
              className="flex gap-1.5 justify-center items-center px-1 py-3 w-full min-h-10 rounded-[1000px]"
            >
              <div className="flex flex-col justify-center self-stretch my-auto w-[76px]">
                <span>Buy on Call</span>
                <div className="w-full border border-sky-700 border-solid min-h-px" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
