import { defineField, defineType } from "sanity";
import { bilingualSlug } from "./fields";

export const page = defineType({
  name: "page",
  title: "Site page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "bilingualString",
      validation: (rule) => rule.required(),
    }),
    bilingualSlug,
    defineField({
      name: "bodyHtml",
      title: "Body (HTML)",
      type: "bilingualText",
    }),
  ],
  preview: {
    select: { title: "title.en" },
  },
});
