import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Đức Linh — Bất động sản TP. Hồ Chí Minh";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const HEADLINE = "Bất động sản TP. Hồ Chí Minh";
const DOMAIN = "LINHDZI.COM";

async function loadFont(weight: 500 | 700): Promise<ArrayBuffer> {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@${weight}&text=${encodeURIComponent(
      HEADLINE + DOMAIN
    )}&display=swap`,
    { headers: { "User-Agent": "Mozilla/5.0" } }
  ).then((res) => res.text());
  const url = css.match(/src: url\(([^)]+)\)/)?.[1];
  if (!url) throw new Error(`Could not resolve Be Vietnam Pro ${weight} font URL`);
  return fetch(url).then((res) => res.arrayBuffer());
}

export default async function Image() {
  const [logoData, fontRegular, fontBold] = await Promise.all([
    readFile(join(process.cwd(), "public/logo.png"), "base64"),
    loadFont(500),
    loadFont(700),
  ]);
  const logoSrc = `data:image/png;base64,${logoData}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #fdfcf8 0%, #f2eee2 100%)",
          fontFamily: "Be Vietnam Pro",
        }}
      >
        <div style={{ display: "flex", position: "absolute", top: 0, left: 0, right: 0, height: 10 }}>
          <div style={{ display: "flex", flex: 6, background: "#12305c" }} />
          <div style={{ display: "flex", flex: 1, background: "#c9a227" }} />
        </div>
        <img src={logoSrc} width={330} height={294} alt="" style={{ objectFit: "contain" }} />
        <div style={{ display: "flex", marginTop: 30, fontSize: 36, fontWeight: 700, color: "#12305c" }}>
          {HEADLINE}
        </div>
        <div style={{ display: "flex", marginTop: 16, fontSize: 22, fontWeight: 500, color: "#8a7326", letterSpacing: 4 }}>
          {DOMAIN}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Be Vietnam Pro", data: fontRegular, style: "normal", weight: 500 },
        { name: "Be Vietnam Pro", data: fontBold, style: "normal", weight: 700 },
      ],
    }
  );
}
