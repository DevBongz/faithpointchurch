import type { Metadata } from "next";
import { Inter, Oswald, Libre_Baskerville } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Faith Point - Modern Church",
  description: "A community of faith, hope, and love.",
  openGraph: {
    title: "Faith Point - Modern Church",
    description: "A community of faith, hope, and love.",
    type: "website",
    images: [
      {
        url: "https://replit.com/public/images/opengraph.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@replit",
    title: "Faith Point - Modern Church",
    description: "A community of faith, hope, and love.",
    images: ["https://replit.com/public/images/opengraph.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable} ${libreBaskerville.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

