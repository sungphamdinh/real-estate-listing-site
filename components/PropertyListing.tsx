"use client";

import { useMemo, useState } from "react";
import { Property, PropertyCategory } from "@/lib/types";
import { categoryLabel, computeArea } from "@/lib/format";
import { useViewportWidth } from "@/lib/useViewportWidth";
import PropertyCard from "./PropertyCard";

type AreaFilter = "all" | "lt50" | "50-80" | "80-120" | "120-200" | "gt200";

const CATEGORY_OPTIONS: PropertyCategory[] = ["NHA_PHO", "CAN_HO", "BIET_THU", "DAT_NEN"];

interface Filters {
  category: "all" | PropertyCategory;
  addressSearch: string;
  priceMin: string;
  priceMax: string;
  area: AreaFilter;
}

const DEFAULT_FILTERS: Filters = {
  category: "all",
  addressSearch: "",
  priceMin: "",
  priceMax: "",
  area: "all",
};

function matchesArea(area: number | null, range: AreaFilter): boolean {
  if (range === "all") return true;
  if (area === null) return false;
  if (range === "lt50") return area < 50;
  if (range === "50-80") return area >= 50 && area <= 80;
  if (range === "80-120") return area > 80 && area <= 120;
  if (range === "120-200") return area > 120 && area <= 200;
  if (range === "gt200") return area > 200;
  return true;
}

export default function PropertyListing({ properties }: { properties: Property[] }) {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const width = useViewportWidth();
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;

  const gridCols = isMobile ? 1 : isTablet ? 2 : 3;
  const searchCols = isMobile ? 1 : isTablet ? 2 : 4;
  const pagePadding = isMobile ? "16px" : "24px";

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (filters.category !== "all" && p.category !== filters.category) return false;
      if (
        filters.addressSearch.trim() &&
        !p.address.toLowerCase().includes(filters.addressSearch.trim().toLowerCase())
      )
        return false;
      const min = filters.priceMin ? Number(filters.priceMin) : null;
      const max = filters.priceMax ? Number(filters.priceMax) : null;
      if (min !== null && p.price < min) return false;
      if (max !== null && p.price > max) return false;
      if (!matchesArea(computeArea(p), filters.area)) return false;
      return true;
    });
  }, [properties, filters]);

  const selectStyle: React.CSSProperties = {
    height: 44,
    borderRadius: 8,
    border: "1px solid oklch(0.85 0.01 250)",
    padding: "0 12px",
    fontSize: 14,
    background: "#fff",
    width: "100%",
  };
  const labelStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 700,
    color: "oklch(0.5 0.01 250)",
  };

  return (
    <div id="top">
      <section
        style={{
          background:
            "linear-gradient(180deg, oklch(0.97 0.01 258) 0%, oklch(0.985 0.002 250) 100%)",
          padding: `32px ${pagePadding} 32px`,
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h1
            style={{
              fontSize: "clamp(26px, 5vw, 38px)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              margin: "0 0 10px",
            }}
          >
            Tìm mua bất động sản tại TP. Hồ Chí Minh
          </h1>
          <p style={{ fontSize: 15, color: "oklch(0.45 0.01 250)", margin: "0 0 24px", maxWidth: 640 }}>
            Danh sách nhà phố, căn hộ, biệt thự và đất nền được chọn lọc và cập nhật liên tục.
          </p>

          <div
            id="search"
            style={{
              background: "#fff",
              border: "1px solid oklch(0.9 0.005 250)",
              borderRadius: 14,
              padding: 20,
              boxShadow: "0 8px 24px oklch(0.2 0.02 258 / 0.06)",
              scrollMarginTop: 96,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${searchCols}, minmax(0,1fr))`,
                gap: 14,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={labelStyle}>Loại hình</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value as Filters["category"] })}
                  style={selectStyle}
                >
                  <option value="all">Tất cả loại hình</option>
                  {CATEGORY_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {categoryLabel(c)}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={labelStyle}>Khu vực / Địa chỉ</label>
                <input
                  type="text"
                  placeholder="VD: Quận 1, Bình Thạnh..."
                  value={filters.addressSearch}
                  onChange={(e) => setFilters({ ...filters, addressSearch: e.target.value })}
                  style={selectStyle}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={labelStyle}>Khoảng giá (VNĐ)</label>
                <div style={{ display: "flex", gap: 6 }}>
                  <input
                    type="number"
                    placeholder="Từ"
                    value={filters.priceMin}
                    onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
                    style={selectStyle}
                  />
                  <input
                    type="number"
                    placeholder="Đến"
                    value={filters.priceMax}
                    onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
                    style={selectStyle}
                  />
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={labelStyle}>Diện tích</label>
                <select
                  value={filters.area}
                  onChange={(e) => setFilters({ ...filters, area: e.target.value as AreaFilter })}
                  style={selectStyle}
                >
                  <option value="all">Tất cả diện tích</option>
                  <option value="lt50">Dưới 50m²</option>
                  <option value="50-80">50 - 80m²</option>
                  <option value="80-120">80 - 120m²</option>
                  <option value="120-200">120 - 200m²</option>
                  <option value="gt200">Trên 200m²</option>
                </select>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 14 }}>
              <button
                onClick={() => setFilters(DEFAULT_FILTERS)}
                style={{
                  border: "none",
                  background: "none",
                  color: "var(--accent)",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  padding: "8px 4px",
                }}
              >
                Xóa bộ lọc
              </button>
            </div>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1280, margin: "0 auto", padding: `28px ${pagePadding} 56px` }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>
            {filtered.length} bất động sản phù hợp
          </h2>
          <span style={{ fontSize: 13, color: "oklch(0.5 0.01 250)" }}>Cập nhật hôm nay</span>
        </div>

        {filtered.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${gridCols}, minmax(0,1fr))`, gap: 22 }}>
            {filtered.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "80px 20px", color: "oklch(0.5 0.01 250)" }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>
              Không tìm thấy bất động sản phù hợp
            </div>
            <div style={{ fontSize: 14 }}>Hãy thử điều chỉnh bộ lọc giá, khu vực hoặc diện tích.</div>
          </div>
        )}
      </section>
    </div>
  );
}
