import { bilingualString, bilingualText } from "./fields";
import { martyr } from "./martyr";
import { page } from "./page";
import { teamMember } from "./teamMember";
import { tribute } from "./tribute";
import { writing } from "./writing";

export const schemaTypes = [
  bilingualString,
  bilingualText,
  tribute,
  martyr,
  writing,
  teamMember,
  page,
];
