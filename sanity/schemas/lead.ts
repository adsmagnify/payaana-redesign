import { defineField, defineType } from "sanity";

export default defineType({
  name: "lead",
  title: "Lead",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      description: "Optional phone number",
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      description: "Where did this lead come from?",
      options: {
        list: [
          { title: "Contact Form", value: "contact" },
          { title: "Package Inquiry", value: "package" },
          { title: "Service Inquiry", value: "service" },
        ],
        layout: "radio",
      },
      initialValue: "contact",
    }),
    defineField({
      name: "packageId",
      title: "Related Package ID",
      type: "string",
      description: "If this is a package inquiry, link to the package",
    }),
    defineField({
      name: "packageName",
      title: "Related Package Name",
      type: "string",
      description: "Name of the package they inquired about",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Contacted", value: "contacted" },
          { title: "Qualified", value: "qualified" },
          { title: "Converted", value: "converted" },
          { title: "Closed", value: "closed" },
        ],
        layout: "radio",
      },
      initialValue: "new",
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      description: "When was this lead submitted?",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "notes",
      title: "Internal Notes",
      type: "text",
      description: "Internal notes about this lead (not visible to customer)",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "email",
      status: "status",
      source: "source",
    },
    prepare({ title, subtitle, status, source }) {
      const statusColors: Record<string, string> = {
        new: "🟢",
        contacted: "🟡",
        qualified: "🔵",
        converted: "✅",
        closed: "⚫",
      };
      return {
        title: `${title || "Unknown"}`,
        subtitle: `${subtitle || "No email"} • ${source || "contact"} • ${statusColors[status] || ""} ${status || "new"}`,
      };
    },
  },
  orderings: [
    {
      title: "Newest First",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
    {
      title: "Oldest First",
      name: "submittedAtAsc",
      by: [{ field: "submittedAt", direction: "asc" }],
    },
    {
      title: "Status",
      name: "statusAsc",
      by: [{ field: "status", direction: "asc" }],
    },
  ],
});
