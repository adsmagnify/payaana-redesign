import Hero from "@/components/sections/Hero";
import WhyPayaana from "@/components/sections/WhyPayaana";
import PopularDestinations from "@/components/sections/PopularDestinations";
import FeaturedPackages from "@/components/sections/FeaturedPackages";
import { getPackages } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { Suspense } from "react";

export const revalidate = 60; // Revalidate every 60 seconds

async function FeaturedPackagesWrapper() {
  const packages = await getPackages();
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
      <PopularDestinations />
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
