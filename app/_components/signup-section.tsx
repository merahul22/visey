import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

function SignUpSection() {
  return (
    <section className="relative py-20 px-4 min-h-[70vh]">
      <div className="text-center">
        <div className="space-y-2">
          <h2 className="text-2xl leading-relaxed font-semibold font-degular">
            We help startups & SMEs meet their resource needs quick
          </h2>
          <p>
            Be the first to know when the product launches and other not-to-miss
            updates.
          </p>
        </div>

        <form
          action=""
          className="bg-primary-landing rounded-2xl mx-auto p-8 mt-9 mb-1 md:w-8/12 xl:w-6/12 md:rounded-full md:flex md:items-center md:gap-x-6"
        >
          <div className="md:flex-1">
            <Input
              className="border-0 shadow-none h-12 placeholder-base-white text-base-white"
              placeholder="Your name"
            />
            <Separator />
            <Input
              className="border-0 shadow-none h-12 placeholder-base-white text-base-white"
              placeholder="Your email"
            />
          </div>
          <button className="bg-success-landing w-11/12 py-3 px-4 rounded-full shadow-2xl mt-6 md:mt-0 md:shrink-0 md:w-auto md:p-6 md:aspect-square cursor-pointer">
            Sign up
          </button>
        </form>

        <p className="text-xs">
          By subscribing, you agree with our{" "}
          <span className="font-bold underline">Terms of Use</span>{" "}
        </p>
      </div>
    </section>
  );
}
export default SignUpSection;
