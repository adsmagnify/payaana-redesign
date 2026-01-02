import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug, getServices } from "@/lib/sanity/queries";
import { services as fallbackServices } from "@/lib/data/services";
import ServiceCard from "@/components/ui/ServiceCard";

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
  icon: string;
  colorGradient?: string;
  category?: string;
};

/* =========================
   Helpers
========================= */

function normalizeFallbackService(service: any): Service {
  return {
    _id: service.slug,
    title: service.title,
    slug: { current: service.slug },
    shortDescription: service.shortDescription,
    fullDescription: service.fullDescription,
    icon: service.icon || "✨",
    colorGradient: service.colorGradient,
    category: service.category,
  };
}

/* =========================
   Static Params
========================= */

export async function generateStaticParams() {
  let services: Service[] = await getServices();

  if (!services || services.length === 0) {
    services = fallbackServices.map(normalizeFallbackService);
  }

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
  let service: Service | null = await getServiceBySlug(params.slug);

  if (!service) {
    const fallback = fallbackServices.find((s) => s.slug === params.slug);
    if (fallback) {
      service = normalizeFallbackService(fallback);
    }
  }

  if (!service) {
    notFound();
  }

  let allServices: Service[] = await getServices();
  if (!allServices || allServices.length === 0) {
    allServices = fallbackServices.map(normalizeFallbackService);
  }

  const relatedServices = allServices
    .filter((s) => s.slug.current !== params.slug)
    .slice(0, 3);

  const isImageIcon = service.icon?.startsWith("/");

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto mb-8">
            {/* White Box Container */}
            <div className="bg-white rounded-2xl p-3 shadow-2xl inline-block border-4 border-payaana-pink">
              {isImageIcon ? (
                <div className="relative w-72 h-72 mx-auto">
                  <Image
                    src={service.icon}
                    alt={service.title}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div
                  className={`w-64 h-64 mx-auto bg-gradient-to-br ${
                    service.colorGradient || "from-blue-400 to-indigo-500"
                  } rounded-3xl flex items-center justify-center text-8xl shadow-lg`}
                >
                  {service.icon || "✨"}
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
            <div className="inline-block mb-4 px-4 py-1.5 bg-payaana-pink/10 rounded-full">
              <span className="text-payaana-pink font-semibold text-sm uppercase tracking-wider">
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
            <div className="bg-gradient-to-br from-payaana-pink/5 to-rose-500/5 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                What We Offer
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-payaana-pink flex-shrink-0 mt-0.5"
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
                    className="w-6 h-6 text-payaana-pink flex-shrink-0 mt-0.5"
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
                    className="w-6 h-6 text-payaana-pink flex-shrink-0 mt-0.5"
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
                    className="w-6 h-6 text-payaana-pink flex-shrink-0 mt-0.5"
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
                    className="w-6 h-6 text-payaana-pink flex-shrink-0 mt-0.5"
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
                    className="w-6 h-6 text-payaana-pink flex-shrink-0 mt-0.5"
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
                    className="w-6 h-6 text-payaana-pink flex-shrink-0 mt-0.5"
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
                    className="w-6 h-6 text-payaana-pink flex-shrink-0 mt-0.5"
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

      {/* CTA */}
      <section className="py-24 bg-payaana-pink text-center text-white">
        <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-lg mb-8">
          We&apos;re here to make your journey smooth and hassle-free.
        </p>
        <div className="flex justify-center gap-6">
          <Link
            href="/contact"
            className="px-10 py-4 bg-white text-payaana-pink font-bold rounded-full"
          >
            Contact Us
          </Link>
          <Link
            href="/packages"
            className="px-10 py-4 border-2 border-white rounded-full"
          >
            Browse Packages
          </Link>
        </div>
      </section>
    </main>
  );
}
