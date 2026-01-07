import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import Card from './Card'

interface Package {
  _id: string
  title: string
  slug: { current: string }
  mainImage?: any
  price?: number
  duration?: string
  description?: string
}

interface PackageCardProps {
  package: Package
}

export default function PackageCard({ package: pkg }: PackageCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <Link href={`/packages/${pkg.slug.current}`}>
        <div className="relative h-48 bg-gray-200">
          {pkg.mainImage ? (
            <Image
              src={urlFor(pkg.mainImage).width(600).height(400).url()}
              alt={pkg.title}
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
          <h3 className="text-xl font-bold mb-2 text-gray-900">{pkg.title}</h3>
          <div className="flex items-center justify-between mb-4">
            {pkg.duration && (
              <span className="text-sm text-gray-600">{pkg.duration}</span>
            )}
            {pkg.price && (
              <span className="text-lg font-semibold text-brand-purple">
                ₹{pkg.price.toLocaleString()}
              </span>
            )}
          </div>
          {pkg.description && (
            <p className="text-gray-600 text-sm line-clamp-2">
              {pkg.description.replace(/<[^>]*>/g, '').substring(0, 100)}...
            </p>
          )}
        </div>
      </Link>
    </Card>
  )
}

