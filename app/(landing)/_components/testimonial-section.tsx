import { CarouselDemo } from '@/components/TestimonialCarousel';
import Image from 'next/image';

interface Testimonial {
  image: string;
  content: string;
}

const SLIDES: Testimonial[] = [
  {
    image: '/img/testimonial1.png',
    content: '“An absolute must have for startups and businesses”',
  },
  {
    image: '/img/testimonial2.jpg',
    content: '“A game-changer for our business.”',
  },
  {
    image: '/img/testimonial3.jpg',
    content: '“Boosted our productivity instantly.”',
  },
  {
    image: '/img/testimonial4.jpg',
    content: '“Perfect for startups. Highly recommend.”',
  },
];

function TestimonialSection() {
  return (
    <section className="relative pt-24 ">
      <div className="absolute inset-x-0 -top-6 w-full h-[250px] md:h-[200px] lg:h-[300px] opacity-60">
        <Image
          src="/wave-real-2.png"
          fill={true}
          className="object-cover object-left"
          alt="bg-wave"
          priority
        />
      </div>
      <div className="space-y-2 text-center">
        <h2 className="font-degular font-semibold text-heading4 md:text-heading3 lg:text-heading2 xl:text-heading1 leading-snug">
          Experiences speak louder
        </h2>
        <p className="text-lg">
          &quot;This is the most helpful resource for my startup&quot;
        </p>
      </div>
      <div className="py-24 flex items-center justify-center">
        <CarouselDemo slides={SLIDES} />
      </div>

      <div
        className="relative rotate-180 w-full h-20 bg-repeat-x opacity-10"
        style={{
          backgroundImage: "url('/triangle.png')",
          backgroundSize: '100px 100%',
          backgroundPosition: 'center',
        }}
      ></div>
    </section>
  );
}
export default TestimonialSection;
