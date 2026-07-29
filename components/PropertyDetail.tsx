"use client";

import Link from "next/link";
import { Property } from "@/lib/types";
import {
  BROKER,
  categoryLabel,
  formatArea,
  formatPostedLabel,
  formatPrice,
  formatPricePerArea,
  telHref,
  zaloHref,
} from "@/lib/format";
import { useViewportWidth } from "@/lib/useViewportWidth";
import PropertyGallery from "./PropertyGallery";
import PropertyCard from "./PropertyCard";
import PropertyDescription from "./PropertyDescription";
import LoanCalculator from "./LoanCalculator";

export default function PropertyDetail({
  property,
  related,
}: {
  property: Property;
  related: Property[];
}) {
  const width = useViewportWidth();
  const isMobile = width < 640;
  const isCompact = width < 1024;

  const detailCols = isCompact ? "1fr" : "2fr 1fr";
  const galleryCols = isMobile ? 2 : 4;
  const relatedCols = isMobile ? 1 : isCompact ? 2 : 3;
  const specsCols = isMobile ? 2 : 3;
  const pagePadding = isMobile ? "16px" : "24px";

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: `20px ${pagePadding} 56px` }}>
      <Link
        href="/"
        style={{
          border: "none",
          background: "none",
          color: "oklch(0.4 0.01 250)",
          fontSize: 14,
          fontWeight: 600,
          padding: "8px 0",
          display: "flex",
          alignItems: "center",
          gap: 6,
          width: "fit-content",
        }}
      >
        ‹ Quay lại danh sách
      </Link>

      <div style={{ display: "grid", gridTemplateColumns: detailCols, gap: 28, marginTop: 12 }}>
        <div style={{ minWidth: 0 }}>
          <PropertyGallery images={property.images} alt={property.title} galleryCols={galleryCols} />

          <div style={{ marginTop: 28, display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span style={{ background: "oklch(0.95 0.03 258)", color: "var(--accent-dark)", fontSize: 12, fontWeight: 700, padding: "5px 12px", borderRadius: 6 }}>
              {categoryLabel(property.category)}
            </span>
            <span style={{ background: "oklch(0.95 0.005 250)", color: "oklch(0.45 0.01 250)", fontSize: 12, fontWeight: 600, padding: "5px 12px", borderRadius: 6 }}>
              {formatPostedLabel(property.createdAt)}
            </span>
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: "12px 0 6px", letterSpacing: "-0.01em" }}>
            {property.title}
          </h1>
          <div style={{ fontSize: 14, color: "oklch(0.5 0.01 250)", marginBottom: 18 }}>{property.address}</div>

          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 14,
              padding: "18px 0",
              borderTop: "1px solid oklch(0.92 0.005 250)",
              borderBottom: "1px solid oklch(0.92 0.005 250)",
            }}
          >
            <div style={{ fontSize: 30, fontWeight: 800, color: "var(--accent)" }}>{formatPrice(property)}</div>
            <div style={{ fontSize: 14, color: "oklch(0.5 0.01 250)" }}>~ {formatPricePerArea(property)}</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: `repeat(${specsCols}, minmax(0,1fr))`, gap: 18, padding: "22px 0" }}>
            <Spec label="Diện tích" value={formatArea(property)} />
            <Spec label="Phòng ngủ" value={property.bedrooms ? `${property.bedrooms} phòng` : "—"} />
            <Spec label="Phòng tắm" value={property.bathrooms ? `${property.bathrooms} phòng` : "—"} />
            <Spec label="Số tầng" value={property.floors ? `${property.floors} tầng` : "—"} />
          </div>

          {property.description && (
            <div style={{ borderTop: "1px solid oklch(0.92 0.005 250)", paddingTop: 22 }}>
              <h3 style={{ fontSize: 17, fontWeight: 800, margin: "0 0 10px" }}>Mô tả chi tiết</h3>
              <PropertyDescription description={property.description} />
            </div>
          )}

          <div style={{ borderTop: "1px solid oklch(0.92 0.005 250)", marginTop: 22, paddingTop: 22 }}>
            <h3 style={{ fontSize: 17, fontWeight: 800, margin: "0 0 10px" }}>Vị trí</h3>
            <div style={{ width: "100%", height: 260, borderRadius: 12, overflow: "hidden" }}>
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent(property.address)}&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Bản đồ vị trí: ${property.address}`}
              />
            </div>
          </div>

          {related.length > 0 && (
            <div style={{ borderTop: "1px solid oklch(0.92 0.005 250)", marginTop: 28, paddingTop: 22 }}>
              <h3 style={{ fontSize: 17, fontWeight: 800, margin: "0 0 14px" }}>Tin đăng tương tự</h3>
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${relatedCols}, minmax(0,1fr))`, gap: 16 }}>
                {related.map((item) => (
                  <PropertyCard key={item.id} property={item} />
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ minWidth: 0 }}>
          <div style={{ position: isCompact ? "static" : "sticky", top: 112, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: "#fff", border: "1px solid oklch(0.9 0.005 250)", borderRadius: 14, padding: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    flexShrink: 0,
                    background: "var(--accent)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: 18,
                  }}
                >
                  {BROKER.name.split(" ").slice(-2).map((w) => w[0]).join("").toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 15 }}>{BROKER.name}</div>
                  <div style={{ fontSize: 12, color: "oklch(0.5 0.01 250)" }}>Chuyên viên tư vấn BĐS</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <a
                  href={property.contact ? telHref(property.contact) : telHref(BROKER.phone)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 12,
                    borderRadius: 8,
                    background: "rgb(0, 155, 161)",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 14,
                  }}
                >
                  Gọi {property.contact ?? BROKER.phone}
                </a>
                <a
                  href={zaloHref(property.contact ?? BROKER.phone)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 12,
                    borderRadius: 8,
                    background: "#0068FF",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 14,
                  }}
                >
                  Chat Zalo
                </a>
              </div>
              <div style={{ fontSize: 12, color: "oklch(0.55 0.01 250)", textAlign: "center", marginTop: 12 }}>
                Thường phản hồi trong vòng 15 phút
              </div>
            </div>

            <div style={{ background: "oklch(0.97 0.005 250)", border: "1px solid oklch(0.9 0.005 250)", borderRadius: 14, padding: 18 }}>
              <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 10 }}>Lưu ý an toàn giao dịch</div>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12.5, lineHeight: 1.8, color: "oklch(0.4 0.01 250)" }}>
                <li>Kiểm tra sổ hồng và pháp lý trước khi đặt cọc.</li>
                <li>Không chuyển tiền trước khi xem nhà thực tế.</li>
                <li>Luôn lập hợp đồng đặt cọc có công chứng.</li>
              </ul>
            </div>

            <LoanCalculator propertyPrice={property.price} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: 12, color: "oklch(0.55 0.01 250)", fontWeight: 600, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 15, fontWeight: 700 }}>{value}</div>
    </div>
  );
}
