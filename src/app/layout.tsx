import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { SiteFooter, SiteHeader } from "@/components/site";
import "./globals.css";

// Geometric sans for UI and body copy.
const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

// High-contrast serif for editorial display headings.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: { default: "Atelier", template: "%s | Atelier" },
  description: "Leather goods, ready-to-wear and accessories from Atelier.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jost.variable} ${cormorant.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
