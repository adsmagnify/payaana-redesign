"use client";

import { useSearchParams } from "next/navigation";
import FilteredPackages from "./FilteredPackages";

interface SearchResultsSectionProps {
  packages: any[];
}

export default function SearchResultsSection({
  packages,
}: SearchResultsSectionProps) {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  // Only show search results if there's a search query
  if (!search || !search.trim()) {
    return null;
  }

  // Transform packages to match FilteredPackages interface
  const transformedPackages = packages.map((pkg: any) => ({
    _id: pkg._id,
    title: pkg.title,
    slug: pkg.slug,
    mainImage: pkg.mainImage,
    price: pkg.price,
    duration: pkg.duration,
    description: pkg.description,
    destination: pkg.destination,
  }));

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Search Results for &quot;{search}&quot;
      </h3>
      <FilteredPackages packages={transformedPackages} />
    </div>
  );
}
