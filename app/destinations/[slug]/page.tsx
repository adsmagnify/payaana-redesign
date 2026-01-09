import { getDestinationBySlug, getDestinations } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import PackageCard from "@/components/ui/PackageCard";
import { notFound } from "next/navigation";

export const revalidate = 60;

/* =========================
   Types
========================= */

type Package = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage?: any;
  price?: number;
  duration?: string;
};

type Destination = {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  mainImage?: any;
  description?: string;
  location?: string;
  type?: string;
  isPopular?: boolean;
  featuredPackages?: Package[];
};

/* =========================
   Static Params
========================= */

export async function generateStaticParams() {
  const destinations: Destination[] = await getDestinations();

  return destinations.map((destination) => ({
    slug: destination.slug.current,
  }));
}

/* =========================
   Metadata
========================= */

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const destination: Destination | null = await getDestinationBySlug(
    params.slug
  );

  if (!destination) {
    return {
      title: "Destination Not Found | Payaana",
    };
  }

  return {
    title: `${destination.name} | Payaana Travel Destinations`,
    description:
      destination.description ||
      `Explore ${destination.name} with Payaana. ${destination.location ? `Located in ${destination.location}.` : ""} Discover amazing travel packages and experiences.`,
  };
}

/* =========================
   Page
========================= */

export default async function DestinationDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const destination: Destination | null = await getDestinationBySlug(
    params.slug
  );

  if (!destination) {
    notFound();
  }

  const imageUrl = destination.mainImage
    ? urlFor(destination.mainImage).width(1920).height(1080).url()
    : null;

  const typeLabel =
    destination.type === "domestic" ? "Domestic" : "International";

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {imageUrl && (
          <div className="absolute inset-0 z-0">
            <Image
              src={imageUrl}
              alt={destination.name}
              fill
              className="object-cover opacity-30"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90" />
          </div>
        )}
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {destination.type && (
              <div className="inline-block px-4 py-1.5 bg-brand-purple/20 rounded-full border border-brand-purple/30">
                <span className="text-white/90 text-sm font-medium uppercase tracking-wider flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {destination.type === "domestic" ? (
                      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    ) : (
                      <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    )}
                  </svg>
                  {typeLabel}
                </span>
              </div>
            )}
            {destination.isPopular && (
              <div className="inline-block px-4 py-1.5 bg-yellow-500/20 rounded-full border border-yellow-500/30">
                <span className="text-yellow-300 text-sm font-medium uppercase tracking-wider flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Popular Destination
                </span>
              </div>
            )}
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
            {destination.name}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            {destination.description
              ? destination.description.substring(0, 150) + "..."
              : "Discover an amazing destination with us"}
          </p>
        </div>
      </section>

      {/* Destination Info Cards */}
      {destination.location && (
        <section className="py-12 bg-white border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-secondary-green/5 to-secondary-green/10 rounded-2xl p-6 border border-secondary-green/20 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary-green rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">
                      Location
                    </p>
                    <p className="text-xl font-bold text-gray-900 mt-1">
                      {destination.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Description */}
      {destination.description && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="inline-block mb-6 px-4 py-1.5 bg-brand-purple/10 rounded-full">
                <span className="text-brand-purple font-semibold text-sm uppercase tracking-wider">
                  About {destination.name}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Destination Overview
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                  {destination.description}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why Visit Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                Why Visit {destination.name}?
              </h2>
              <p className="text-lg text-gray-600">
                Discover what makes this destination special
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-brand-purple rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Unique Experiences
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {destination.name} offers a blend of culture, adventure, and
                  natural beauty that creates unforgettable memories for every
                  traveler.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-secondary-green rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Expert Guidance
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Our carefully curated packages ensure you experience the best
                  of {destination.name} with local insights and seamless
                  planning.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-brand-purple rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Flexible Itineraries
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Choose from a variety of packages tailored to your
                  preferences, whether you seek relaxation, adventure, or
                  cultural immersion.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-secondary-green rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Memorable Moments
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Create lasting memories with experiences designed to showcase
                  the authentic charm and beauty of {destination.name}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      {destination.featuredPackages &&
        destination.featuredPackages.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                  Packages in {destination.name}
                </h2>
                <p className="text-lg text-gray-600">
                  Explore our curated travel packages for this destination
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {destination.featuredPackages.map((pkg) => (
                  <PackageCard key={pkg._id} package={pkg} />
                ))}
              </div>
            </div>
          </section>
        )}
    </main>
  );
}
