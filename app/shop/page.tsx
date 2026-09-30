import type { Metadata } from "next";
import { CatalogView } from "@/components/catalog/CatalogView";
import { CategoryNav } from "@/components/catalog/CategoryNav";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader } from "@/components/ui/primitives";
import { products } from "@/data/products";
import { parseFilters, type RawSearchParams } from "@/lib/catalog";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Boutique — Toute la collection",
  description:
    "Toute la collection Maison Aube : robes de soirée, blazers, escarpins, sacs, bijoux, montres et cadeaux. Filtrez par catégorie, couleur ou prix. Livraison offerte dès 150 €.",
  path: "/shop",
});

export default async function ShopPage({ searchParams }: { searchParams: Promise<RawSearchParams> }) {
  const params = await searchParams;
  const filters = parseFilters(params);

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Boutique" }]}
        eyebrow="Collection Nouvel An"
        title="Toute la boutique"
        intro="Quarante pièces choisies pour la fin d'année : de quoi composer une tenue de réveillon complète, ou trouver le cadeau juste en quelques minutes."
      >
        <CategoryNav />
      </PageHeader>
      <div className="container">
        <CatalogView key={JSON.stringify(params)} products={products} initialFilters={filters} />
      </div>
      <JsonLd data={breadcrumbJsonLd([{ name: "Boutique", path: "/shop" }])} />
    </>
  );
}
