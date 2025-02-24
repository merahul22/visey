import prisma from "@/lib/db";

interface BusinessDetails {
  id: string;
  userId: string | null;
  image: string;
  name: string;
  registeredName?: string | null;
  websiteUrl?: string | null;
  contactNumber: string;
  email?: string | null;
  location: string;
  category: string;
  categoryTags: string[];
  description?: string | null;
  gallery: string[];
  achievements: {
    id: string;
    name: string;
    businessId: string;
    organization: string;
    year: string;
  }[];
  services: {
    id: string;
    name: string;
    businessId: string;
    description: string | null;
    price: string;
  }[];
  reviews: {
    id: string;
    rating: number;
    comment: string;
    businessId: string;
    likes: number;
    dislikes: number;
    createdAt: Date;
    updatedAt: Date;
  }[];
  averageRating: number;
}

interface ErrorResponse {
  error: string;
}

export async function getBusinessDetails(
  businessId: string,
): Promise<BusinessDetails | ErrorResponse> {
  if (!businessId) {
    return { error: "Missing businessId" };
  }

  try {
    const business = await prisma.business.findUnique({
      where: { id: businessId },
      include: {
        reviews: true, // Include reviews for star ratings
        achievements: true, // Include achievements if needed
        services: true, // Include services if needed
      },
    });

    if (!business) {
      return { error: "Business not found" };
    }

    const averageRating = business.reviews.length
      ? business.reviews.reduce(
          (acc: number, review: any) => acc + review.rating,
          0,
        ) / business.reviews.length
      : 0;

    const businessDetails: BusinessDetails = {
      ...business,
      averageRating,
    };

    return businessDetails;
  } catch (error) {
    console.error("Failed to fetch business details:", error);
    return { error: "Failed to fetch business details" };
  }
}
