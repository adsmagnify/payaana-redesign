import Link from "next/link";
import Image from "next/image";

// Service type that works with both Sanity and static data
type ServiceData = {
  _id?: string;
  slug: string | { current: string };
  title: string;
  shortDescription: string;
  fullDescription?: string;
  icon: string;
  colorGradient: string;
  category?: string;
};

interface ServiceCardProps {
  service: ServiceData;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  // Handle both slug formats: string or { current: string }
  const slug =
    typeof service.slug === "string"
      ? service.slug
      : service.slug?.current || "";

  const isImageIcon = service.icon.startsWith("/");

  return (
    <Link href={`/services/${slug}`} className="block h-full">
      <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden h-full text-center">
        {/* Gradient background on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${service.colorGradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
        />

        {/* Icon */}
        <div className="mx-auto transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
          {isImageIcon ? (
            <div className="relative w-48 h-48 mx-auto">
              <Image
                src={service.icon}
                alt={service.title}
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <div
              className={`w-32 h-32 mx-auto bg-gradient-to-br ${service.colorGradient} rounded-2xl flex items-center justify-center text-6xl shadow-lg`}
            >
              {service.icon}
            </div>
          )}
        </div>

        <h3 className="text-2xl font-bold text-gray-900 -mt-7 mb-3 group-hover:text-payaana-pink transition-colors">
          {service.title}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {service.shortDescription}
        </p>
      </div>
    </Link>
  );
}
