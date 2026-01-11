"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { handleSearchAction } from "@/lib/actions/search";

export default function PackageSearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    destination: searchParams.get("destination") || "",
    priceRange: searchParams.get("priceRange") || "",
    duration: searchParams.get("duration") || "",
  });

  // Update filters when URL params change
  useEffect(() => {
    setFilters({
      search: searchParams.get("search") || "",
      destination: searchParams.get("destination") || "",
      priceRange: searchParams.get("priceRange") || "",
      duration: searchParams.get("duration") || "",
    });
  }, [searchParams]);

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    // Update URL immediately for real-time filtering
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    const newUrl = params.toString()
      ? `/packages?${params.toString()}`
      : "/packages";
    router.push(newUrl, { scroll: false });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // If only search text is provided, try intelligent redirect
    if (filters.search && !filters.destination && !filters.priceRange && !filters.duration) {
      const result = await handleSearchAction(filters.search);
      if (result && result.url) {
        router.push(result.url);
        return;
      }
    }

    // Otherwise standard filter behavior
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    const newUrl = params.toString()
      ? `/packages?${params.toString()}`
      : "/packages";
    router.push(newUrl);
  };

  return (
    <section className="pt-10 -mb-20 mt-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Search Packages
          </h2>
          <p className="text-gray-600 text-lg">
            Find your perfect travel experience by searching for packages,
            destinations, or locations
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <input
                type="text"
                placeholder="Search packages..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination
              </label>
              <select
                value={filters.destination}
                onChange={(e) =>
                  handleFilterChange("destination", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-transparent"
              >
                <option value="">All Destinations</option>
                <option value="himachal">Himachal Pradesh</option>
                <option value="kerala">Kerala</option>
                <option value="goa">Goa</option>
                <option value="rajasthan">Rajasthan</option>
                <option value="ladakh">Ladakh</option>
                <option value="andaman">Andaman</option>
                <option value="ooty">Ooty</option>
                <option value="coorg">Coorg</option>
                <option value="sikkim">Sikkim</option>
                <option value="dubai">Dubai</option>
                <option value="thailand">Thailand</option>
                <option value="malaysia">Malaysia</option>
                <option value="sri lanka">Sri Lanka</option>
                <option value="singapore">Singapore</option>
                <option value="nepal">Nepal</option>
                <option value="bhutan">Bhutan</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <select
                value={filters.priceRange}
                onChange={(e) =>
                  handleFilterChange("priceRange", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-transparent"
              >
                <option value="">Any Price</option>
                <option value="0-10000">Under ₹10,000</option>
                <option value="10000-25000">₹10,000 - ₹25,000</option>
                <option value="25000-50000">₹25,000 - ₹50,000</option>
                <option value="50000+">Above ₹50,000</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration
              </label>
              <select
                value={filters.duration}
                onChange={(e) => handleFilterChange("duration", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-transparent"
              >
                <option value="">Any Duration</option>
                <option value="1-3">1-3 Days</option>
                <option value="4-7">4-7 Days</option>
                <option value="8-14">8-14 Days</option>
                <option value="15+">15+ Days</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-brand-purple hover:bg-brand-purple-dark text-white px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Search Packages</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
