import Image from 'next/image';
import { EmblaOptionsType } from 'embla-carousel';
import EmblaCarousel from '@/components/EmblaCarousel';
import EmblaCarouselLarge from '@/components/EmblaCarouselLarge';
import StackCardCarousel from '@/components/StackCardCarousel';

interface Testimonial {
  image: string;
  content: string;
}

const OPTIONS: EmblaOptionsType = { loop: true };
const SLIDES: Testimonial[] = [
  {
    image: '/img/testimonial2.jpg',
    content: '"Visey made it quick to find trusted resource providers for my startup. With its support, we were able to scale faster"',
  },
  {
    image: '/img/testimonial1.png',
    content: '"For our MSME, Visey helped us find reliable partners in marketing and tech. I find the marketplace a perfect place to find quality business solutions."',
  },
  {
    image: '/img/testimonial3.jpg',
    content: "It's a game-changer for startups! We easily found the right legal and financial services for our startup at zero cost, saving us time, effort and money.",
  },
  {
    image: '/img/testimonial4.jpg',
    content: "Thanks to Visey, we could connect with every resource provider needed to grow our early-stage MSME. It’s an invaluable resource for finding tools and services."
,
  },
  {
    image: '/img/testimonial1.png',
    content: "We found the perfect tech partners and were able to streamline our growth. It’s a must-have platform for entrepreneur support.",
  },
];

function TestimonialSection() {
  return (
    <section
      className="relative pt-24"
      aria-labelledby="testimonial-section-heading"
    >
      {/* Decorative Top Wave */}
      <div
        className="absolute inset-x-0 -top-6 w-full h-[250px] md:h-[200px] lg:h-[300px] opacity-60"
        aria-hidden="true"
      >
        <Image
          src="/wave-real-2.png"
          fill
          className="object-cover object-left"
          alt="Wave-shaped decorative background"
          loading="lazy" // Lazy-loaded
        />
      </div>

      {/* Section Heading */}
      <div className="space-y-2 text-center">
        <h2
          id="testimonial-section-heading"
          className="font-degular font-semibold text-heading4 md:text-heading3 lg:text-heading2 xl:text-heading1 leading-snug"
        >
          Experiences speak louder
        </h2>
        <p className="text-lg font-gothic font-medium">
          &quot;This is the most helpful resource for my startup&quot;
        </p>
      </div>

      {/* Carousel Section */}
      <div className="py-24 flex items-center justify-center">
        <div className="sm:hidden">
          <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        </div>

        <div className="hidden sm:block lg:hidden">
          <EmblaCarouselLarge slides={SLIDES} options={OPTIONS} />
        </div>
        
        <div className="hidden lg:block">
          <StackCardCarousel />
        </div>
      </div>


      {/* Decorative Bottom Triangle */}
      <div
        className="relative rotate-180 w-full h-20 bg-repeat-x opacity-10"
        aria-hidden="true"
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
