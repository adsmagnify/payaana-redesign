import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import Card from './Card'

interface Destination {
  _id: string
  name: string
  slug: { current: string }
  mainImage?: any
  description?: string
}

interface DestinationCardProps {
  destination: Destination
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <Link href={`/destinations/${destination.slug.current}`}>
        <div className="relative h-64 bg-gray-200">
          {destination.mainImage ? (
            <Image
              src={urlFor(destination.mainImage).width(600).height(400).url()}
              alt={destination.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-gray-900">{destination.name}</h3>
          {destination.description && (
            <p className="text-gray-600 text-sm line-clamp-3">
              {destination.description.replace(/<[^>]*>/g, '').substring(0, 150)}...
            </p>
          )}
        </div>
      </Link>
    </Card>
  )
}

