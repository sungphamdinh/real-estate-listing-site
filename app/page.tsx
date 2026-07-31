import { Suspense } from "react";
import { fetchProperties } from "@/lib/api";
import PropertyListing from "@/components/PropertyListing";

export default async function Home() {
  const properties = await fetchProperties();
  return (
    <Suspense fallback={null}>
      <PropertyListing properties={properties} />
    </Suspense>
  );
}
