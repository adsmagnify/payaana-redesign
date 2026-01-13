import { Metadata } from "next";
import { getGalleryImages } from "@/lib/sanity/queries";
import GalleryClient from "@/components/sections/GalleryClient";

export const metadata: Metadata = {
  title: "Gallery | Payaana",
  description:
    "Explore our collection of travel memories - adventure, nature, culture, and happy customers from around the world.",
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function GalleryPage() {
  const images = await getGalleryImages();

  const categoryLabels: Record<string, string> = {
    happyCustomers: "Happy Customers",
    schoolCollegeTrips: "School/College Trips",
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Enhanced Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-brand-purple rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-light-pink rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-secondary-green rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-light-pink">
              Gallery
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-8">
            Explore our collection of breathtaking travel memories from around
            the world
          </p>

          {/* Stats or Info Cards */}
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20">
              <div className="text-2xl font-bold text-white mb-1">
                {images.length}
              </div>
              <div className="text-sm text-white/80">Memories Captured</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20">
              <div className="text-2xl font-bold text-white mb-1">
                {
                  new Set(
                    images.map((img: { category: string }) => img.category)
                  ).size
                }
              </div>
              <div className="text-sm text-white/80">Categories</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20">
              <div className="text-2xl font-bold text-white mb-1">100%</div>
              <div className="text-sm text-white/80">Authentic Moments</div>
            </div>
          </div>
        </div>

        {/* Decorative Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden">
          <svg
            className="w-full h-12 md:h-20 block"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-16 -mt-1">
        <GalleryClient images={images} categoryLabels={categoryLabels} />
      </section>
    </main>
  );
}
