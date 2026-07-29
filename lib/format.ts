import { Property } from "./types";

// No agent/broker concept on the backend yet (User<->Property relation is
// still commented out in the Prisma schema), so this is a placeholder
// broker identity, matching the source design's own defaults.
export const BROKER = {
  name: "Đức Linh",
  phone: "096 8798839",
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

const LEGAL_DOCUMENT_LABELS: Record<NonNullable<Property["legalDocument"]>, string> = {
  SO_DO_SO_HONG: "Sổ đỏ/ Sổ hồng",
  HOP_DONG_MUA_BAN: "Hợp đồng mua bán",
  DANG_CHO_SO: "Đang chờ sổ",
};

export function legalDocumentLabel(legalDocument: Property["legalDocument"]): string | null {
  return legalDocument ? LEGAL_DOCUMENT_LABELS[legalDocument] : null;
}

const DIRECTION_LABELS: Record<NonNullable<Property["direction"]>, string> = {
  DONG: "Đông",
  TAY: "Tây",
  NAM: "Nam",
  BAC: "Bắc",
  DONG_BAC: "Đông Bắc",
  TAY_BAC: "Tây Bắc",
  TAY_NAM: "Tây Nam",
  DONG_NAM: "Đông Nam",
};

export function directionLabel(direction: Property["direction"]): string | null {
  return direction ? DIRECTION_LABELS[direction] : null;
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

const VN_TIME_ZONE = "Asia/Ho_Chi_Minh";

// Calendar-day diff in VN time, not a rolling 24h window, so a listing
// posted late last night doesn't still read as "today" this morning.
function vnCalendarDayStart(date: Date): number {
  const [year, month, day] = date
    .toLocaleDateString("en-CA", { timeZone: VN_TIME_ZONE })
    .split("-")
    .map(Number);
  return Date.UTC(year, month - 1, day);
}

export function formatPostedLabel(createdAt: string): string {
  const days = Math.round(
    (vnCalendarDayStart(new Date()) - vnCalendarDayStart(new Date(createdAt))) / (1000 * 60 * 60 * 24)
  );
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
