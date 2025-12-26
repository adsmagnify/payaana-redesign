"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

type Package = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage?: any;
  price?: number;
  duration?: string;
  destination?: {
    name: string;
  };
};

interface FeaturedPackagesProps {
  packages: Package[];
}

export default function FeaturedPackages({ packages }: FeaturedPackagesProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Use mock data if no packages from Sanity
  const featuredPackages =
    packages.length > 0
      ? packages.slice(0, 6)
      : [
          {
            _id: "1",
            title: "Dubai Adventure",
            slug: { current: "dubai-adventure" },
            mainImage: null,
            imageUrl:
              "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
            price: 45000,
            duration: "6 Day / 5 Nights",
            destination: { name: "Dubai" },
            rating: 4,
            reviews: 15,
          },
          {
            _id: "2",
            title: "Tokyo Discovery",
            slug: { current: "tokyo-discovery" },
            mainImage: null,
            imageUrl:
              "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
            price: 67000,
            duration: "7 Day / 6 Nights",
            destination: { name: "Tokyo" },
            rating: 5,
            reviews: 28,
          },
          {
            _id: "3",
            title: "Goa Beach Paradise",
            slug: { current: "goa-beach-paradise" },
            mainImage: null,
            imageUrl:
              "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
            price: 12000,
            duration: "4 Day / 3 Nights",
            destination: { name: "Goa" },
            rating: 5,
            reviews: 42,
          },
          {
            _id: "4",
            title: "Manali Mountain Escape",
            slug: { current: "manali-mountain-escape" },
            mainImage: null,
            imageUrl:
              "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
            price: 18000,
            duration: "5 Day / 4 Nights",
            destination: { name: "Manali" },
            rating: 4,
            reviews: 35,
          },
          {
            _id: "5",
            title: "Kerala Backwaters",
            slug: { current: "kerala-backwaters" },
            mainImage: null,
            imageUrl:
              "https://images.unsplash.com/photo-1539650116574-75c0c6d73aa6?w=800&q=80",
            price: 15000,
            duration: "5 Day / 4 Nights",
            destination: { name: "Kerala" },
            rating: 5,
            reviews: 38,
          },
          {
            _id: "6",
            title: "Chicago City Tour",
            slug: { current: "chicago-city-tour" },
            mainImage: null,
            imageUrl:
              "https://images.unsplash.com/photo-1494522358652-f3ccd6c73ea3?w=800&q=80",
            price: 89000,
            duration: "8 Day / 7 Nights",
            destination: { name: "Chicago" },
            rating: 4,
            reviews: 12,
          },
        ];

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 400;
    const currentScroll = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const targetScroll =
      direction === "left"
        ? Math.max(0, currentScroll - scrollAmount)
        : Math.min(maxScroll, currentScroll + scrollAmount);

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header with title and navigation arrows */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              Featured Packages
            </h2>
            <p className="text-gray-600 text-lg">
              Handpicked travel experiences designed to create lasting memories
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                scroll("left");
              }}
              className="w-12 h-12 rounded-full bg-gray-100 hover:bg-payaana-pink hover:text-white flex items-center justify-center transition-colors shadow-md cursor-pointer z-10"
              aria-label="Scroll left"
              type="button"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                scroll("right");
              }}
              className="w-12 h-12 rounded-full bg-gray-100 hover:bg-payaana-pink hover:text-white flex items-center justify-center transition-colors shadow-md cursor-pointer z-10"
              aria-label="Scroll right"
              type="button"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable package cards */}
        <div className="overflow-hidden">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {featuredPackages.map((pkg) => {
              // Get image URL - use processed URL from server or placeholder
              const imageUrl =
                (pkg as any).imageUrl ||
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80";
              const rating = (pkg as any).rating || 4;
              const reviews = (pkg as any).reviews || 15;

              return (
                <Link
                  key={pkg._id}
                  href={`/packages/${pkg.slug.current}`}
                  className="flex-shrink-0 w-80 group"
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    {/* Image */}
                    <div className="relative w-full h-64 overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={pkg.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Package Title */}
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {pkg.title}
                      </h3>

                      {/* Rating and Reviews */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-5 h-5 ${
                                i < rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          ({reviews} reviews)
                        </span>
                      </div>

                      {/* Location and Duration */}
                      <div className="space-y-2 mb-4">
                        {pkg.destination && (
                          <div className="flex items-center gap-2 text-gray-700">
                            <svg
                              className="w-5 h-5 text-payaana-pink"
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
                            <span className="text-sm font-medium">
                              {pkg.destination.name}
                            </span>
                          </div>
                        )}
                        {pkg.duration && (
                          <div className="flex items-center gap-2 text-gray-700">
                            <svg
                              className="w-5 h-5 text-payaana-pink"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm font-medium">
                              {pkg.duration}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Price */}
                      {pkg.price && (
                        <div className="pt-3 border-t border-gray-200">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                              Starting from
                            </span>
                            <span className="text-2xl font-bold text-payaana-pink">
                              ₹{pkg.price.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
