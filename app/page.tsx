import { Suspense } from "react";
import { fetchProperties } from "@/lib/api";
import PropertyListing from "@/components/PropertyListing";
import ConsignmentForm from "@/components/ConsignmentForm";

export default async function Home() {
  const properties = (await fetchProperties()).sort(
    (a, b) => Number(b.isFeatured) - Number(a.isFeatured)
  );
  return (
    <>
      <Suspense fallback={null}>
        <PropertyListing properties={properties} />
      </Suspense>
      <ConsignmentForm />
    </>
  );
}
