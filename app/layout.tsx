import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Faith Point - Modern Church",
  description: "A community of faith, hope, and love.",
  icons: {
    icon: [
      { url: "/faithpointchurch.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Faith Point - Modern Church",
    description: "A community of faith, hope, and love.",
    type: "website",
    images: [
      {
        url: "/images/insta-fp/faithpoint_banner-black.jpg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Faith Point - Modern Church",
    description: "A community of faith, hope, and love.",
    images: ["/images/insta-fp/faithpoint_banner-black.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorantGaramond.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

