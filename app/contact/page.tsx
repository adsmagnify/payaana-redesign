import { Metadata } from "next";
import ContactForm from "@/components/forms/ContactForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us | Payaana",
  description:
    "Get in touch with Payaana Travels. We're here to help you plan your perfect journey. Contact us for inquiries, bookings, and travel assistance.",
};

export default function ContactPage() {
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-brand-purple rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-light-pink rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-secondary-green rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
            Get in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-light-pink">
              Touch
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Have questions? We&apos;d love to hear from you. Send us a message
            and we&apos;ll respond as soon as possible.
          </p>
        </div>

        {/* Decorative Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden">
          <svg
            className="w-full h-12 md:h-20 block"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 bg-white -mt-1">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                    Let&apos;s Start a Conversation
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    We&apos;re here to help you plan your perfect journey. Reach
                    out to us through any of the following channels, and our
                    team will get back to you promptly.
                  </p>
                </div>

                {/* Contact Cards */}
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-brand-purple/5 to-brand-purple/10 rounded-2xl p-6 border border-brand-purple/20 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-brand-purple rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          Email
                        </h3>
                        <a
                          href="mailto:pravita@payaana.in"
                          className="text-brand-purple hover:text-brand-purple/80 transition-colors"
                        >
                          pravita@payaana.in
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-secondary-green/5 to-secondary-green/10 rounded-2xl p-6 border border-secondary-green/20 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-secondary-green rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          Phone
                        </h3>
                        <a
                          href="tel:+91-9632203005"
                          className="text-secondary-green hover:text-secondary-green/80 transition-colors"
                        >
                          +91 9632203005
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          Address
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          50-12/1 Vishnu Vardhan Main Road (Uttarahalli Main
                          Road), Opp DR Complex Subramanyapura Post Uttarahalli
                          Bengaluru - 560061, Karnataka, India
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Links or Additional Info */}
                <div className="pt-6 border-t border-gray-200">
                  <p className="text-gray-600 mb-4">Follow us on:</p>
                  <div className="flex gap-4">
                    {/* Add social media links here if needed */}
                    <p className="text-sm text-gray-500">
                      Social media links can be added here
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-200">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-3 text-gray-900">
                      Send us a Message
                    </h2>
                    <p className="text-gray-600">
                      Fill out the form below and we&apos;ll get back to you as
                      soon as possible.
                    </p>
                  </div>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
