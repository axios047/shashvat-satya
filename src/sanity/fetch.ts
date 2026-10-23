import { cacheLife } from "next/cache";
import { client } from "./client";

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T> {
  "use cache";
  cacheLife("hours");
  return client.fetch<T>(query, params);
}
