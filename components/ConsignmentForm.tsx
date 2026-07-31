"use client";

import { useState } from "react";
import { BROKER, categoryLabel } from "@/lib/format";
import { PropertyCategory } from "@/lib/types";
import { submitConsignmentLead } from "@/lib/actions";
import { useViewportWidth } from "@/lib/useViewportWidth";

const CATEGORY_OPTIONS: PropertyCategory[] = ["MAT_TIEN", "HEM", "DAT_NEN", "CAN_HO"];

const DISTRICT_OPTIONS = [
  "Quận 1",
  "Quận 3",
  "Quận 4",
  "Quận 5",
  "Quận 6",
  "Quận 7",
  "Quận 8",
  "Quận 10",
  "Quận 11",
  "Quận 12",
  "Bình Thạnh",
  "Tân Bình",
  "Tân Phú",
  "Phú Nhuận",
  "Gò Vấp",
  "Bình Tân",
  "Thủ Đức",
  "Hóc Môn",
  "Củ Chi",
  "Bình Chánh",
  "Nhà Bè",
  "Cần Giờ",
];

const TY = 1_000_000_000;

export default function ConsignmentForm() {
  const [category, setCategory] = useState<PropertyCategory | "">("");
  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<"success" | "error" | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const width = useViewportWidth();
  const isMobile = width < 640;
  const gridCols = isMobile ? "1fr" : "1fr 1fr";

  function handleInvalid(e: React.InvalidEvent<HTMLInputElement | HTMLSelectElement>) {
    e.currentTarget.setCustomValidity(
      e.currentTarget.validity.patternMismatch
        ? "Số điện thoại không hợp lệ (VD: 0901234567)"
        : "Thông tin cần thiết"
    );
  }

  function clearValidity(e: React.FormEvent<HTMLInputElement | HTMLSelectElement>) {
    e.currentTarget.setCustomValidity("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!category || !district || !area || !fullName || !phone) return;

    setSubmitting(true);
    setResult(null);
    const res = await submitConsignmentLead({
      category,
      district,
      area: Number(area),
      price: price ? Number(price) * TY : undefined,
      description: description || undefined,
      fullName,
      phone,
    });
    setSubmitting(false);

    if (res.ok) {
      setResult("success");
      setCategory("");
      setDistrict("");
      setArea("");
      setPrice("");
      setDescription("");
      setFullName("");
      setPhone("");
    } else {
      setResult("error");
      setErrorMessage(res.message);
    }
  }

  const fieldStyle: React.CSSProperties = {
    width: "100%",
    height: 44,
    borderRadius: 8,
    border: "1px solid oklch(0.85 0.01 250)",
    padding: "0 12px",
    fontSize: 14,
    background: "#fff",
    color: "#111827",
  };
  const labelStyle: React.CSSProperties = {
    fontWeight: 700,
    fontSize: 13,
    marginBottom: 6,
    display: "block",
    color: "#111827",
  };
  const fieldWrapStyle: React.CSSProperties = { marginBottom: 16 };

  return (
    <section
      id="ky-gui"
      style={{
        background: "linear-gradient(135deg, oklch(0.24 0.05 258) 0%, oklch(0.15 0.03 258) 100%)",
        color: "#fff",
        padding: "56px 24px",
        scrollMarginTop: 24,
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <span
          style={{
            display: "inline-block",
            background: "var(--accent)",
            color: "#fff",
            fontSize: 12,
            fontWeight: 700,
            padding: "6px 14px",
            borderRadius: 999,
            marginBottom: 16,
          }}
        >
          Ký gửi bất động sản
        </span>
        <h2 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 800, margin: "0 0 12px", letterSpacing: "-0.01em", maxWidth: 1280 }}>
          Bạn muốn bán nhà đất? Gửi thông tin cho {BROKER.name}
        </h2>
        <p style={{ fontSize: 14, color: "oklch(0.75 0.01 250)", lineHeight: 1.6, margin: "0 0 28px", maxWidth: 1280 }}>
          Điền thông tin bất động sản và liên hệ của bạn, {BROKER.name} sẽ tư vấn định giá và phương án bán phù
          hợp trong vòng 24 giờ. Thông tin của bạn được bảo mật tuyệt đối.
        </p>

        <form
          onSubmit={handleSubmit}
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: 24,
            boxShadow: "0 20px 50px oklch(0 0 0 / 0.35)",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: 16, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Loại hình *</label>
              <select
                style={fieldStyle}
                value={category}
                onChange={(e) => setCategory(e.target.value as PropertyCategory)}
                onInvalid={handleInvalid}
                onInput={clearValidity}
                required
              >
                <option value="">Chọn loại hình</option>
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {categoryLabel(c)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={labelStyle}>Khu vực (Phường/Quận) *</label>
              <select
                style={fieldStyle}
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                onInvalid={handleInvalid}
                onInput={clearValidity}
                required
              >
                <option value="">Chọn khu vực</option>
                {DISTRICT_OPTIONS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={labelStyle}>Diện tích tối thiểu (m²) *</label>
              <input
                type="number"
                placeholder="VD: 80"
                style={fieldStyle}
                value={area}
                onChange={(e) => setArea(e.target.value)}
                onInvalid={handleInvalid}
                onInput={clearValidity}
                required
              />
            </div>

            <div>
              <label style={labelStyle}>Giá mong muốn (tỷ)</label>
              <input
                type="number"
                placeholder="VD: 8.5"
                style={fieldStyle}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div style={fieldWrapStyle}>
            <label style={labelStyle}>Mô tả thêm</label>
            <textarea
              placeholder="Số phòng ngủ, hướng nhà, pháp lý, tình trạng nhà..."
              style={{ ...fieldStyle, height: 90, padding: 12, resize: "vertical" }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: gridCols,
              gap: 16,
              marginBottom: 16,
              borderTop: "1px solid oklch(0.9 0.005 250)",
              paddingTop: 16,
            }}
          >
            <div>
              <label style={labelStyle}>Họ tên *</label>
              <input
                placeholder="Nguyễn Văn A"
                style={fieldStyle}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                onInvalid={handleInvalid}
                onInput={clearValidity}
                required
              />
            </div>

            <div>
              <label style={labelStyle}>Số điện thoại *</label>
              <input
                type="tel"
                inputMode="numeric"
                placeholder="090 xxx xxxx"
                style={fieldStyle}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                onInvalid={handleInvalid}
                onInput={clearValidity}
                pattern="0[0-9]{9}"
                title="Số điện thoại gồm 10 chữ số, bắt đầu bằng 0"
                required
              />
            </div>
          </div>

          {result === "success" && (
            <div style={{ background: "#dcfce7", color: "#16a34a", padding: 12, borderRadius: 8, marginBottom: 16, fontSize: 14 }}>
              Cảm ơn bạn! Thông tin đã được gửi, {BROKER.name} sẽ liên hệ trong thời gian sớm nhất.
            </div>
          )}
          {result === "error" && (
            <div style={{ background: "#fef2f2", color: "#dc2626", padding: 12, borderRadius: 8, marginBottom: 16, fontSize: 14 }}>
              {errorMessage}
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              type="submit"
              disabled={submitting}
              style={{
                width: 280,
                padding: "14px 24px",
                borderRadius: 8,
                background: "var(--accent)",
                color: "#fff",
                border: "none",
                fontWeight: 700,
                fontSize: 15,
                cursor: submitting ? "not-allowed" : "pointer",
                opacity: submitting ? 0.6 : 1,
              }}
            >
              {submitting ? "Đang gửi..." : "Gửi thông tin ký gửi"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
