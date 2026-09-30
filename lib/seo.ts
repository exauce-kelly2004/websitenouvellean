import type { Metadata } from "next";
import { categoryMap } from "@/data/categories";
import { site } from "@/data/site";
import type { Product, Review } from "@/types";
import { isInStock } from "./catalog";

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  image?: { src: string; alt: string };
  noIndex?: boolean;
}

export function pageMetadata({ title, description, path, image, noIndex }: PageMetaInput): Metadata {
  const ogImage = image ?? { src: "/images/editorial/hero.jpg", alt: "Maison Aube — collection du Nouvel An" };
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      url: path,
      title,
      description,
      images: [{ url: ogImage.src, alt: ogImage.alt }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage.src] },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}

export function absoluteUrl(path: string) {
  return new URL(path, site.url).toString();
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Accueil", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function productJsonLd(product: Product, reviews: Review[]) {
  const offers =
    product.sizes && product.sizes.some((s) => s.price)
      ? {
          "@type": "AggregateOffer",
          priceCurrency: "EUR",
          lowPrice: Math.min(...product.sizes.map((s) => s.price ?? product.price)),
          highPrice: Math.max(...product.sizes.map((s) => s.price ?? product.price)),
          offerCount: product.sizes.length,
          availability: isInStock(product) ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        }
      : {
          "@type": "Offer",
          url: absoluteUrl(`/product/${product.slug}`),
          priceCurrency: "EUR",
          price: product.price,
          availability: isInStock(product) ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          itemCondition: "https://schema.org/NewCondition",
          seller: { "@type": "Organization", name: site.name },
        };

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.slug.toUpperCase(),
    category: categoryMap[product.category].name,
    brand: { "@type": "Brand", name: site.name },
    image: product.images.map((i) => absoluteUrl(i.src)),
    color: product.colors.map((c) => c.name).join(", "),
    aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviewCount, bestRating: 5 },
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      datePublished: r.date,
      name: r.title,
      reviewBody: r.body,
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
    })),
    offers,
  };
}

export function itemListJsonLd(name: string, products: Product[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: products.slice(0, 20).map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(`/product/${p.slug}`),
      name: p.name,
    })),
  };
}

export function organizationJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "ClothingStore",
      name: site.name,
      url: site.url,
      logo: absoluteUrl("/icon.svg"),
      email: site.email,
      telephone: site.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: "18 rue Vieille-du-Temple",
        postalCode: "75004",
        addressLocality: "Paris",
        addressCountry: "FR",
      },
      openingHours: "Mo-Sa 09:00-19:00",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: site.name,
      url: site.url,
      potentialAction: {
        "@type": "SearchAction",
        target: `${site.url}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ];
}
