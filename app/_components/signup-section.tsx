import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
function SignUpSection() {
  return (
    <div className="relative -mt-10">
      <div className="absolute w-full inset-0">
        <Image
          src="/waves-background.png"
          fill
          className="object-cover"
          alt="waves-background"
        />
      </div>
      <p className="relative text-center pt-6 text-neutrals-700 text-lg font-medium">
        Still have more Questions? Contact our{" "}
        <span className="font-bold underline">Help Center.</span>{" "}
      </p>
      <section className="relative py-40 px-4 ">
        <div className="text-center">
          <div className="space-y-2">
            <h2 className="text-4xl leading-relaxed font-semibold font-degular">
              We help startups & SMEs meet their resource needs quick
            </h2>
            <p className="text-neutrals-700 text-xl">
              Be the first to know when the product launches and other
              not-to-miss updates.
            </p>
          </div>

          <form
            action=""
            className="bg-primary-landing rounded-2xl mx-auto p-8 mt-9 mb-1 md:w-8/12 xl:w-6/12 md:rounded-full md:flex md:items-center md:gap-x-6"
          >
            <div className="md:flex-1">
              <Input
                className="border-0 shadow-none h-12  text-base-white placeholder:text-base-white"
                placeholder="Your name"
              />
              <Separator />
              <Input
                className="border-0 shadow-none h-12 text-base-white placeholder:text-base-white"
                placeholder="Your email"
              />
            </div>
            <Button variant="landing" className="w-11/12 py-3 px-4 rounded-full shadow-2xl mt-6 md:mt-0 md:shrink-0 md:w-auto md:p-6 md:aspect-square cursor-pointer">
              Sign up
            </Button>
          </form>

          <p className="text-xs">
            By subscribing, you agree with our{" "}
            <span className="font-bold underline">Terms of Use</span>{" "}
          </p>
        </div>
      </section>
    </div>
  );
}
export default SignUpSection;
