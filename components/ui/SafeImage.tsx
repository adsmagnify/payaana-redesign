"use client";

import Image from "next/image";
import { useState } from "react";

interface SafeImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  fallbackIcon?: string;
  fallbackGradient?: string;
}

export default function SafeImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className = "",
  fallbackIcon = "✨",
  fallbackGradient = "from-blue-400 to-indigo-500",
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`w-full h-full bg-gradient-to-br ${fallbackGradient} rounded-3xl flex items-center justify-center text-6xl shadow-lg ${className}`}
      >
        {fallbackIcon}
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        onError={() => setHasError(true)}
        unoptimized
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setHasError(true)}
      unoptimized
    />
  );
}
