import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";

import "./globals.css";

import EmergencyBar from "@/components/advisor/EmergencyBar";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { site } from "@/lib/site";

/**
 * Two families, self-hosted at build time by next/font — no runtime request to
 * Google. Body deliberately has none: it runs the system stack, which removes
 * the largest font asset on the site and, with it, the largest layout-shift
 * surface. See DESIGN-SYSTEM.md §4.
 *
 * On shift, precisely: `display: swap` paints the fallback first and swaps, so
 * there *is* a shift. next/font generates size-adjusted fallback metrics that
 * shrink it. It does not eliminate it, and the previous comment here claiming
 * otherwise was wrong.
 */
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-archivo",
  display: "swap",
});

/**
 * The apparatus layer: checked dates, model numbers, permit line items, cost
 * figures. One weight is all it needs — it is labelling evidence, not setting
 * copy.
 */
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Independent guidance on water heater replacement, tankless conversion and heat " +
    "pump water heaters — then an introduction to a local installer who handles that work.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`h-full ${archivo.variable} ${plexMono.variable}`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-blue focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        {/* Hides itself on /emergency. See the component for why it lives here
            rather than on the homepage alone. */}
        <EmergencyBar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
