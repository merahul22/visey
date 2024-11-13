import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/button';

import HeroSection from './_components/hero-section';
import MarketplaceSection from './_components/marketplace-section';
import TargetAudienceSection from './_components/target-audience-section';
import BusinessSection from './_components/business-section';
import TestimonialSection from './_components/testimonial-section';
import FaqSection from './_components/faq-section';
import SignUpSection from './_components/signup-section';
import Footer from '@/components/navigation/footer';
import HeroNav from '@/components/navigation/hero-nav';

export default function LandingPage() {
  // TODO: Redirect accordingly based on current auth status
  return (
    <div className="font-gothic">
      <HeroNav className="mx-auto max-w-screen-xl" />
      <HeroSection />
      <MarketplaceSection />
      <TargetAudienceSection />
      <BusinessSection />

      <div className="bg-primary-landing relative w-full h-40 shadow-2xl">
        <div
          className="absolute inset-0 bg-repeat-x"
          style={{
            backgroundImage: "url('/logo-icon.png')",
            backgroundSize: '117px auto',
            backgroundPosition: 'center',
            opacity: 0.2,
          }}
        />

        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <Button
            variant="landing"
            className="w-full sm:w-96 text-base-black gap-x-4 py-4"
          >
            <span className="text-lg">List Business Now</span>
            <ArrowUpRight size={24} />
          </Button>
        </div>
      </div>

      <TestimonialSection />
      <FaqSection />
      <SignUpSection />
      <Footer className="shadow-[0_-8px_10px_rgba(0,0,0,0.1)] rounded-tl-2xl rounded-tr-3xl" />
    </div>
  );
}
