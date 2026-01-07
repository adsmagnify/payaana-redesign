import { defineField, defineType } from "sanity";

export default defineType({
  name: "destination",
  title: "Destination",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
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
      name: "location",
      title: "Location",
      type: "string",
      description: "Full location address or region",
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Domestic", value: "domestic" },
          { title: "International", value: "international" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
      description: "Whether this is a domestic or international destination",
    }),
    defineField({
      name: "isPopular",
      title: "Is Popular",
      type: "boolean",
      description: "Mark as popular to show on home page",
      initialValue: false,
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      description: "Order in which destinations appear (lower numbers first)",
      validation: (Rule) => Rule.min(0),
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "mainImage",
      location: "location",
      type: "type",
      isPopular: "isPopular",
    },
    prepare({ title, media, location, type, isPopular }) {
      const typeLabel = type === "domestic" ? "Domestic" : "International";
      const popularLabel = isPopular ? "⭐ Popular" : "";
      return {
        title,
        subtitle: `${typeLabel}${location ? ` • ${location}` : ""}${popularLabel ? ` • ${popularLabel}` : ""}`,
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
      title: "Name",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
});
