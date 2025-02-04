"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SearchBusinessCard } from "@/components/cards/search-business-card";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams?.get("query") || "";
  const { data: session } = useSession();
  const router = useRouter();
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("businesses");

  useEffect(() => {
    if (!session) {
      router.push("/login");
      return;
    }

    const fetchBusinesses = async () => {
      const res = await fetch(`/api/search-businesses?query=${query}`);
      const data = await res.json();
      setBusinesses(data);
    };

    fetchBusinesses();
  }, [query, session, router]);

  return (
    <div className="p-4 md:p-6 md:ml-52">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">
            Search Results for &#34;{query}&#34;
          </h1>
          <div className="flex space-x-4">
            <Button
              variant={activeTab === "businesses" ? "default" : "outline"}
              onClick={() => setActiveTab("businesses")}
            >
              Businesses
            </Button>
            <Button
              variant={activeTab === "funding" ? "default" : "outline"}
              onClick={() => setActiveTab("funding")}
            >
              Funding Opportunities
            </Button>
          </div>
        </div>
        {activeTab === "businesses" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {businesses.length > 0 ? (
              businesses.map((business) => (
                <SearchBusinessCard key={business.id} business={business} />
              ))
            ) : (
              <p>No matching businesses found for &#34;{query}&#34;</p>
            )}
          </div>
        )}
        {activeTab === "funding" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Funding opportunities will be implemented later */}
            <p>Funding opportunities will be implemented later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
