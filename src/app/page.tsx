import { Suspense } from "react";
import { HomeFallback } from "@/components/home/home-fallback";
import { HomePage } from "@/components/home/home-page";

export default function Home() {
  return (
    <Suspense fallback={<HomeFallback />}>
      <HomePage />
    </Suspense>
  );
}
