"use client";

import Link from "next/link";

export default function PackageSearchHero() {
  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/packages-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center pt-24">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-5xl mx-auto text-center">
            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
              Discover Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-payaana-pink to-yellow-400">
                Dream
              </span>
              <br />
              Travel Package
            </h1>

            {/* Sub-headline */}
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-8">
              Explore curated travel experiences from around the world, tailored
              to create unforgettable memories
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="#packages"
                className="inline-flex items-center gap-2 px-8 py-4 bg-payaana-pink text-white font-semibold rounded-full hover:bg-payaana-pink-dark transition-all duration-300 hover:shadow-lg hover:shadow-payaana-pink/30"
              >
                Explore Packages
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border border-white/30 hover:bg-white/20 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
