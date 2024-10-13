import { MapPin } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

export function BusinessCard() {
  return (
    <article className="border rounded-md">
    <div className="relative h-28 m-1 bg-gray-400 rounded-md">
      <p className="absolute text-sm px-2 py-0.5 bg-secondary-200 rounded-full right-3 top-3">
        Promoted
      </p>
    </div>
    <div className="flex flex-col gap-y-2 items-center pb-7">
      <div className="relative -mt-14 h-20 w-20 bg-gray-600 rounded-full border-[3px] border-white mx-auto"></div>
      <div className="space-y-1.5">
        <h3 className="flex justify-center gap-x-2">
          <span>Buissness Name</span>
          <Image
            src="/img/badge.png"
            height={24}
            width={24}
            alt="badge"
          />
        </h3>
        <div className="flex justify-center gap-x-3">
          <h2 className="font-bold">4.1</h2>
          <div className="flex justify-center gap-x-1">
            {Array.from({ length: 5 }).map((_, idx) => (
              <span key={idx}>⭐</span>
            ))}
          </div>
        </div>
        <p className="-translate-x-1.5 flex justify-center items-center gap-x-1">
          <MapPin />
          <span className="text-sm translate-y-0.5">
            Delhi, India
          </span>
        </p>

        <div className="flex justify-center pt-3 gap-x-2">
          <button className="py-0.5 px-2.5 rounded-full border">Loading</button>
          <button className="py-0.5 px-2.5 rounded-full border">Loading</button>
          <button className="py-0.5 px-2.5 rounded-full border">Loading</button>
        </div>
      </div>
    </div>
  </article>
  )
}