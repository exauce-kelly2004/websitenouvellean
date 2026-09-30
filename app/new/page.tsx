import type { Metadata } from "next";
import { CatalogView } from "@/components/catalog/CatalogView";
import { GuideBlock } from "@/components/catalog/GuideBlock";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader } from "@/components/ui/primitives";
import { getNewProducts, parseFilters, type RawSearchParams } from "@/lib/catalog";
import { breadcrumbJsonLd, itemListJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Nouveautés — Les dernières pièces arrivées",
  description:
    "Les nouveautés Maison Aube : robes, manteaux, escarpins, bijoux et montres arrivés cette saison pour le Nouvel An. Mises en ligne chaque semaine.",
  path: "/new",
});

export default async function NewPage({ searchParams }: { searchParams: Promise<RawSearchParams> }) {
  const query = await searchParams;
  const list = getNewProducts();
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Nouveautés" }]}
        eyebrow="Tout juste arrivé"
        title="Nouveautés"
        intro="Les pièces mises en ligne ces dernières semaines, en quantités souvent limitées. Nous ajoutons de nouveaux modèles chaque jeudi jusqu'au réveillon."
        meta={`${list.length} nouveautés cette saison`}
      />
      <div className="container">
        <CatalogView key={JSON.stringify(query)} products={list} initialFilters={parseFilters(query, { sort: "nouveautes" })} base={{ sort: "nouveautes" }} />
      </div>
      <GuideBlock
        title="Être la première à les porter"
        items={[
          {
            heading: "Des séries courtes",
            body: "Nos nouveautés sont produites en petites quantités. Quand une taille est épuisée, elle l'est souvent jusqu'à la saison suivante.",
          },
          {
            heading: "Recevoir les avant-premières",
            body: "Inscrivez-vous à la newsletter en bas de page : vous découvrez les nouveautés 24 h avant leur mise en ligne.",
          },
        ]}
        links={[
          { label: "La Nuit avant l'An neuf", href: "/collections/nuit-avant-lan-neuf" },
          { label: "Meilleures ventes", href: "/collections/meilleures-ventes" },
          { label: "Toute la boutique", href: "/shop" },
        ]}
      />
      <JsonLd data={[breadcrumbJsonLd([{ name: "Nouveautés", path: "/new" }]), itemListJsonLd("Nouveautés", list)]} />
    </>
  );
}
