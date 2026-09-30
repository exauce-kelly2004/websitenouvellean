import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { StoreProvider } from "@/components/providers/StoreProvider";
import { JsonLd } from "@/components/ui/JsonLd";
import { Toaster } from "@/components/ui/Toaster";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { site } from "@/data/site";
import { organizationJsonLd } from "@/lib/seo";
import "@/styles/tokens.css";
import "@/styles/globals.css";

/** Couple typographique des sites de référence (Maison Givrée) : Playfair Display + Inter. */
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Mode et cadeaux pour le Nouvel An`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    images: [{ url: "/images/editorial/hero.jpg", alt: "Maison Aube — collection du Nouvel An" }],
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0e1a36",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable}`} data-scroll-behavior="smooth">
      <body>
        <a href="#contenu" className="skip-link">
          Aller au contenu
        </a>
        <StoreProvider>
          <AnnouncementBar />
          <Header />
          <main id="contenu" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <Toaster />
          <RevealObserver />
        </StoreProvider>
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
