import Image from "next/image";

function TargetAudienceSection() {
  return (
    <section className="bg-primary-landing w-full">
      {/* Triangle top border - outside max-width container */}
      <div
        className="w-full h-20 bg-repeat-x"
        style={{
          backgroundImage: "url('/triangle.png')",
          backgroundSize: "100px 100%",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Main content - with max-width constraint */}
      <div className="max-w-screen-xl mx-auto px-4">
        <section className="relative py-32 text-base-white space-y-4 md:flex md:space-y-0  md:gap-x-14">
          <div className="relative size-72 mx-auto -left-2 md:mx-0 md:flex-1">
            <Image
              src="/img/startup.png"
              alt="startup illustration"
              fill={true}
              objectFit="contain"
            />
          </div>

          <div className="space-y-10 md:pt-10 md:flex-1">
            <div className="space-y-1">
              <h1 className="text-xl font-semibold md:text-3xl">Startups</h1>
              <p className="">Find Resource for all your needs</p>
            </div>

            <div className="space-y-1">
              <h1 className="text-xl font-semibold md:text-3xl">Startups</h1>
              <p className="">Find Resource for all your needs</p>
            </div>
          </div>
        </section>
      </div>

      {/* Triangle bottom border - outside max-width container */}
      <div
        className="w-full h-20 bg-repeat-x"
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
