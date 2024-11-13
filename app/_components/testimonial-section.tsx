import { CarouselDemo } from '@/components/TestimonialCarousel';

const SLIDES = [
  {
    image: '/img/testimonial.png',
    content: '“An absolute must have for startups and businesses”',
  },
  { image: '/img/testimonial.png', content: 'Testimonial 2' },
  { image: '/img/testimonial.png', content: 'Testimonial 3' },
  { image: '/img/testimonial.png', content: 'Testimonial 4' },
  { image: '/img/testimonial.png', content: 'Testimonial 5' },
];

function TestimonialSection() {
  return (
    <section className="relative pt-24 ">
      {/* <div className="absolute left-0 -top-3 transform scale-x-[-1] -rotate-180  w-full h-[240px] opacity-50">
        <Image src="/wave-2.png" fill={true} objectFit="cover" alt="bg-wave" />
      </div> */}
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
    </section>
  );
}
export default TestimonialSection;
