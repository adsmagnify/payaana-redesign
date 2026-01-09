import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug, getServices } from "@/lib/sanity/queries";
import ServiceCard from "@/components/ui/ServiceCard";
import SafeImage from "@/components/ui/SafeImage";
import { urlFor } from "@/lib/sanity/image";

export const revalidate = 60;

/* =========================
   Types
========================= */

type Service = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  shortDescription: string;
  fullDescription?: string;
  icon?: any; // Can be Sanity image object, string path, or undefined
  iconEmoji?: string;
  colorGradient?: string;
  category?: string;
};

/* =========================
   Static Params
========================= */

export async function generateStaticParams() {
  const services: Service[] = await getServices();
  return services.map((service) => ({
    slug: service.slug.current,
  }));
}

/* =========================
   Metadata
========================= */

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service: Service | null = await getServiceBySlug(params.slug);

  if (!service) {
    return {
      title: "Service Not Found | Payaana",
    };
  }

  return {
    title: `${service.title} | Payaana Services`,
    description: service.shortDescription,
  };
}

/* =========================
   Page
========================= */

export default async function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const service: Service | null = await getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  const allServices: Service[] = await getServices();
  const relatedServices = allServices
    .filter((s) => s.slug.current !== params.slug)
    .slice(0, 3);

  // Check if icon is a Sanity image object
  const isSanityImage = service.icon && typeof service.icon === "object" && service.icon.asset;
  // Check if icon is a string path
  const isStringPath = typeof service.icon === "string" && service.icon.startsWith("/");
  // Get emoji fallback
  const emojiIcon = service.iconEmoji || (typeof service.icon === "string" && !service.icon.startsWith("/") ? service.icon : null) || "✨";
  
  // Get image URL if it's a Sanity image
  const imageUrl = isSanityImage ? urlFor(service.icon).width(600).height(600).url() : null;

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto mb-8">
            {/* White Box Container */}
            <div className="bg-white rounded-2xl p-3 shadow-2xl inline-block border-4 border-brand-purple">
              {isSanityImage && imageUrl ? (
                <div className="relative w-72 h-72 mx-auto">
                  <SafeImage
                    src={imageUrl}
                    alt={service.title}
                    fill
                    className="object-contain"
                    fallbackIcon={emojiIcon}
                    fallbackGradient={service.colorGradient || "from-blue-400 to-indigo-500"}
                  />
                </div>
              ) : isStringPath ? (
                <div className="relative w-72 h-72 mx-auto">
                  <SafeImage
                    src={service.icon}
                    alt={service.title}
                    fill
                    className="object-contain"
                    fallbackIcon={emojiIcon}
                    fallbackGradient={service.colorGradient || "from-blue-400 to-indigo-500"}
                  />
                </div>
              ) : (
                <div
                  className={`w-64 h-64 mx-auto bg-gradient-to-br ${
                    service.colorGradient || "from-blue-400 to-indigo-500"
                  } rounded-3xl flex items-center justify-center text-8xl shadow-lg`}
                >
                  {emojiIcon}
                </div>
              )}
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            {service.title}
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            {service.shortDescription}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-12">
            <div className="inline-block mb-4 px-4 py-1.5 bg-brand-purple/10 rounded-full">
              <span className="text-brand-purple font-semibold text-sm uppercase tracking-wider">
                {service.category || "Service"}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              About {service.title}
            </h2>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
              {service.fullDescription || service.shortDescription}
            </p>
          </div>

          {/* Key Features/Highlights */}
          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-brand-purple/5 to-brand-purple/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                What We Offer
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-brand-purple flex-shrink-0 mt-0.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Expert guidance and support</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-brand-purple flex-shrink-0 mt-0.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Competitive pricing and rates</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-brand-purple flex-shrink-0 mt-0.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Hassle-free processing</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-brand-purple flex-shrink-0 mt-0.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span>24/7 customer support</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Why Choose Us
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-brand-purple flex-shrink-0 mt-0.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Experienced and trained professionals</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-brand-purple flex-shrink-0 mt-0.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Wide network of partners and tie-ups</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-brand-purple flex-shrink-0 mt-0.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Personalized service tailored to your needs</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-brand-purple flex-shrink-0 mt-0.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Quick and efficient service delivery</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {relatedServices.length > 0 && (
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">
              Related Services
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedServices.map((related) => (
                <ServiceCard
                  key={related.slug.current}
                  service={{
                    ...related,
                    icon: related.icon || "✨",
                    colorGradient:
                      related.colorGradient || "from-blue-400 to-indigo-500",
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      )}

    </main>
  );
}
