"use client";

import { useEffect, useRef } from "react";
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
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only scroll on initial load if there is a search param
    // This prevents annoying scrolling while typing in the search bar on the packages page
    if (search && sectionRef.current) {
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <div ref={sectionRef} className="mt-12 scroll-mt-24">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Search Results for &quot;{search}&quot;
      </h3>
      <FilteredPackages packages={transformedPackages} />
    </div>
  );
}
