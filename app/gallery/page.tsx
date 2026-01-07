'use client'

import { useState } from 'react'
import Image from 'next/image'
import Modal from '@/components/ui/Modal'

// Placeholder gallery images - in production, these would come from Sanity
const galleryImages = [
  { id: 1, src: '/images/gallery-1.jpg', alt: 'Travel destination 1', category: 'Adventure' },
  { id: 2, src: '/images/gallery-2.jpg', alt: 'Travel destination 2', category: 'Nature' },
  { id: 3, src: '/images/gallery-3.jpg', alt: 'Travel destination 3', category: 'Culture' },
  { id: 4, src: '/images/gallery-4.jpg', alt: 'Travel destination 4', category: 'Adventure' },
  { id: 5, src: '/images/gallery-5.jpg', alt: 'Travel destination 5', category: 'Nature' },
  { id: 6, src: '/images/gallery-6.jpg', alt: 'Travel destination 6', category: 'Culture' },
]

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null)
  const [filter, setFilter] = useState<string>('All')

  const categories = ['All', ...Array.from(new Set(galleryImages.map(img => img.category)))]
  const filteredImages = filter === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter)

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Gallery</h1>
        <p className="text-gray-600 text-lg">
          Explore our collection of travel memories
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-6 py-2 rounded-full transition-colors ${
              filter === category
                ? 'bg-brand-purple text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.map((image) => (
          <div
            key={image.id}
            className="relative aspect-square cursor-pointer overflow-hidden rounded-lg group"
            onClick={() => setSelectedImage(image)}
          >
            <div className="relative w-full h-full bg-gray-200">
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  View
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <Modal isOpen={!!selectedImage} onClose={() => setSelectedImage(null)}>
          <div className="relative w-full h-full max-w-4xl max-h-[90vh] mx-auto">
            <div className="relative w-full h-full bg-gray-200 rounded-lg">
              <p className="text-center text-gray-600 p-8">
                Image: {selectedImage.alt}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

