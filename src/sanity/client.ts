import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, readToken } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  token: readToken,
});
