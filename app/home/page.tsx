import Image from "next/image";
import { MapPin, HeartStraight } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

function HomePage() {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-semibold">Search For</h2>
        <div className="hidden overflow-x-auto md:flex gap-x-4">
          {Array.from({ length: 5 }).map((_, idx) => (
            <article
              key={idx}
              className="shrink-0 border rounded-md w-80 p-1.5 space-y-2"
            >
              <div className="h-64 bg-gray-500 md:rounded-md"></div>
              <div className="w-full">
                <p className="text-center">Category Name</p>
              </div>
            </article>
          ))}
        </div>

        <div className="overflow-x-auto flex gap-x-4">
          {Array.from({ length: 5 }).map((_, idx) => (
            <article
              key={idx}
              className="flex flex-col shrink-0 gap-y-2 items-center justify-center w-32 p-4 border rounded-md md:w-64 md:flex-row md:p-1.5"
            >
              <div className="h-20 w-20 rounded-full bg-gray-500 md:rounded-md md:w-full"></div>
              <div className="w-full">
                <p className="text-center md:text-left md:w-1/2 md:ml-4">
                  Category Name
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="space-y-4">
        <span className="space-y-3">
          <h2 className="text-xl md:text-2xl font-semibold">Recommended</h2>
          <p>Business Category Name</p>
        </span>
        <div className="space-y-4 sm:grid sm:grid-cols-2 sm:space-y-0 sm:gap-x-4 sm:gap-y-8 xl:grid-cols-3">
          {Array.from({ length: 5 }).map((_, idx) => (
            <article key={idx} className="border rounded-md">
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
          ))}
        </div>
        <span className="block text-center">
          <Button variant="link" className="">
            {" "}
            View all
          </Button>
        </span>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-semibold">Funding Opportunities</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
          {Array.from({ length: 5 }).map((item, idx) => (
            <div className="rounded-xl border p-4 space-y-4" key={idx}>
              <div className="h-40 bg-neutral-400"></div>
              <div className="flex flex-col gap-y-2">
                <div className="flex gap-x-6 justify-between items-start">
                  <h3>New Studies in buissness media</h3>
                  <p className="text-sm px-4 py-0.5 bg-secondary-200 rounded-full">
                    Promoted
                  </p>
                </div>
                <div className="flex gap-x-2 items-center">
                  <Avatar className="w-8 h-8 rounded-full overflow-hidden">
                    <AvatarImage src="https://picsum.photos/100" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className="text-sm">Buissness name</p>
                </div>
                <p className="flex gap-x-2">
                  <span>Apply By: </span>
                  <span>December 25, 2024</span>
                </p>
                <div className="flex gap-x-1 items-center">
                  <MapPin />
                  <span>Delhi, India</span>
                </div>
                <div className="flex gap-x-3 items-center ml-auto">
                  <HeartStraight className="pointer" size={30} />
                  <Button size="lg" className="bg-secondary-200 rounded-full text-base-black">
                    Apply
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <span className="block text-center">
          <Button variant="link" className="">
            {" "}
            View all
          </Button>
        </span>
      </section>

      <div className="flex flex-col justify-center items-center gap-y-4 h-44 bg-secondary-800 rounded-3xl">
        <p className="text-white">Copyright © 2024 Visey.co.in - All rights reserved</p>
        <Image src="/logo-white.png" width={71} height={32} alt="visey logo" />
      </div>
    </div>
  );
}
export default HomePage;
