import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchProperties, fetchProperty } from "@/lib/api";
import PropertyDetail from "@/components/PropertyDetail";
import { categoryLabel, formatArea, formatPrice } from "@/lib/format";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const property = await fetchProperty(id);
  if (!property) return {};

  const title = property.title;
  const description =
    property.description?.slice(0, 160) ??
    `${categoryLabel(property.category)} ${formatArea(property)} tại ${property.address}, giá ${formatPrice(property)}.`;
  const image = property.images[0];

  return {
    title,
    description,
    alternates: { canonical: `/properties/${property.id}` },
    openGraph: {
      title,
      description,
      url: `/properties/${property.id}`,
      type: "website",
      images: image ? [image] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

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
  const related = all.filter((p) => p.id !== property.id && p.category === property.category).slice(0, 3);

  return <PropertyDetail property={property} related={related} />;
}
