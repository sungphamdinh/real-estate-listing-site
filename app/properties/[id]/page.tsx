import { notFound } from "next/navigation";
import { fetchProperties, fetchProperty } from "@/lib/api";
import PropertyDetail from "@/components/PropertyDetail";

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await fetchProperty(id);

  // The backend returns 200/data:null for a missing id instead of 404,
  // so this check has to happen here rather than relying on fetch throwing.
  if (!property) {
    notFound();
  }

  const all = await fetchProperties();
  const related = all.filter((p) => p.id !== property.id && p.type === property.type).slice(0, 3);

  return <PropertyDetail property={property} related={related} />;
}
