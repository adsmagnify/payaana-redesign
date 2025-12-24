import Hero from '@/components/sections/Hero'
import WhyPayaana from '@/components/sections/WhyPayaana'
import FeaturedPackages from '@/components/sections/FeaturedPackages'
import Testimonials from '@/components/sections/Testimonials'

export const revalidate = 60 // Revalidate every 60 seconds

export default function Home() {
  return (
    <>
      <Hero />
      <div className="relative z-10 bg-white">
        <WhyPayaana />
        <FeaturedPackages />
        <Testimonials />
      </div>
    </>
  )
}

