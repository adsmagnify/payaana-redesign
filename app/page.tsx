import Hero from "@/components/sections/Hero";
import WhyPayaana from "@/components/sections/WhyPayaana";
import DestinationsSection from "@/components/sections/DestinationsSection";
import FeaturedPackages from "@/components/sections/FeaturedPackages";
import {
  getPopularDomesticDestinations,
  getPopularInternationalDestinations,
  getFeaturedPackages,
} from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { Suspense } from "react";

export const revalidate = 60; // Revalidate every 60 seconds

async function DomesticDestinationsWrapper() {
  const destinations = await getPopularDomesticDestinations();
  return (
    <DestinationsSection
      destinations={destinations}
      title="Popular Domestic Holiday Destinations"
      subtitle="Explore amazing destinations within India"
    />
  );
}

async function InternationalDestinationsWrapper() {
  const destinations = await getPopularInternationalDestinations();
  return (
    <DestinationsSection
      destinations={destinations}
      title="Popular International Holiday Destinations"
      subtitle="Discover incredible places around the world"
    />
  );
}

async function FeaturedPackagesWrapper() {
  const packages = await getFeaturedPackages();
  // Process packages to add image URLs
  const processedPackages = packages.map((pkg: any) => ({
    ...pkg,
    imageUrl: pkg.mainImage
      ? urlFor(pkg.mainImage).width(800).height(600).url()
      : null,
  }));
  return <FeaturedPackages packages={processedPackages} />;
}

export default function Home() {
  return (
    <>
      <Hero />

      <WhyPayaana />

      <Suspense
        fallback={
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="flex gap-6 overflow-x-auto pb-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-80 bg-white rounded-2xl overflow-hidden shadow-lg"
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
        <DomesticDestinationsWrapper />
      </Suspense>

      <Suspense
        fallback={
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="flex gap-6 overflow-x-auto pb-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-80 bg-white rounded-2xl overflow-hidden shadow-lg"
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
        <InternationalDestinationsWrapper />
      </Suspense>

      <Suspense
        fallback={
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="flex gap-6 overflow-x-auto pb-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-80 bg-white rounded-2xl overflow-hidden shadow-lg"
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
        <FeaturedPackagesWrapper />
      </Suspense>
    </>
  );
}
