import { getPackages } from '@/lib/sanity/queries'
import PackageFilters from '@/components/sections/PackageFilters'
import FilteredPackages from '@/components/sections/FilteredPackages'
import { Suspense } from 'react'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function PackagesPage() {
  const packages = await getPackages()

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Travel Packages</h1>
        <p className="text-gray-600 text-lg">
          Discover our curated selection of amazing travel experiences
        </p>
      </div>
      
      <Suspense fallback={
        <div className="bg-white p-6 rounded-lg shadow-sm mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        </div>
      }>
        <PackageFilters />
      </Suspense>
      
      <Suspense fallback={
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200 animate-pulse" />
              <div className="p-6">
                <div className="h-6 bg-gray-200 rounded mb-4 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      }>
        <FilteredPackages packages={packages} />
      </Suspense>
      
      {packages.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No packages found. Check back soon!</p>
        </div>
      )}
    </div>
  )
}

