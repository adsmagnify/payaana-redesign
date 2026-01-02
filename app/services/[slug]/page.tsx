import Link from "next/link";
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

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <div
            className={`w-32 h-32 mx-auto mb-8 bg-gradient-to-br ${
              service.colorGradient || "from-blue-400 to-indigo-500"
            } rounded-3xl flex items-center justify-center text-6xl shadow-2xl`}
          >
            {service.icon || "✨"}
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
          <h2 className="text-4xl font-bold mb-8 text-gray-900">
            About {service.title}
          </h2>
          <p className="text-gray-700 whitespace-pre-line">
            {service.fullDescription || service.shortDescription}
          </p>
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
