import Image from "next/image";
import { MapPinIcon } from 'lucide-react';

function HomePage() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="font-bold">Search For</h2>
        <div className="hidden mt-4 overflow-x-auto md:flex gap-x-4">
          {Array.from({ length: 5 }).map((_, idx) => (
            <article
              key={idx}
              className="shrink-0 border rounded-xl w-80 p-1.5 space-y-2"
            >
              <div className="h-64 bg-gray-500 md:rounded-xl"></div>
              <div className="w-full">
                <p className="text-center">Category Name</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-4 overflow-x-auto flex gap-x-4">
          {Array.from({ length: 5 }).map((_, idx) => (
            <article
              key={idx}
              className="flex flex-col shrink-0 gap-y-2 items-center justify-center w-32 p-4 border rounded-xl md:w-64 md:flex-row md:p-1.5"
            >
              <div className="h-20 w-20 rounded-full bg-gray-500 md:rounded-xl md:w-full"></div>
              <div className="w-full">
                <p className="text-center md:text-left md:w-1/2 md:ml-4">Category Name</p>

              </div>
            </article>
          ))}
        </div>
      </section>
      <section>
        <span className="space-y-3">
          <h2 className="font-bold">Recommended</h2>
          <p>Business Category Name</p>
        </span>
        <div className="mt-4 space-y-4 sm:grid sm:grid-cols-2 sm:space-y-0 sm:gap-x-4 sm:gap-y-8 xl:grid-cols-3">
          {Array.from({ length: 5 }).map((_, idx) => (
            <article
              key={idx}
              className="border rounded-md"
            >
              <div className="relative h-28 m-1 bg-gray-400 rounded-md">
                <p className="absolute text-sm px-2 py-0.5 bg-[#F8DEE6] rounded-full right-3 top-3">Promoted</p>
              </div>
              <div className="flex flex-col gap-y-2 items-center pb-7">
                <div className='relative -mt-14 h-20 w-20 bg-gray-600 rounded-full border-[3px] border-white mx-auto'></div>
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
                      {Array.from({length: 5}).map((_, idx) => (
                        <span key={idx}>⭐</span>
                      ))}
                    </div>
                  </div>
                  <p className="-translate-x-1.5 flex justify-center items-center gap-x-1">
                    <MapPinIcon className="w-5 h-5 text-gray-800 " />
                    <span className="text-sm translate-y-0.5">Delhi, India</span>
                  </p>

                  <div className="flex justify-center pt-3 gap-x-2">
                    <p className="p-1 rounded-full border">Loading</p>
                    <p className="p-1 rounded-full border">Loading</p>
                    <p className="p-1 rounded-full border">Loading</p>
                  </div>

                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
export default HomePage;
