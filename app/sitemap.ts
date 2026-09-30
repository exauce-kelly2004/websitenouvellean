import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { collections } from "@/data/collections";
import { products } from "@/data/products";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, site.url).toString();
  const lastModified = new Date("2026-09-29");

  const staticRoutes: { path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, changeFrequency: "daily" },
    { path: "/shop", priority: 0.9, changeFrequency: "daily" },
    { path: "/new", priority: 0.9, changeFrequency: "weekly" },
    { path: "/gifts", priority: 0.9, changeFrequency: "weekly" },
    { path: "/sale", priority: 0.8, changeFrequency: "weekly" },
    { path: "/about", priority: 0.5, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.5, changeFrequency: "monthly" },
    { path: "/shipping-returns", priority: 0.4, changeFrequency: "monthly" },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  ];

  return [
    ...staticRoutes.map((r) => ({ url: url(r.path), lastModified, changeFrequency: r.changeFrequency, priority: r.priority })),
    ...categories.map((c) => ({ url: url(`/category/${c.slug}`), lastModified, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...collections.map((c) => ({ url: url(`/collections/${c.slug}`), lastModified, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...products.map((p) => ({
      url: url(`/product/${p.slug}`),
      lastModified: new Date(p.addedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
      images: p.images.map((i) => url(i.src)),
    })),
  ];
}
