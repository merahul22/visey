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
    content: '"Visey made it easy for our startup to find trusted service providers. The platform saved us time and helped us connect with the right resources to scale faster."',
  },
  {
    image: '/img/testimonial1.png',
    content: '"As an SME, Visey helped us access quality business solutions quickly. It’s the perfect platform for finding reliable partners in marketing and tech."',
  },
  {
    image: '/img/testimonial3.jpg',
    content: "Visey's marketplace is a game-changer! We easily found the right legal and financial services for our startup, saving us time and effort.",
  },
  {
    image: '/img/testimonial4.jpg',
    content: "Thanks to Visey, we connected with the right businesses to grow our SME. It's an invaluable resource for finding the right tools and services."
,
  },
  {
    image: '/img/testimonial1.png',
    content: "Visey helped our startup find the perfect tech partners and streamline our growth. A must-have platform for any entrepreneur.",
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
