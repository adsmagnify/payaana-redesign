import { getPackageBySlug, getPackages } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import PackageInquiryForm from "@/components/forms/PackageInquiryForm";
import PackageCard from "@/components/ui/PackageCard";
import { notFound } from "next/navigation";

export const revalidate = 60;

/* =========================
   Types
========================= */

type Destination = {
  name: string;
  slug?: {
    current: string;
  };
};

type ItineraryDay = {
  title?: string;
  description?: string;
};

type TravelPackage = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage?: any;
  duration?: string;
  price?: number;
  destination?: Destination;
  description?: string;
  highlights?: string[];
  itinerary?: ItineraryDay[];
  category?: string;
  type?: string;
  locations?: string[];
};

/* =========================
   Static Params
========================= */

export async function generateStaticParams() {
  const packages: TravelPackage[] = await getPackages();

  return packages.map((pkg) => ({
    slug: pkg.slug.current,
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
  const packageData: TravelPackage | null = await getPackageBySlug(params.slug);

  if (!packageData) {
    return {
      title: "Package Not Found | Payaana",
    };
  }

  return {
    title: `${packageData.title} | Payaana Travel Packages`,
    description:
      packageData.description ||
      `Explore ${packageData.title} with Payaana. ${packageData.duration ? `Duration: ${packageData.duration}.` : ""} ${packageData.price ? `Starting from ₹${packageData.price.toLocaleString()}.` : ""}`,
  };
}

/* =========================
   Page
========================= */

export default async function PackageDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const packageData: TravelPackage | null = await getPackageBySlug(params.slug);

  if (!packageData) {
    notFound();
  }

  const allPackages: TravelPackage[] = await getPackages();

  const relatedPackages = allPackages
    .filter((pkg) => pkg._id !== packageData._id)
    .slice(0, 3);

  const imageUrl = packageData.mainImage
    ? urlFor(packageData.mainImage).width(1920).height(1080).url()
    : null;

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {imageUrl && (
          <div className="absolute inset-0 z-0">
            <Image
              src={imageUrl}
              alt={packageData.title}
              fill
              className="object-cover opacity-30"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90" />
          </div>
        )}
        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Show locations for school/college trips, destination for others */}
          {(packageData.locations && packageData.locations.length > 0) ? (
            <div className="inline-block mb-6 px-5 py-2 bg-brand-purple/10 border-2 border-brand-purple/30 rounded-full shadow-md">
              <div className="text-white/90 text-sm font-medium uppercase tracking-wider flex items-center gap-2 justify-center">
                <svg
                  className="w-4 h-4"
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
                {packageData.locations.join(", ")}
              </div>
            </div>
          ) : packageData.destination ? (
            <div className="inline-block mb-6 px-5 py-2 bg-brand-purple/10 border-2 border-brand-purple/30 rounded-full shadow-md">
              <Link
                href={
                  packageData.destination.slug
                    ? `/destinations/${packageData.destination.slug.current}`
                    : "#"
                }
                className="text-white/90 hover:text-white transition-colors text-sm font-medium uppercase tracking-wider flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
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
                {packageData.destination.name}
              </Link>
            </div>
          ) : null}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
            {packageData.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            {packageData.description
              ? packageData.description.substring(0, 150) + "..."
              : "Experience an unforgettable journey with us"}
          </p>
        </div>
      </section>

      {/* Package Info Cards */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {packageData.duration && (
              <div className="bg-gradient-to-br from-brand-purple/5 to-brand-purple/10 rounded-2xl p-6 border border-brand-purple/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-purple rounded-xl flex items-center justify-center flex-shrink-0">
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
                  <div>
                    <p className="text-sm text-gray-600 font-medium">
                      Duration
                    </p>
                    <p className="text-xl font-bold text-gray-900 mt-1">
                      {packageData.duration}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {packageData.price && (
              <div className="bg-gradient-to-br from-brand-purple/5 to-brand-purple/10 rounded-2xl p-6 border border-brand-purple/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-purple rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">
                      Starting from
                    </p>
                    <p className="text-xl font-bold text-brand-purple mt-1">
                      ₹{packageData.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Show locations for school/college trips, destination for others */}
            {(packageData.locations && packageData.locations.length > 0) ? (
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
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
                      Locations
                    </p>
                    <p className="text-xl font-bold text-gray-900 mt-1">
                      {packageData.locations.join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            ) : packageData.destination ? (
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
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
                      Destination
                    </p>
                    <p className="text-xl font-bold text-gray-900 mt-1">
                      {packageData.destination.name}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* Description */}
      {packageData.description && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="inline-block mb-6 px-5 py-2 bg-brand-purple/10 border-2 border-brand-purple/30 rounded-full shadow-md">
                <span className="text-brand-purple font-semibold text-sm uppercase tracking-wider">
                  About This Package
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Package Overview
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                  {packageData.description}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Highlights */}
      {packageData.highlights && packageData.highlights.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                  Package Highlights
                </h2>
                <p className="text-lg text-gray-600">
                  Discover what makes this journey special
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {packageData.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
                  >
                    <div className="w-8 h-8 bg-brand-purple rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-base leading-relaxed">
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Itinerary */}
      {packageData.itinerary && packageData.itinerary.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                  Detailed Itinerary
                </h2>
                <p className="text-lg text-gray-600">
                  Day-by-day breakdown of your journey
                </p>
              </div>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-purple via-brand-purple to-transparent hidden md:block" />

                <div className="space-y-8">
                  {packageData.itinerary.map((day, index) => (
                    <div key={index} className="relative flex gap-6">
                      {/* Day number circle */}
                      <div className="hidden md:flex flex-shrink-0 w-16 h-16 bg-brand-purple rounded-full items-center justify-center z-10 shadow-lg">
                        <span className="text-white font-bold text-lg">
                          {index + 1}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="md:hidden w-10 h-10 bg-brand-purple rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold">
                              {index + 1}
                            </span>
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900">
                            Day {index + 1}
                          </h3>
                        </div>
                        {day.title && (
                          <h4 className="text-xl font-semibold text-brand-purple mb-3">
                            {day.title}
                          </h4>
                        )}
                        {day.description && (
                          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {day.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Inquiry Form */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                Inquire About This Package
              </h2>
              <p className="text-lg text-gray-600">
                Get in touch with us to book your dream vacation
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-200">
              <PackageInquiryForm
                packageName={packageData.title}
                packageId={packageData._id}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Related Packages */}
      {relatedPackages.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                You Might Also Like
              </h2>
              <p className="text-lg text-gray-600">
                Explore more amazing travel packages
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {relatedPackages.map((pkg) => (
                <PackageCard key={pkg._id} package={pkg} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
