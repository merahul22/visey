import filterBusinessesByTags from "@/actions/filter-businesses";
import getAllBusinesses from "@/actions/get-all-businesses";
import { BusinessCard } from "@/components/cards/business-card";
import { Business } from "@prisma/client";

export const revalidate = 0; // Disable caching for this page

// Next.js page component with the exact expected signature
const BusinessPage = async ({
  params,
  searchParams,
}: {
  // Using Record<never, never> instead of {} to avoid ESLint empty object type warning
  params: Record<never, never>; 
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  // Fix for searchParams - using it directly in an async component, properly handling types
  const tagsString = typeof searchParams.tags === 'string' ? searchParams.tags : '';
  const tags = tagsString ? tagsString.split(",").filter(tag => tag.trim() !== "") : [];
  
  console.log("Filtering businesses with tags:", tags); // Debug log
  
  // If tags are provided, filter businesses by tags; otherwise, get all businesses
  let businesses: Business[] = [];
  
  try {
    if (tags.length > 0) {
      businesses = await filterBusinessesByTags(tags);
      console.log(`Found ${businesses.length} businesses with tags:`, tags);
    } else {
      businesses = await getAllBusinesses() || [];
      console.log(`Found ${businesses.length} businesses (all businesses)`);
    }
  } catch (error) {
    console.error("Error fetching businesses:", error);
  }

  // Get the category name from the first tag for the heading
  const categoryName = tags.length > 0 ? tags[0].charAt(0).toUpperCase() + tags[0].slice(1) : "All Businesses";

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{categoryName}</h1>
      {businesses && businesses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {businesses.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
      ) : (
        <p>No businesses found for the selected category.</p>
      )}
    </div>
  );
};

export default BusinessPage;