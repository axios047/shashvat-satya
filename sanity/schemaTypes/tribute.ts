import { defineField, defineType } from "sanity";
import { bilingualSlug } from "./fields";

export const tribute = defineType({
  name: "tribute",
  title: "Tribute",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "bilingualString",
      validation: (rule) => rule.required(),
    }),
    bilingualSlug,
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      options: {
        list: [
          { title: "Family", value: "family" },
          { title: "Public figure", value: "publicFigure" },
        ],
      },
      initialValue: "family",
    }),
    defineField({ name: "birthDate", title: "Birth date", type: "date" }),
    defineField({ name: "deathDate", title: "Death date", type: "date" }),
    defineField({
      name: "portrait",
      title: "Portrait",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bodyHtml",
      title: "Body (HTML)",
      type: "bilingualText",
    }),
  ],
  preview: {
    select: { title: "name.en", subtitle: "role", media: "portrait" },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Tribute",
        subtitle,
        media,
      };
    },
  },
});
