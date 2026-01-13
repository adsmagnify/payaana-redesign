import { defineField, defineType } from "sanity";

export default defineType({
  name: "packages",
  title: "Packages",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price (Starting from)",
      type: "number",
      description: "Optional - Only show if filled",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      description: 'e.g., "5 Days / 4 Nights" - Optional for School Programmes and College Outbounds',
      validation: (Rule) => 
        Rule.custom((duration, context) => {
          const category = (context.document as any)?.category;
          if (category === "school-programmes" || category === "college-outbounds") {
            return true; // Optional for school/college trips
          }
          return duration ? true : "Duration is required for this category";
        }),
    }),
    defineField({
      name: "destination",
      title: "Destination",
      type: "reference",
      to: [{ type: "destination" }],
      description: "Optional for School Programmes and College Outbounds (use Locations field instead)",
      validation: (Rule) => 
        Rule.custom((destination, context) => {
          const category = (context.document as any)?.category;
          if (category === "school-programmes" || category === "college-outbounds") {
            return true; // Optional for school/college trips
          }
          return destination ? true : "Destination is required for this category";
        }),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Specialised Destination", value: "specialised" },
          { title: "International Holiday Packages", value: "international" },
          { title: "Domestic Holiday Packages", value: "domestic" },
          { title: "Fixed Departures", value: "fixedDeparture" },
          { title: "School Programmes", value: "school-programmes" },
          { title: "College Outbounds", value: "college-outbounds" },
          // Legacy categories (kept for backward compatibility)
          { title: "School Study Tours", value: "school-study-tours" },
          { title: "School Outbound Camps", value: "school-outbound-camps" },
          { title: "College Study Tours", value: "college-study-tours" },
          { title: "College Industrial Visits", value: "college-industrial-visits" },
          { title: "College Outbound Camps", value: "college-outbound-camps" },
        ],
        layout: "radio",
      },
      description: "Category for organizing packages on the packages page",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Study Tours", value: "study-tours" },
          { title: "Outbound Camps", value: "outbound-camps" },
          { title: "Industrial Visits", value: "industrial-visits" },
        ],
        layout: "radio",
      },
      description: "Type of trip (only for School Programmes and College Outbounds)",
      hidden: ({ document }) => 
        document?.category !== "school-programmes" && 
        document?.category !== "college-outbounds",
    }),
    defineField({
      name: "locations",
      title: "Locations",
      type: "array",
      of: [{ type: "string" }],
      description: "Multiple locations for this trip (e.g., ['Delhi', 'Agra', 'Jaipur'])",
    }),
    defineField({
      name: "isFeatured",
      title: "Is Featured",
      type: "boolean",
      description: "Mark as featured to show on home page",
      initialValue: false,
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      description:
        "Order in which packages appear within category (lower numbers first)",
      validation: (Rule) => Rule.min(0),
      initialValue: 0,
    }),
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      of: [{ type: "string" }],
      description: "Key highlights of this package",
    }),
    defineField({
      name: "itinerary",
      title: "Itinerary",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Day Title",
              type: "string",
            },
            {
              name: "description",
              title: "Description",
              type: "text",
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
      destination: "destination.name",
      category: "category",
      isFeatured: "isFeatured",
    },
    prepare({ title, media, destination, category, isFeatured }) {
      const categoryLabels: Record<string, string> = {
        international: "International",
        domestic: "Domestic",
        fixedDeparture: "Fixed Departure",
        specialised: "Specialised",
        "school-programmes": "School Programmes",
        "college-outbounds": "College Outbounds",
        "school-study-tours": "School Study Tours",
        "school-outbound-camps": "School Outbound Camps",
        "college-study-tours": "College Study Tours",
        "college-industrial-visits": "College Industrial Visits",
        "college-outbound-camps": "College Outbound Camps",
      };
      const categoryLabel = categoryLabels[category] || category;
      const featuredLabel = isFeatured ? "⭐ Featured" : "";
      return {
        title,
        subtitle: `${categoryLabel}${destination ? ` • ${destination}` : ""}${featuredLabel ? ` • ${featuredLabel}` : ""}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "displayOrderAsc",
      by: [{ field: "displayOrder", direction: "asc" }],
    },
    {
      title: "Title",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
});
