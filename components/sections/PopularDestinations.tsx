'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function PopularDestinations() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const destinations = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
      name: 'Dubai',
      rating: 4,
      reviews: 15,
      location: 'Dubai',
      duration: '6 Day / 5 Nights',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800&q=80',
      name: 'Tokyo',
      rating: 5,
      reviews: 28,
      location: 'Tokyo',
      duration: '7 Day / 6 Nights',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
      name: 'Chicago',
      rating: 4,
      reviews: 12,
      location: 'Chicago',
      duration: '8 Day / 7 Nights',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
      name: 'Goa',
      rating: 5,
      reviews: 42,
      location: 'Goa',
      duration: '4 Day / 3 Nights',
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      name: 'Manali',
      rating: 4,
      reviews: 35,
      location: 'Manali',
      duration: '5 Day / 4 Nights',
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80',
      name: 'Kerala',
      rating: 5,
      reviews: 38,
      location: 'Kerala',
      duration: '5 Day / 4 Nights',
    },
  ]

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current
    if (!container) return
    
    const scrollAmount = 400
    const currentScroll = container.scrollLeft
    const maxScroll = container.scrollWidth - container.clientWidth
    const targetScroll = direction === 'left' 
      ? Math.max(0, currentScroll - scrollAmount)
      : Math.min(maxScroll, currentScroll + scrollAmount)
    
    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    })
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header with title and navigation arrows */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              Popular destination
            </h2>
            <p className="text-gray-600 text-lg">
              Discover amazing places to visit around the world
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                scroll('left')
              }}
              className="w-12 h-12 rounded-full bg-gray-100 hover:bg-brand-purple hover:text-white flex items-center justify-center transition-colors shadow-md cursor-pointer z-10"
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
                e.preventDefault()
                e.stopPropagation()
                scroll('right')
              }}
              className="w-12 h-12 rounded-full bg-gray-100 hover:bg-brand-purple hover:text-white flex items-center justify-center transition-colors shadow-md cursor-pointer z-10"
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

        {/* Scrollable destination cards */}
        <div className="overflow-hidden">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
          {destinations.map((destination) => (
            <Link
              key={destination.id}
              href="/packages"
              className="flex-shrink-0 w-80 group"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Image */}
                <div className="relative w-full h-64 overflow-hidden">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Destination Name */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {destination.name}
                  </h3>

                  {/* Rating and Reviews */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
                            i < destination.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      ({destination.reviews} reviews)
                    </span>
                  </div>

                  {/* Location and Duration */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-700">
                      <svg
                        className="w-5 h-5 text-brand-purple"
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
                      <span className="text-sm font-medium">{destination.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <svg
                        className="w-5 h-5 text-brand-purple"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm font-medium">{destination.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}

