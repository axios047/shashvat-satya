import { defineField, defineType } from "sanity";

export const bilingualString = defineType({
  name: "bilingualString",
  title: "Bilingual text",
  type: "object",
  fields: [
    defineField({ name: "hi", title: "Hindi", type: "string" }),
    defineField({ name: "en", title: "English", type: "string" }),
  ],
});

export const bilingualText = defineType({
  name: "bilingualText",
  title: "Bilingual HTML",
  type: "object",
  fields: [
    defineField({ name: "hi", title: "Hindi", type: "text", rows: 12 }),
    defineField({ name: "en", title: "English", type: "text", rows: 12 }),
  ],
});

export const bilingualSlug = defineField({
  name: "slug",
  title: "Slug",
  type: "slug",
  options: { source: "name.en", maxLength: 96 },
  validation: (rule) => rule.required(),
});
