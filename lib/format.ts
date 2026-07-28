import { Property } from "./types";

// No agent/broker concept on the backend yet (User<->Property relation is
// still commented out in the Prisma schema), so this is a placeholder
// broker identity, matching the source design's own defaults.
export const BROKER = {
  name: "Đức Linh",
  phone: "090 123 4567",
  email: "lienhe@bds-hcm.vn",
};

export function brokerInitials(name: string): string {
  return name
    .split(" ")
    .slice(-2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function telHref(phone: string): string {
  return "tel:+84" + phone.replace(/\D/g, "").replace(/^0/, "");
}

export function zaloHref(phone: string): string {
  return "https://zalo.me/" + phone.replace(/\D/g, "");
}

export function formatPrice(property: Pick<Property, "price">): string {
  const ty = property.price / 1_000_000_000;
  return ty.toLocaleString("vi-VN", { maximumFractionDigits: 2 }) + " tỷ";
}

const CATEGORY_LABELS: Record<Property["category"], string> = {
  NHA_PHO: "Nhà phố",
  CAN_HO: "Căn hộ",
  BIET_THU: "Biệt thự",
  DAT_NEN: "Đất nền",
};

export function categoryLabel(category: Property["category"]): string {
  return CATEGORY_LABELS[category];
}

export function computeArea(property: Pick<Property, "width" | "length">): number | null {
  if (!property.width || !property.length) return null;
  return property.width * property.length;
}

export function formatArea(property: Pick<Property, "width" | "length">): string {
  const area = computeArea(property);
  return area ? area.toLocaleString("vi-VN", { maximumFractionDigits: 1 }) + " m²" : "—";
}

export function formatPricePerArea(property: Pick<Property, "price" | "width" | "length">): string {
  const area = computeArea(property);
  if (!area) return "—";
  const trieuPerM2 = Math.round(property.price / area / 1_000_000);
  return trieuPerM2.toLocaleString("vi-VN") + " triệu/m²";
}

export function formatPostedLabel(createdAt: string): string {
  const days = Math.floor((Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24));
  if (days <= 0) return "Đăng hôm nay";
  return "Đăng " + days + " ngày trước";
}

export function specsLabel(property: Pick<Property, "width" | "length" | "bedrooms" | "bathrooms">): string {
  const parts: string[] = [];
  const area = computeArea(property);
  if (area) parts.push(area.toLocaleString("vi-VN", { maximumFractionDigits: 1 }) + "m²");
  if (property.bedrooms) parts.push(property.bedrooms + " PN");
  if (property.bathrooms) parts.push(property.bathrooms + " WC");
  return parts.join(" · ");
}
