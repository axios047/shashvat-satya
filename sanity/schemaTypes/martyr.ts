import { defineField, defineType } from "sanity";
import { bilingualSlug } from "./fields";

export const martyr = defineType({
  name: "martyr",
  title: "Martyr",
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
      name: "award",
      title: "Gallantry award",
      type: "string",
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
    select: { title: "name.en", subtitle: "award", media: "portrait" },
  },
});
