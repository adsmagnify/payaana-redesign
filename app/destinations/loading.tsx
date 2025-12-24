export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-12">
        <div className="h-10 bg-gray-200 rounded w-64 mb-4 animate-pulse" />
        <div className="h-6 bg-gray-200 rounded w-96 animate-pulse" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-64 bg-gray-200 animate-pulse" />
            <div className="p-6">
              <div className="h-6 bg-gray-200 rounded mb-4 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

