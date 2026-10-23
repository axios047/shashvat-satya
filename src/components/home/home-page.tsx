import { connection } from "next/server";
import { HomeContent, type HomepageData } from "@/components/home/home-content";
import { toIsoDate } from "@/lib/dates";
import { client } from "@/sanity/client";
import { homepageQuery } from "@/sanity/queries";

export async function HomePage() {
  await connection();
  const data = await client.fetch<HomepageData>(homepageQuery, {});

  return <HomeContent data={data} todayIso={toIsoDate(new Date())} />;
}
