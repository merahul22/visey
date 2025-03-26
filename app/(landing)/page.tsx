import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import HeroSection from "@/app/(landing)/_components/hero-section";
import MarketplaceSection from "@/app/(landing)/_components/marketplace-section";
import TargetAudienceSection from "@/app/(landing)/_components/target-audience-section";
import BusinessSection from "@/app/(landing)/_components/business-section";
import TestimonialSection from "@/app/(landing)/_components/testimonial-section";
import FaqSection from "@/app/(landing)/_components/faq-section";
import SignUpSection from "@/app/(landing)/_components/signup-section";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="font-gothic">
      <HeroSection />
      <MarketplaceSection />
      <TargetAudienceSection />
      <BusinessSection />

      <div className="bg-primary-landing relative w-full h-40 shadow-2xl">
        <div
          className="absolute inset-0 bg-repeat-x"
          style={{
            backgroundImage: "url('/logo-icon.webp')",
            backgroundSize: "117px auto",
            backgroundPosition: "center",
            opacity: 0.2,
          }}
        />

        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <Button
            variant="landing"
            className="w-full sm:w-96 text-base-black gap-x-4 py-4"
          >
            <Link href="/login" className="flex items-center gap-4">
              <span className="text-lg">Generate leads now</span>
              <ArrowUpRight size={24} />
            </Link>
          </Button>
        </div>
      </div>

      <TestimonialSection />
      <FaqSection />
      <SignUpSection />
    </div>
  );
}
