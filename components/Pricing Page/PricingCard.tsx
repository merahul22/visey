interface PricingCardProps {
  title: string;
  price: string;
  duration: string;
  features: string[];
  isCustom?: boolean;
  borderColor?: string;
  titleColor?: string;
}

export const PricingCard = ({
  title,
  price,
  duration,
  features,
  isCustom = false,
  borderColor = "border-pink-500",
  titleColor = "text-pink-700",
}: PricingCardProps) => {
  return (
    <article
      className={`overflow-hidden flex flex-col justify-between px-6 py-9 my-auto bg-white rounded-2xl border-2 ${borderColor} border-solid basis-0 max-w-[278px] min-h-[610px] min-w-[278px] max-md:px-5`}
    >
      <header className="flex flex-col px-1.5 w-full rounded-2xl">
        <h3 className={`text-2xl font-semibold text-center ${titleColor}`}>
          {title}
        </h3>
        {!isCustom && (
          <div className="flex justify-center items-center self-center py-1 mt-3 text-3xl font-bold whitespace-nowrap rounded-[1000px] text-stone-900">
            <span className="self-stretch my-auto">₹</span>
            <span className="self-stretch my-auto text-center">{price}</span>
            <span className="self-stretch my-auto text-center">
              /{duration}
            </span>
          </div>
        )}
      </header>

      <div className="flex flex-col justify-between flex-1 px-1.5 py-3 mt-5 w-full text-base leading-5 text-stone-900">
        <ul className="flex-1 flex flex-col gap-2 w-full">
          {features.map((feature, index) => (
            <li key={index} className="mb-4">
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {!isCustom ? (
        <div className="mt-5 w-full text-2xl">
          <button className="gap-1.5 self-stretch px-7 py-3.5 w-full bg-white border-2 border-pink-600 border-solid min-h-[55px] rounded-[1000px] text-stone-900 max-md:px-5">
            Get Free Trial
          </button>
          <button className="overflow-hidden gap-1.5 self-stretch px-7 py-3.5 mt-4 w-full text-white bg-pink-600 min-h-[55px] rounded-[1000px] max-md:px-5">
            Buy Now
          </button>
        </div>
      ) : (
        <div className="mt-5 w-full text-white">
          <button className="overflow-hidden gap-1.5 self-stretch px-7 py-3.5 w-full bg-pink-600 min-h-[55px] rounded-[1000px] max-md:px-5">
            Contact Sales
          </button>
        </div>
      )}
    </article>
  );
};
