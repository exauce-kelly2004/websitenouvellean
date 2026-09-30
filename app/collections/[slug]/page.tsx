import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CatalogView } from "@/components/catalog/CatalogView";
import { EditorialHeader } from "@/components/catalog/EditorialHeader";
import { GuideBlock } from "@/components/catalog/GuideBlock";
import { JsonLd } from "@/components/ui/JsonLd";
import { collectionMap, collections } from "@/data/collections";
import { getProductsByCollection, parseFilters, type RawSearchParams } from "@/lib/catalog";
import { breadcrumbJsonLd, itemListJsonLd, pageMetadata } from "@/lib/seo";
import type { CollectionSlug } from "@/types";

type Params = Promise<{ slug: string }>;

/** Seuls les slugs connus existent : les autres renvoient un vrai 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const collection = collectionMap[slug as CollectionSlug];
  if (!collection) return { title: "Collection introuvable" };
  return pageMetadata({
    title: collection.title,
    description: collection.metaDescription,
    path: `/collections/${collection.slug}`,
    image: collection.image,
  });
}

export default async function CollectionPage({ params, searchParams }: { params: Params; searchParams: Promise<RawSearchParams> }) {
  const { slug } = await params;
  const collection = collectionMap[slug as CollectionSlug];
  if (!collection) notFound();

  const query = await searchParams;
  const list = getProductsByCollection(collection.slug);
  const isBest = collection.slug === "meilleures-ventes";
  const others = collections.filter((c) => c.slug !== collection.slug);

  return (
    <>
      <EditorialHeader
        crumbs={[{ label: "Boutique", href: "/shop" }, { label: collection.name }]}
        eyebrow={`${collection.eyebrow} · ${list.length} pièces`}
        title={collection.name}
        intro={collection.intro}
        image={collection.image}
      />
      <div className="container">
        <CatalogView
          key={JSON.stringify(query)}
          products={list}
          initialFilters={parseFilters(query, isBest ? { sort: "popularite" } : {})}
          base={isBest ? { sort: "popularite" } : {}}
        />
      </div>
      <GuideBlock
        title="L'histoire de la collection"
        items={[
          { heading: "L'intention", body: collection.story },
          {
            heading: "Autres collections",
            body: "Chaque collection se combine avec les autres : une pièce du soir se porte très bien le lendemain.",
          },
        ]}
        links={[...others.map((c) => ({ label: c.name, href: `/collections/${c.slug}` })), { label: "Idées cadeaux", href: "/gifts" }]}
      >
        <p>
          Besoin d&apos;un conseil de taille ou d&apos;association ? Nos stylistes répondent du lundi au samedi —{" "}
          <Link href="/contact" className="text-link">
            contactez-nous
          </Link>
          .
        </p>
      </GuideBlock>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: collection.name, path: `/collections/${collection.slug}` }]),
          itemListJsonLd(collection.title, list),
        ]}
      />
    </>
  );
}
