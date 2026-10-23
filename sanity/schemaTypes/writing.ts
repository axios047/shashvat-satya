import { defineField, defineType } from "sanity";
import { bilingualSlug } from "./fields";

export const writing = defineType({
  name: "writing",
  title: "Writing",
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
      name: "kind",
      title: "Kind",
      type: "string",
      options: {
        list: [
          { title: "Article", value: "article" },
          { title: "Jeevan Saar", value: "jeevanSaar" },
          { title: "News", value: "news" },
          { title: "Letter", value: "letter" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    }),
    defineField({
      name: "bodyHtml",
      title: "Body (HTML)",
      type: "bilingualText",
    }),
  ],
  preview: {
    select: { title: "title.en", subtitle: "kind" },
  },
});
