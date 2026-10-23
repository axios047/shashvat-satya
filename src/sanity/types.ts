export type BilingualString = { hi?: string; en?: string };
export type BilingualText = { hi?: string; en?: string };

export type Tribute = {
  _id: string;
  _type: "tribute";
  name: BilingualString;
  slug: { current: string };
  role: "family" | "publicFigure";
  birthDate?: string;
  deathDate?: string;
  portrait?: { asset?: { _ref: string } };
  bodyHtml?: BilingualText;
};

export type Martyr = {
  _id: string;
  _type: "martyr";
  name: BilingualString;
  slug: { current: string };
  award?: string;
  birthDate?: string;
  deathDate?: string;
  portrait?: { asset?: { _ref: string } };
  bodyHtml?: BilingualText;
};

export type Writing = {
  _id: string;
  _type: "writing";
  title: BilingualString;
  slug: { current: string };
  kind: "article" | "jeevanSaar" | "news" | "letter";
  publishedAt?: string;
  bodyHtml?: BilingualText;
};

export type TeamMember = {
  _id: string;
  _type: "teamMember";
  name: BilingualString;
  slug: { current: string };
  note?: BilingualString;
  portrait?: { asset?: { _ref: string } };
};

export type SitePage = {
  _id: string;
  _type: "page";
  title: BilingualString;
  slug: { current: string };
  bodyHtml?: BilingualText;
};
