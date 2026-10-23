import { defineField, defineType } from "sanity";
import { bilingualSlug } from "./fields";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team member",
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
      name: "note",
      title: "Short note",
      type: "bilingualString",
    }),
    defineField({
      name: "portrait",
      title: "Portrait",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "name.en", media: "portrait" },
  },
});
