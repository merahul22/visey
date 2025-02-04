import { MapPin } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';

interface Business {
  id: string;
  name: string;
  image: string;
  location: string;
  averageRating?: number; // Ensure this is optional
  promoted: boolean;
  services?: { name: string }[]; // Ensure this is optional
}

export function SearchBusinessCard({ business }: { business: Business }) {
  return (
    <article className="border rounded-md">
      <div className="relative h-28 m-1 bg-gray-400 rounded-md">
        <p className="absolute text-sm px-2 py-0.5 bg-secondary-200 rounded-full right-3 top-3">
          {business.promoted ? 'Promoted' : ''}
        </p>
      </div>
      <div className="flex flex-col gap-y-2 items-center pb-7">
        <div className="relative -mt-14 h-20 w-20 bg-gray-600 rounded-full border-[3px] border-white mx-auto">
          <Image src={business.image} alt={business.name} layout="fill" objectFit="cover" className="rounded-full" />
        </div>
        <div className="space-y-1.5">
          <h3 className="flex justify-center gap-x-2">
            <span>{business.name}</span>
            <Image src="/img/badge.png" height={24} width={24} alt="badge" />
          </h3>
          <div className="flex justify-center gap-x-3">
            {business.averageRating !== undefined ? (
              <>
                <h2 className="font-bold">{business.averageRating.toFixed(1)}</h2>
                <div className="flex justify-center gap-x-1">
                  {Array.from({ length: 5 }).map((_, idx: number) => (
                    <span key={idx}>⭐</span>
                  ))}
                </div>
              </>
            ) : (
              <p>No rating available</p>
            )}
          </div>
          <p className="-translate-x-1.5 flex justify-center items-center gap-x-1">
            <MapPin />
            <span className="text-sm translate-y-0.5">{business.location}</span>
          </p>

          <div className="flex justify-center pt-3 gap-x-2">
            {(business.services || []).map((service: { name: string }, idx: number) => (
              <button key={idx} className="py-0.5 px-2.5 rounded-full border">
                {service.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
