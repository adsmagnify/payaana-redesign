'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import PackageCard from '@/components/ui/PackageCard'

interface Package {
  _id: string
  title: string
  slug: { current: string }
  mainImage?: any
  price?: number
  duration?: string
  description?: string
  destination?: {
    name: string
    slug: { current: string }
  }
}

interface FilteredPackagesProps {
  packages: Package[]
}

export default function FilteredPackages({ packages }: FilteredPackagesProps) {
  const searchParams = useSearchParams()
  
  const filteredPackages = useMemo(() => {
    let filtered = [...packages]
    
    const search = searchParams.get('search')
    if (search) {
      const searchLower = search.toLowerCase()
      filtered = filtered.filter(
        (pkg) =>
          pkg.title.toLowerCase().includes(searchLower) ||
          pkg.description?.toLowerCase().includes(searchLower) ||
          pkg.destination?.name.toLowerCase().includes(searchLower)
      )
    }
    
    const destination = searchParams.get('destination')
    if (destination) {
      filtered = filtered.filter(
        (pkg) => pkg.destination?.name.toLowerCase().includes(destination.toLowerCase())
      )
    }
    
    const priceRange = searchParams.get('priceRange')
    if (priceRange && priceRange !== '') {
      filtered = filtered.filter((pkg) => {
        if (!pkg.price) return false
        if (priceRange === '0-10000') return pkg.price <= 10000
        if (priceRange === '10000-25000') return pkg.price > 10000 && pkg.price <= 25000
        if (priceRange === '25000-50000') return pkg.price > 25000 && pkg.price <= 50000
        if (priceRange === '50000+') return pkg.price > 50000
        return true
      })
    }
    
    const duration = searchParams.get('duration')
    if (duration && duration !== '') {
      filtered = filtered.filter((pkg) => {
        if (!pkg.duration) return false
        const days = parseInt(pkg.duration.split(' ')[0] || '0')
        if (duration === '1-3') return days >= 1 && days <= 3
        if (duration === '4-7') return days >= 4 && days <= 7
        if (duration === '8-14') return days >= 8 && days <= 14
        if (duration === '15+') return days >= 15
        return true
      })
    }
    
    return filtered
  }, [packages, searchParams])

  if (filteredPackages.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">No packages found matching your filters.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
      {filteredPackages.map((pkg) => (
        <PackageCard key={pkg._id} package={pkg} />
      ))}
    </div>
  )
}

