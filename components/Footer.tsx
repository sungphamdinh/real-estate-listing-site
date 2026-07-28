import Link from "next/link";
import { BROKER, brokerInitials } from "@/lib/format";

export default function Footer() {
  return (
    <footer
      id="contact"
      style={{
        background: "oklch(0.97 0.003 250)",
        borderTop: "1px solid oklch(0.9 0.005 250)",
        marginTop: 24,
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "36px 24px 28px",
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1.2fr",
          gap: 28,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 9,
                background: "var(--accent)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: 15,
              }}
            >
              {brokerInitials(BROKER.name)}
            </div>
            <span style={{ fontWeight: 800, fontSize: 16 }}>{BROKER.name}</span>
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.7, color: "oklch(0.45 0.01 250)", maxWidth: 280, margin: 0 }}>
            Chuyên tư vấn mua bán nhà phố, căn hộ, biệt thự và đất nền tại TP. Hồ Chí Minh. Tận tâm —
            minh bạch — pháp lý rõ ràng.
          </p>
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 12 }}>Liên kết nhanh</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13 }}>
            <Link href="/#top">Trang chủ</Link>
            <Link href="/#search">Tìm kiếm nâng cao</Link>
            <Link href="/#contact">Liên hệ</Link>
          </div>
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 12 }}>Khu vực nổi bật</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13, color: "oklch(0.45 0.01 250)" }}>
            <span>Quận 1 · Quận 3 · Quận 7</span>
            <span>Bình Thạnh · Phú Nhuận</span>
            <span>TP. Thủ Đức · Gò Vấp</span>
          </div>
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 12 }}>Liên hệ</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: "oklch(0.45 0.01 250)" }}>
            <span>Điện thoại: {BROKER.phone}</span>
            <span>Zalo: {BROKER.phone}</span>
            <span>Email: {BROKER.email}</span>
            <span>Văn phòng: Quận 1, TP. Hồ Chí Minh</span>
          </div>
        </div>
      </div>
      <div
        style={{
          borderTop: "1px solid oklch(0.9 0.005 250)",
          padding: "18px 24px",
          maxWidth: 1280,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <span style={{ fontSize: 12, color: "oklch(0.55 0.01 250)" }}>
          © 2026 {BROKER.name}. Thông tin đăng tải mang tính tham khảo, vui lòng liên hệ để xác nhận thực tế.
        </span>
      </div>
    </footer>
  );
}
