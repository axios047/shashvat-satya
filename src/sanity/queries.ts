import { defineQuery } from "next-sanity";

const docFields = `
  _id,
  _type,
  slug,
  name,
  title,
  role,
  kind,
  award,
  birthDate,
  deathDate,
  publishedAt,
  note,
  portrait,
  bodyHtml
`;

export const homepageQuery = defineQuery(`{
  "panchangTributes": *[_type == "tribute" && defined(deathDate)] | order(name.en asc) {
    _id,
    slug,
    name,
    deathDate
  },
  "shradhanjali": *[_type == "tribute" && role == "publicFigure"] | order(deathDate desc) [0...8] { ${docFields} },
  "martyrs": *[_type == "martyr"] | order(deathDate desc) [0...8] { ${docFields} },
  "deathAnniversaries": *[_type == "tribute" && role == "family" && defined(deathDate)] | order(deathDate desc) [0...8] { ${docFields} },
  "birthAnniversaries": *[_type == "tribute" && defined(birthDate)] | order(birthDate desc) [0...8] { ${docFields} },
  "jeevanSaar": *[_type == "writing" && kind == "jeevanSaar"] | order(publishedAt desc) [0...6] { ${docFields} },
  "articles": *[_type == "writing" && kind == "article"] | order(publishedAt desc) [0...6] { ${docFields} },
  "news": *[_type == "writing" && kind == "news"] | order(publishedAt desc) [0...6] { ${docFields} },
  "letters": *[_type == "writing" && kind == "letter"] | order(publishedAt desc) [0...6] { ${docFields} },
  "team": *[_type == "teamMember"] | order(name.en asc) [0...8] { ${docFields} },
  "pages": *[_type == "page"] | order(title.en asc) { ${docFields} }
}`);

export const tributeBySlugQuery = defineQuery(`
  *[_type == "tribute" && slug.current in $slugs][0] { ${docFields} }
`);

export const martyrBySlugQuery = defineQuery(`
  *[_type == "martyr" && slug.current in $slugs][0] { ${docFields} }
`);

export const writingBySlugQuery = defineQuery(`
  *[_type == "writing" && slug.current in $slugs][0] { ${docFields} }
`);

export const teamBySlugQuery = defineQuery(`
  *[_type == "teamMember" && slug.current in $slugs][0] { ${docFields} }
`);

export const pageBySlugQuery = defineQuery(`
  *[_type == "page" && slug.current in $slugs][0] { ${docFields} }
`);
