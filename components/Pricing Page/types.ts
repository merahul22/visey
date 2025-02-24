export interface PricingPlan {
  title: string;
  price: string;
  duration: string;
  features: string[];
  buttonText?: string;
  isCustom?: boolean;
}

export interface PromotionalBannerProps {
  title: string;
  features: string[];
  imageUrl: string;
  buttonText: string;
  badgeText: string;
  badgeColor: string;
}
