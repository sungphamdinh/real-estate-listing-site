"use client";

import Link from "next/link";
import { useState } from "react";
import { BROKER, brokerInitials, telHref, zaloHref } from "@/lib/format";
import { useViewportWidth } from "@/lib/useViewportWidth";

export default function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const width = useViewportWidth();
  const isCompact = width < 1024;

  const navLinkStyle: React.CSSProperties = {
    fontSize: 14,
    fontWeight: 600,
    color: "oklch(0.3 0.01 250)",
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "#fff",
        borderBottom: "1px solid oklch(0.9 0.005 250)",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: isCompact ? "0 16px" : "0 24px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            cursor: "pointer",
            minWidth: 0,
            color: "inherit",
          }}
        >
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
              fontSize: 16,
              flexShrink: 0,
            }}
          >
            {brokerInitials(BROKER.name)}
          </div>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.25, minWidth: 0 }}>
            <span
              style={{
                fontWeight: 800,
                fontSize: 16,
                letterSpacing: "-0.01em",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {BROKER.name}
            </span>
            {!isCompact && (
              <span
                style={{
                  fontSize: 12,
                  color: "oklch(0.5 0.01 250)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                title="Đầu tư BĐS khu vực TP.HCM, Đồng Nai, Lâm Đồng. Xử lí BĐS nợ bank, hỗ trợ vay bank"
              >
                Đầu tư BĐS khu vực TP.HCM, Đồng Nai, Lâm Đồng. Xử lí BĐS nợ bank, hỗ trợ vay bank
              </span>
            )}
          </div>
        </Link>

        {!isCompact && (
          <nav style={{ display: "flex", gap: 28, alignItems: "center" }}>
            <Link href="/#top" style={navLinkStyle}>Trang chủ</Link>
            <Link href="/#search" style={navLinkStyle}>Nhà đất bán</Link>
            <Link href="/#search" style={navLinkStyle}>Khu vực</Link>
            <Link href="/#contact" style={navLinkStyle}>Liên hệ</Link>
          </nav>
        )}

        <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
          {!isCompact && (
            <a
              href={zaloHref(BROKER.phone)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "9px 14px",
                borderRadius: 8,
                border: "1px solid oklch(0.85 0.01 250)",
                fontSize: 13,
                fontWeight: 700,
                color: "oklch(0.3 0.01 250)",
              }}
            >
              Zalo
            </a>
          )}
          <a
            href={telHref(BROKER.phone)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "9px 14px",
              borderRadius: 8,
              background: "var(--accent)",
              color: "#fff",
              fontSize: 13,
              fontWeight: 700,
              whiteSpace: "nowrap",
            }}
          >
            {isCompact ? "Gọi" : `Gọi ${BROKER.phone}`}
          </a>
          {isCompact && (
            <button
              onClick={() => setMobileNavOpen((v) => !v)}
              style={{
                width: 38,
                height: 38,
                borderRadius: 8,
                border: "1px solid oklch(0.85 0.01 250)",
                background: "#fff",
                fontSize: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              ☰
            </button>
          )}
        </div>
      </div>

      {mobileNavOpen && (
        <div
          style={{
            borderTop: "1px solid oklch(0.9 0.005 250)",
            padding: "14px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <Link href="/#top" onClick={() => setMobileNavOpen(false)} style={navLinkStyle}>Trang chủ</Link>
          <Link href="/#search" onClick={() => setMobileNavOpen(false)} style={navLinkStyle}>Nhà đất bán</Link>
          <Link href="/#contact" onClick={() => setMobileNavOpen(false)} style={navLinkStyle}>Liên hệ</Link>
          <a href={zaloHref(BROKER.phone)} style={{ fontSize: 14, fontWeight: 700, color: "var(--accent)" }}>
            Chat Zalo: {BROKER.phone}
          </a>
        </div>
      )}
    </header>
  );
}
