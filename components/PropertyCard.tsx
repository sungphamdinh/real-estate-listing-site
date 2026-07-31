import Link from "next/link";
import { Property } from "@/lib/types";
import { categoryLabel, formatPostedLabel, formatPrice, specsLabel, statusColor, statusLabel } from "@/lib/format";
import PropertyImage from "./PropertyImage";

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <Link
      href={`/properties/${property.id}`}
      style={{
        background: "#fff",
        border: "1px solid oklch(0.9 0.005 250)",
        borderRadius: 12,
        overflow: "hidden",
        display: "block",
        color: "inherit",
      }}
    >
      <div style={{ position: "relative", width: "100%", aspectRatio: "4/3" }}>
        <PropertyImage
          src={property.images[0]}
          alt={property.title}
          placeholder="Ảnh mặt tiền / phối cảnh"
        />
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            background: "oklch(0.2 0.01 250 / 0.72)",
            color: "#fff",
            fontSize: 11,
            fontWeight: 700,
            padding: "4px 10px",
            borderRadius: 6,
            pointerEvents: "none",
          }}
        >
          {categoryLabel(property.category)}
        </div>
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: statusColor(property.status).bg,
            color: statusColor(property.status).fg,
            fontSize: 11,
            fontWeight: 700,
            padding: "4px 10px",
            borderRadius: 6,
            pointerEvents: "none",
          }}
        >
          {statusLabel(property.status)}
        </div>
        {property.isFeatured && (
          <div
            style={{
              position: "absolute",
              bottom: 10,
              left: 10,
              background: "#facc15",
              color: "#713f12",
              fontSize: 11,
              fontWeight: 700,
              padding: "4px 10px",
              borderRadius: 6,
              pointerEvents: "none",
            }}
          >
            ⭐ Nổi bật
          </div>
        )}
      </div>
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: "var(--accent)" }}>
          {formatPrice(property)}
        </div>
        <div
          style={{
            fontSize: 15,
            fontWeight: 700,
            lineHeight: 1.35,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: 40,
          }}
        >
          {property.title}
        </div>
        <div style={{ fontSize: 13, color: "oklch(0.5 0.01 250)" }}>{property.address}</div>
        <div style={{ fontSize: 13, color: "oklch(0.35 0.01 250)", fontWeight: 600 }}>
          {specsLabel(property)}
        </div>
        <div
          style={{
            fontSize: 12,
            color: "oklch(0.55 0.01 250)",
            marginTop: 4,
            paddingTop: 8,
            borderTop: "1px solid oklch(0.93 0.005 250)",
          }}
        >
          {formatPostedLabel(property.createdAt)}
        </div>
      </div>
    </Link>
  );
}
