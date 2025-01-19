import Image from "next/image";

function TargetAudienceSection() {
  return (
    <section
      className="bg-[#F01D74] w-full py-4"
      aria-labelledby="target-audience-heading"
    >
      {/* Triangle top border - decorative */}
      <div
        className="w-full h-20 bg-repeat-x"
        aria-hidden="true"
        style={{
          backgroundImage: "url('/triangle.png')",
          backgroundSize: "100px 100%",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Main content - with max-width constraint */}
      <div className="max-w-screen-xl mx-auto px-4">
        <section className="py-8 md:py-16 lg:py-24 text-base-white space-y-4 md:flex md:space-y-0 md:gap-x-14">
          {/* Image Section */}
          <div className="relative size-72 sm:size-80 mx-auto md:mx-0 md:flex-1">
            <Image
              src="/img/startup.webp"
              alt="Illustration of a startup workflow"
              fill
              className="object-contain"
              loading="lazy"
            />
          </div>

          {/* Text Section */}
          <div className="p-4 space-y-10 md:pt-10 md:flex-1">
            <div className="space-y-1">
              <h1
                id="target-audience-heading"
                className="font-degular font-semibold text-heading4 md:text-4xl"
              >
                Startups
              </h1>
              <p className="md:text-2xl text-xl font-light">
                Find resources for all your needs.
              </p>
            </div>

            <div className="space-y-1">
              <h1 className="font-degular font-semibold text-heading4 md:text-4xl">
                Businesses
              </h1>
              <p className="text-xl md:text-2xl font-light">
                Reach startup clients for your services.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Triangle bottom border - decorative */}
      <div
        className="w-full h-20 bg-repeat-x"
        aria-hidden="true"
        style={{
          backgroundImage: "url('/triangle.png')",
          backgroundSize: "100px 100%",
          backgroundPosition: "center",
        }}
      ></div>
    </section>
  );
}

export default TargetAudienceSection;
