import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPackagesByCategory } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import SafeImage from "@/components/ui/SafeImage";

export const metadata: Metadata = {
  title: "School/College Trips and Camps | Payaana",
  description:
    "Educational and adventure trips for schools and colleges. Study tours, industrial visits, and outbound camps designed for learning and growth.",
};

export const revalidate = 60; // Revalidate every 60 seconds

interface Package {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: any;
  imageUrl?: string; // For dummy data
  price?: number;
  duration?: string;
  description?: string;
  type?: string;
  locations?: string[];
  destination?: {
    name: string;
    slug: { current: string };
  };
}

interface TripSectionProps {
  title: string;
  packages: Package[];
}

function TripSection({ title, packages }: TripSectionProps) {
  if (packages.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => {
          const imageUrl = pkg.mainImage
            ? urlFor(pkg.mainImage).width(600).height(400).url()
            : (pkg as any).imageUrl ||
              "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80";

          // Get locations - prefer locations array, fallback to destination name
          const displayLocations = pkg.locations && pkg.locations.length > 0
            ? pkg.locations.join(", ")
            : pkg.destination?.name || "Location TBD";

          return (
            <Link
              key={pkg._id}
              href={`/packages/${pkg.slug.current}`}
              className="group block h-full"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
                {/* Image */}
                <div className="relative w-full h-56 overflow-hidden flex-shrink-0">
                  <Image
                    src={imageUrl}
                    alt={pkg.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Package Title */}
                  <h4 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {pkg.title}
                  </h4>

                  {/* Location and Duration */}
                  <div className="space-y-2 mb-4 flex-grow">
                    {/* Locations */}
                    <div className="flex items-start gap-2 text-gray-700">
                      <svg
                        className="w-5 h-5 text-brand-purple flex-shrink-0 mt-0.5"
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
                      <span className="text-sm font-medium">
                        {displayLocations}
                      </span>
                    </div>
                    
                    {/* Duration */}
                    {pkg.duration && (
                      <div className="flex items-center gap-2 text-gray-700">
                        <svg
                          className="w-5 h-5 text-brand-purple flex-shrink-0"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-medium">
                          {pkg.duration}
                        </span>
                      </div>
                    )}
                    
                    {/* Price - Only show if exists */}
                    {pkg.price && (
                      <div className="flex items-center gap-2 text-gray-700">
                        <svg
                          className="w-5 h-5 text-brand-purple flex-shrink-0"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-medium">
                          Starting from ₹{pkg.price.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Enquiry Button */}
                  <div className="w-full bg-brand-purple hover:bg-brand-purple-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 mt-auto">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Enquiry Here</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default async function SchoolCollegeTripsPage() {
  // Fetch packages from new categories
  const [schoolProgrammes, collegeOutbounds] = await Promise.all([
    getPackagesByCategory("school-programmes"),
    getPackagesByCategory("college-outbounds"),
  ]);

  // Group by type
  const schoolStudyTours = schoolProgrammes.filter(
    (pkg: Package) => pkg.type === "study-tours"
  );
  const schoolOutboundCamps = schoolProgrammes.filter(
    (pkg: Package) => pkg.type === "outbound-camps"
  );
  const collegeStudyTours = collegeOutbounds.filter(
    (pkg: Package) => pkg.type === "study-tours"
  );
  const collegeOutboundCamps = collegeOutbounds.filter(
    (pkg: Package) => pkg.type === "outbound-camps"
  );
  const collegeIndustrialVisits = collegeOutbounds.filter(
    (pkg: Package) => pkg.type === "industrial-visits"
  );

  // Use Sanity data if available, otherwise use dummy data as fallback
  const trips = {
    schoolStudyTours:
      schoolStudyTours.length > 0
        ? schoolStudyTours
        : [
            {
              _id: "dummy-1",
              title: "Historical Sites Study Tour",
              slug: { current: "historical-sites" },
              price: 15000,
              duration: "4 Days / 3 Nights",
              locations: ["Delhi", "Agra", "Jaipur"],
              imageUrl:
                "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80",
            },
            {
              _id: "dummy-2",
              title: "Science Museum Tour",
              slug: { current: "science-museum" },
              duration: "2 Days / 1 Night",
              locations: ["Bangalore"],
              imageUrl:
                "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
            },
            {
              _id: "dummy-11",
              title: "Cultural Heritage Tour",
              slug: { current: "cultural-heritage" },
              price: 12000,
              duration: "3 Days / 2 Nights",
              locations: ["Mysore", "Coorg"],
              imageUrl:
                "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
            },
            {
              _id: "dummy-12",
              title: "Wildlife Safari Study Tour",
              slug: { current: "wildlife-safari" },
              price: 18000,
              duration: "4 Days / 3 Nights",
              locations: ["Bandipur", "Mysore"],
              imageUrl:
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
            },
            {
              _id: "dummy-13",
              title: "Space Center Visit",
              slug: { current: "space-center" },
              duration: "1 Day",
              locations: ["Bangalore"],
              imageUrl:
                "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&q=80",
            },
            {
              _id: "dummy-14",
              title: "Coastal Study Tour",
              slug: { current: "coastal-tour" },
              price: 14000,
              duration: "3 Days / 2 Nights",
              locations: ["Goa", "Mumbai"],
              imageUrl:
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
            },
          ],
    schoolOutboundCamps:
      schoolOutboundCamps.length > 0
        ? schoolOutboundCamps
        : [
            {
              _id: "dummy-3",
              title: "Adventure Camp - Ooty",
              slug: { current: "ooty-camp" },
              price: 12000,
              duration: "4 Days / 3 Nights",
              locations: ["Ooty", "Coonoor"],
              imageUrl:
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
            },
            {
              _id: "dummy-4",
              title: "Nature Camp - Coorg",
              slug: { current: "coorg-camp" },
              price: 10000,
              duration: "3 Days / 2 Nights",
              locations: ["Coorg"],
              imageUrl:
                "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
            },
            {
              _id: "dummy-15",
              title: "Trekking Camp - Manali",
              slug: { current: "manali-trek" },
              price: 16000,
              duration: "5 Days / 4 Nights",
              locations: ["Manali", "Solang Valley"],
              imageUrl:
                "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
            },
            {
              _id: "dummy-16",
              title: "River Rafting Camp",
              slug: { current: "rafting-camp" },
              price: 11000,
              duration: "3 Days / 2 Nights",
              locations: ["Rishikesh"],
              imageUrl:
                "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
            },
            {
              _id: "dummy-17",
              title: "Beach Adventure Camp",
              slug: { current: "beach-camp" },
              price: 13000,
              duration: "4 Days / 3 Nights",
              locations: ["Pondicherry", "Mahabalipuram"],
              imageUrl:
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
            },
            {
              _id: "dummy-18",
              title: "Mountain Climbing Camp",
              slug: { current: "climbing-camp" },
              price: 20000,
              duration: "6 Days / 5 Nights",
              locations: ["Himachal Pradesh", "Manali"],
              imageUrl:
                "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
            },
          ],
    collegeStudyTours:
      collegeStudyTours.length > 0
        ? collegeStudyTours
        : [
            {
              _id: "dummy-5",
              title: "Tech Industry Study Tour",
              slug: { current: "tech-tour" },
              price: 20000,
              duration: "5 Days / 4 Nights",
              locations: ["Bangalore", "Hyderabad"],
              imageUrl:
                "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
            },
            {
              _id: "dummy-6",
              title: "Heritage Study Tour",
              slug: { current: "heritage-tour" },
              price: 18000,
              duration: "4 Days / 3 Nights",
              locations: ["Jaipur", "Udaipur", "Jodhpur"],
              imageUrl:
                "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80",
            },
            {
              _id: "dummy-19",
              title: "Finance & Banking Tour",
              slug: { current: "finance-tour" },
              price: 22000,
              duration: "5 Days / 4 Nights",
              locations: ["Mumbai"],
              imageUrl:
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
            },
            {
              _id: "dummy-20",
              title: "Media & Communication Tour",
              slug: { current: "media-tour" },
              price: 19000,
              duration: "4 Days / 3 Nights",
              locations: ["Delhi", "Noida"],
              imageUrl:
                "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
            },
            {
              _id: "dummy-21",
              title: "Architecture Study Tour",
              slug: { current: "architecture-tour" },
              price: 17000,
              duration: "4 Days / 3 Nights",
              locations: ["Ahmedabad", "Vadodara"],
              imageUrl:
                "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800&q=80",
            },
            {
              _id: "dummy-22",
              title: "Agricultural Study Tour",
              slug: { current: "agriculture-tour" },
              price: 15000,
              duration: "3 Days / 2 Nights",
              locations: ["Punjab", "Haryana"],
              imageUrl:
                "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80",
            },
          ],
    collegeIndustrialVisits:
      collegeIndustrialVisits.length > 0
        ? collegeIndustrialVisits
        : [
            {
              _id: "dummy-7",
              title: "IT Companies Industrial Visit",
              slug: { current: "it-visit" },
              price: 5000,
              duration: "1 Day",
              locations: ["Bangalore"],
              imageUrl:
                "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
            },
            {
              _id: "dummy-8",
              title: "Manufacturing Units Visit",
              slug: { current: "manufacturing-visit" },
              price: 6000,
              duration: "1 Day",
              locations: ["Mumbai", "Pune"],
              imageUrl:
                "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
            },
            {
              _id: "dummy-23",
              title: "Automobile Industry Visit",
              slug: { current: "automobile-visit" },
              price: 5500,
              duration: "1 Day",
              locations: ["Chennai"],
              imageUrl:
                "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
            },
            {
              _id: "dummy-24",
              title: "Pharmaceutical Companies Visit",
              slug: { current: "pharma-visit" },
              price: 5000,
              duration: "1 Day",
              locations: ["Hyderabad"],
              imageUrl:
                "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
            },
            {
              _id: "dummy-25",
              title: "Textile Industry Visit",
              slug: { current: "textile-visit" },
              price: 4500,
              duration: "1 Day",
              locations: ["Tirupur", "Coimbatore"],
              imageUrl:
                "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
            },
            {
              _id: "dummy-26",
              title: "Research Labs Visit",
              slug: { current: "research-visit" },
              price: 6000,
              duration: "1 Day",
              locations: ["Bangalore"],
              imageUrl:
                "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
            },
          ],
    collegeOutboundCamps:
      collegeOutboundCamps.length > 0
        ? collegeOutboundCamps
        : [
            {
              _id: "dummy-9",
              title: "Leadership Camp - Manali",
              slug: { current: "manali-camp" },
              price: 15000,
              duration: "5 Days / 4 Nights",
              locations: ["Manali"],
              imageUrl:
                "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
            },
            {
              _id: "dummy-10",
              title: "Team Building Camp - Goa",
              slug: { current: "goa-camp" },
              price: 14000,
              duration: "4 Days / 3 Nights",
              locations: ["Goa"],
              imageUrl:
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
            },
            {
              _id: "dummy-27",
              title: "Corporate Training Camp",
              slug: { current: "corporate-camp" },
              price: 18000,
              duration: "5 Days / 4 Nights",
              locations: ["Lonavala", "Khandala"],
              imageUrl:
                "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
            },
            {
              _id: "dummy-28",
              title: "Adventure Leadership Camp",
              slug: { current: "adventure-leadership" },
              price: 16000,
              duration: "4 Days / 3 Nights",
              locations: ["Rishikesh"],
              imageUrl:
                "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
            },
            {
              _id: "dummy-29",
              title: "Communication Skills Camp",
              slug: { current: "communication-camp" },
              price: 12000,
              duration: "3 Days / 2 Nights",
              locations: ["Ooty"],
              imageUrl:
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
            },
            {
              _id: "dummy-30",
              title: "Entrepreneurship Bootcamp",
              slug: { current: "entrepreneurship-camp" },
              price: 20000,
              duration: "6 Days / 5 Nights",
              locations: ["Bangalore"],
              imageUrl:
                "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
            },
          ],
  };

  return (
    <main className="overflow-hidden">
      {/* Hero Section - Matching other service pages */}
      <section className="relative py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto mb-8">
            {/* White Box Container with Icon */}
            <div className="bg-white rounded-2xl p-3 shadow-2xl inline-block border-4 border-brand-purple">
              <div className="relative w-72 h-72 mx-auto">
                <SafeImage
                  src="/school-college-trips.webp"
                  alt="School/College Trips and Camps"
                  fill
                  className="object-contain"
                  fallbackIcon="🎓"
                  fallbackGradient="from-purple-400 to-pink-500"
                />
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            School/College Trips and Camps
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Educational and adventure trips designed for schools and colleges.
            Experience learning beyond the classroom with our curated study
            tours, industrial visits, and outbound camps.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          {/* School Programmes Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                School Programmes
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Educational trips and camps designed specifically for school
                students to enhance learning and personal development
              </p>
            </div>

            {/* Study Tours */}
            <TripSection
              title="Study Tours"
              packages={trips.schoolStudyTours as Package[]}
            />

            {/* Outbound Camps */}
            <TripSection
              title="Outbound Camps"
              packages={trips.schoolOutboundCamps as Package[]}
            />
          </div>

          {/* College Outbounds Section */}
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                College Outbounds
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Professional development trips and experiences for college
                students including study tours, industrial visits, and adventure
                camps
              </p>
            </div>

            {/* Study Tours */}
            <TripSection
              title="Study Tours"
              packages={trips.collegeStudyTours as Package[]}
            />

            {/* Industrial Visits */}
            <TripSection
              title="Industrial Visits"
              packages={trips.collegeIndustrialVisits as Package[]}
            />

            {/* Outbound Camps */}
            <TripSection
              title="Outbound Camps"
              packages={trips.collegeOutboundCamps as Package[]}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
