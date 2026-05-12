import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cravecollective.com"),
  title: "Crave Collective — Cinematic Content That Closes",
  description:
    "We create compelling visual content that turns attention into clients by building trust upfront. Cinematic video for real-estate agents and home-service businesses in Sarasota and beyond.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Crave Collective — Cinematic Content That Closes",
    description:
      "We create compelling visual content that turns attention into clients by building trust upfront. Cinematic video for real-estate agents and home-service businesses in Sarasota and beyond.",
    images: [
      {
        url: "/og-image.png",
        width: 1500,
        height: 1500,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} antialiased`}
    >
      <body>
        {/* [rule: keyboard-nav] skip-to-main-content for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-3 focus:bg-(--color-accent-primary) focus:text-(--color-accent-on-accent) focus:text-sm focus:font-medium"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
