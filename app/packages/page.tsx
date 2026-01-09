import PackageSearchHero from "@/components/sections/PackageSearchHero";
import PackageSearchBar from "@/components/sections/PackageSearchBar";
import PackageCategorySection from "@/components/sections/PackageCategorySection";
import SearchResultsSection from "@/components/sections/SearchResultsSection";
import ConditionalCategorySections from "@/components/sections/ConditionalCategorySections";
import { getPackagesByCategoryWithDestinations, getPackages } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { Suspense } from "react";

export const revalidate = 60; // Revalidate every 60 seconds

// Helper function to transform Sanity packages to component format
function transformPackages(packages: any[]) {
  return packages.map((pkg) => ({
    _id: pkg._id,
    image: pkg.mainImage
      ? urlFor(pkg.mainImage).width(800).height(600).url()
      : "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    name: pkg.title,
    rating: 4, // Default rating - can be added to schema later
    reviews: 0, // Default reviews - can be added to schema later
    location: pkg.destination?.name || pkg.destination?.location || "Multiple Locations",
    duration: pkg.duration || "Custom Duration",
    slug: pkg.slug?.current || "",
  }));
}

async function SpecialisedDestinationsWrapper() {
  const packages = await getPackagesByCategoryWithDestinations("specialised");
  const transformed = transformPackages(packages);
  return (
    <PackageCategorySection
      title="Specialised Destination"
      subtitle="Unique and niche destinations for extraordinary travel experiences"
      packages={transformed}
      bgColor="white"
    />
  );
}

async function InternationalPackagesWrapper() {
  const packages = await getPackagesByCategoryWithDestinations("international");
  const transformed = transformPackages(packages);
  return (
    <PackageCategorySection
      title="International Holiday Packages"
      subtitle="Explore the world with our curated international travel packages"
      packages={transformed}
      bgColor="gray"
    />
  );
}

async function DomesticPackagesWrapper() {
  const packages = await getPackagesByCategoryWithDestinations("domestic");
  const transformed = transformPackages(packages);
  return (
    <PackageCategorySection
      title="Domestic Holiday Packages"
      subtitle="Discover the beauty of India with our domestic travel packages"
      packages={transformed}
      bgColor="white"
    />
  );
}

async function FixedDeparturesWrapper() {
  const packages = await getPackagesByCategoryWithDestinations("fixedDeparture");
  const transformed = transformPackages(packages);
  return (
    <PackageCategorySection
      title="Fixed Departures"
      subtitle="Join our scheduled group tours with fixed departure dates"
      packages={transformed}
      bgColor="gray"
    />
  );
}

async function AllPackagesWrapper() {
  const allPackages = await getPackages();
  return <SearchResultsSection packages={allPackages} />;
}

export default function PackagesPage() {
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <PackageSearchHero />

      {/* Search Bar Section */}
      <PackageSearchBar />

      {/* Search Results Section */}
      <section id="packages" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {/* Search Results - Only shows when there's a search query */}
          <Suspense
            fallback={
              <div className="mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-2xl overflow-hidden shadow-lg"
                    >
                      <div className="h-64 bg-gray-200 animate-pulse" />
                      <div className="p-6">
                        <div className="h-6 bg-gray-200 rounded mb-4 animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            }
          >
            <AllPackagesWrapper />
          </Suspense>
        </div>
      </section>

      {/* Category Sections - Only show when there's no search query */}
      <ConditionalCategorySections>
        {/* Specialised Destination Section */}
        <Suspense
          fallback={
            <section className="py-20 bg-white">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-2xl overflow-hidden shadow-lg"
                    >
                      <div className="h-64 bg-gray-200 animate-pulse" />
                      <div className="p-6">
                        <div className="h-6 bg-gray-200 rounded mb-4 animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          }
        >
          <SpecialisedDestinationsWrapper />
        </Suspense>

        {/* International Holiday Packages Section */}
        <Suspense
          fallback={
            <section className="py-20 bg-gradient-to-b from-white to-gray-50">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-2xl overflow-hidden shadow-lg"
                    >
                      <div className="h-64 bg-gray-200 animate-pulse" />
                      <div className="p-6">
                        <div className="h-6 bg-gray-200 rounded mb-4 animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          }
        >
          <InternationalPackagesWrapper />
        </Suspense>

        {/* Domestic Holiday Packages Section */}
        <Suspense
          fallback={
            <section className="py-20 bg-white">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-2xl overflow-hidden shadow-lg"
                    >
                      <div className="h-64 bg-gray-200 animate-pulse" />
                      <div className="p-6">
                        <div className="h-6 bg-gray-200 rounded mb-4 animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          }
        >
          <DomesticPackagesWrapper />
        </Suspense>

        {/* Fixed Departures Section */}
        <Suspense
          fallback={
            <section className="py-20 bg-gradient-to-b from-white to-gray-50">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-2xl overflow-hidden shadow-lg"
                    >
                      <div className="h-64 bg-gray-200 animate-pulse" />
                      <div className="p-6">
                        <div className="h-6 bg-gray-200 rounded mb-4 animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          }
        >
          <FixedDeparturesWrapper />
        </Suspense>
      </ConditionalCategorySections>
    </main>
  );
}
