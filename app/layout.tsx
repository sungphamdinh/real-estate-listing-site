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

const title = "Đức Linh — Bất động sản TP. Hồ Chí Minh";
const description =
  "Danh sách nhà phố, căn hộ, biệt thự và đất nền được chọn lọc tại TP. Hồ Chí Minh.";

export const metadata: Metadata = {
  metadataBase: new URL("https://linhdzi.com"),
  title: {
    default: title,
    template: "%s | Đức Linh — BĐS TP.HCM",
  },
  description,
  keywords: [
    "bất động sản TP.HCM",
    "nhà phố",
    "căn hộ",
    "biệt thự",
    "đất nền",
    "mua bán nhà đất",
    "Đức Linh",
  ],
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Đức Linh — Bất động sản TP.HCM",
    images: ["/logo.png"],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
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
