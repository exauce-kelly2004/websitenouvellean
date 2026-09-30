import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogView } from "@/components/catalog/CatalogView";
import { CategoryNav } from "@/components/catalog/CategoryNav";
import { GuideBlock } from "@/components/catalog/GuideBlock";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader } from "@/components/ui/primitives";
import { categories, categoryMap } from "@/data/categories";
import { collections } from "@/data/collections";
import { getProductsByCategory, parseFilters, type RawSearchParams } from "@/lib/catalog";
import { breadcrumbJsonLd, itemListJsonLd, pageMetadata } from "@/lib/seo";
import type { CategorySlug } from "@/types";

type Params = Promise<{ slug: string }>;

/** Seuls les slugs connus existent : les autres renvoient un vrai 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const category = categoryMap[slug as CategorySlug];
  if (!category) return { title: "Catégorie introuvable" };
  return pageMetadata({
    title: category.title,
    description: category.metaDescription,
    path: `/category/${category.slug}`,
    image: category.image,
  });
}

export default async function CategoryPage({ params, searchParams }: { params: Params; searchParams: Promise<RawSearchParams> }) {
  const { slug } = await params;
  const category = categoryMap[slug as CategorySlug];
  if (!category) notFound();

  const query = await searchParams;
  const list = getProductsByCategory(category.slug);
  const related = collections.filter((col) => list.some((p) => p.collections.includes(col.slug)));

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Boutique", href: "/shop" }, { label: category.name }]}
        eyebrow={`${list.length} pièces`}
        title={category.title}
        intro={category.intro}
      >
        <CategoryNav current={category.slug} />
      </PageHeader>
      <div className="container">
        <CatalogView
          key={JSON.stringify(query)}
          products={list}
          initialFilters={parseFilters(query)}
          hideCategoryFacet
          emptySuggestions={[
            { label: "Voir toute la boutique", href: "/shop" },
            { label: "Idées cadeaux", href: "/gifts" },
          ]}
        />
      </div>
      <GuideBlock
        title={`Bien choisir : ${category.name.toLowerCase()}`}
        items={category.guide}
        links={[
          ...related.map((c) => ({ label: `Collection ${c.name}`, href: `/collections/${c.slug}` })),
          { label: "Guide des cadeaux", href: "/gifts" },
          { label: "Livraison & retours", href: "/shipping-returns" },
        ]}
      />
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Boutique", path: "/shop" },
            { name: category.name, path: `/category/${category.slug}` },
          ]),
          itemListJsonLd(category.title, list),
        ]}
      />
    </>
  );
}
