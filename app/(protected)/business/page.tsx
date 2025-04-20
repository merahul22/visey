import getAllBusinesses from "@/actions/get-all-businesses";
import { Metadata } from "next";
import BusinessFilterComponent from "@/components/BusinessFilterComponent";

export const revalidate = 0; // Disable caching for this page

export const metadata: Metadata = {
  title: "Businesses | Visey",
  description: "Find businesses and services for your startup",
};

// Simple server component that doesn't rely on searchParams
export default async function Page() {
  // We'll just get all businesses and handle the filtering client-side
  const businesses = await getAllBusinesses() || [];
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Businesses</h1>
      
      {/* Client component for filtering */}
      <BusinessFilterComponent initialBusinesses={businesses} />
    </div>
  );
}