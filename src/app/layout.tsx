import type { Metadata } from "next";
import "./globals.css";
import { GraticuleSymbol } from "@/components/Graticule";

export const metadata: Metadata = {
  metadataBase: new URL("https://graticus.com"),
  title: "Graticus — Built for Small Pharma",
  description:
    "Purpose-built tools and advisory for small and emerging pharma companies — the Protocol Generator, decision training, and experienced strategic counsel.",
  openGraph: {
    title: "Graticus — Built for Small Pharma",
    description: "The infrastructure small pharma actually needs.",
    url: "https://graticus.com",
    siteName: "Graticus",
    images: ["/og-image.png"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Graticus — Built for Small Pharma",
    description: "The infrastructure small pharma actually needs.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500&family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <GraticuleSymbol />
        {children}
      </body>
    </html>
  );
}
