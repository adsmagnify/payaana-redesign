'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/image'

interface Destination {
  _id: string
  name: string
  slug: { current: string }
  mainImage?: any
  description?: string
  location?: string
}

interface DestinationsSectionProps {
  destinations: Destination[]
  title: string
  subtitle?: string
}

export default function DestinationsSection({ destinations, title, subtitle }: DestinationsSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

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

  if (!destinations || destinations.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header with title and navigation arrows */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className="text-gray-600 text-lg">
                {subtitle}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => {
                e.preventDefault()
                scroll('left')
              }}
              className="w-12 h-12 rounded-full bg-gray-100 hover:bg-brand-purple hover:text-white flex items-center justify-center transition-colors shadow-md cursor-pointer z-10"
              aria-label="Scroll left"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                scroll('right')
              }}
              className="w-12 h-12 rounded-full bg-gray-100 hover:bg-brand-purple hover:text-white flex items-center justify-center transition-colors shadow-md cursor-pointer z-10"
              aria-label="Scroll right"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
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
            {destinations.map((destination) => {
              const imageUrl = destination.mainImage
                ? urlFor(destination.mainImage).width(800).height(600).url()
                : 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80'
              
              return (
                <Link
                  key={destination._id}
                  href={`/destinations/${destination.slug.current}`}
                  className="flex-shrink-0 w-80 group"
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    {/* Image */}
                    <div className="relative w-full h-64 overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={destination.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Destination Name */}
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-brand-purple transition-colors">
                        {destination.name}
                      </h3>

                      {/* Location */}
                      {destination.location && (
                        <div className="flex items-center gap-2 text-gray-600 mb-3">
                          <svg
                            className="w-5 h-5 text-brand-purple flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span className="text-sm">{destination.location}</span>
                        </div>
                      )}

                      {/* Description */}
                      {destination.description && (
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {destination.description}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

