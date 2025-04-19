import prisma from "@/lib/db";

/**
 * Fetch businesses filtered by category tags.
 * @param tags - Array of tags to filter businesses by.
 * @returns Filtered businesses.
 */
async function filterBusinessesByTags(tags: string[]) {
  try {
    // Log for debugging
    console.log("Filtering with tags:", tags);
    
    // Normalize tags to lowercase for case-insensitive matching
    const normalizedTags = tags.map(tag => tag.toLowerCase());
    
    // First attempt: direct matching using hasSome
    let businesses = await prisma.business.findMany({
      where: {
        categoryTags: {
          hasSome: normalizedTags,
        },
      },
    });
    
    // If no businesses found, try a more flexible approach with string contains
    if (businesses.length === 0) {
      // Get all businesses
      const allBusinesses = await prisma.business.findMany();
      console.log(`Fallback: Got ${allBusinesses.length} total businesses`);
      
      // Filter manually to search for partial matches in tags
      businesses = allBusinesses.filter(business => {
        // Check if any of the business's tags contains any of our search tags
        return business.categoryTags.some(businessTag => {
          const lowercaseBusinessTag = businessTag.toLowerCase();
          return normalizedTags.some(searchTag => 
            lowercaseBusinessTag.includes(searchTag) || 
            searchTag.includes(lowercaseBusinessTag)
          );
        });
      });
    }
    
    console.log(`Found ${businesses.length} matching businesses`);
    
    // For debugging: log all businesses and their tags
    if (businesses.length === 0) {
      const allBusinesses = await prisma.business.findMany({
        select: { id: true, name: true, categoryTags: true }
      });
      console.log("All businesses and their tags:", JSON.stringify(allBusinesses, null, 2));
    }
    
    return businesses;
  } catch (error) {
    console.error("Error fetching filtered businesses:", error);
    return [];
  }
}

export default filterBusinessesByTags;