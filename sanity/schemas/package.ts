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
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      description: 'e.g., "5 Days / 4 Nights"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "destination",
      title: "Destination",
      type: "reference",
      to: [{ type: "destination" }],
      validation: (Rule) => Rule.required(),
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
        ],
        layout: "radio",
      },
      description: "Category for organizing packages on the packages page",
      validation: (Rule) => Rule.required(),
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
