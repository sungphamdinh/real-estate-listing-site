import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-be-vietnam-pro",
});

export const metadata: Metadata = {
  title: "Đức Linh — Bất động sản TP. Hồ Chí Minh",
  description:
    "Danh sách nhà phố, căn hộ, biệt thự và đất nền được chọn lọc tại TP. Hồ Chí Minh.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={beVietnamPro.variable}>
      <body style={{ minHeight: "100vh" }}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
