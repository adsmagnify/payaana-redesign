"use client";

import { useState } from "react";
import Link from "next/link";

export default function SchoolTripsBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-brand-purple via-brand-purple-dark to-brand-purple text-white py-3 px-4 shadow-lg z-50">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="flex-shrink-0">
            <span className="text-2xl">🎓</span>
          </div>
          <div className="flex-1">
            <p className="text-sm md:text-base font-semibold">
              Introducing{" "}
              <Link
                href="/services/school-college-trips"
                className="underline hover:text-light-pink transition-colors font-bold"
              >
                School/College Trips and Camps
              </Link>
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="flex-shrink-0 p-1 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Close banner"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
