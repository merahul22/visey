import Image from "next/image";
import StackCardCarousel from "@/components/StackCardCarousel";


function TestimonialSection() {
  return (
    <section className="relative pt-24 ">
      <div className="absolute left-0 -top-3 transform scale-x-[-1] -rotate-180  w-full h-[240px] opacity-50">
        <Image src="/wave-2.png" fill={true} objectFit="cover" alt="bg-wave" />
      </div>
      <div className="space-y-2 text-center h-96">
        <h2 className="text-2xl font-semibold">Experiences speak louder</h2>
        <p className="text-sm">
        &quot;This is the most helpful resource for my startup&quot;
        </p>
      </div>
      <StackCardCarousel />
    </section>
  );
}
export default TestimonialSection;
