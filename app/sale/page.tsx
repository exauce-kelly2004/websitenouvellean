import type { Metadata } from "next";
import { CatalogView } from "@/components/catalog/CatalogView";
import { GuideBlock } from "@/components/catalog/GuideBlock";
import { Countdown } from "@/components/home/Countdown";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader } from "@/components/ui/primitives";
import { getSaleProducts, parseFilters, type RawSearchParams } from "@/lib/catalog";
import { breadcrumbJsonLd, itemListJsonLd, pageMetadata } from "@/lib/seo";
import styles from "./sale.module.css";

export const metadata: Metadata = pageMetadata({
  title: "Offres — Promotions du Nouvel An lunaire",
  description:
    "Les offres Maison Aube : pièces à prix réduit et code ANNEUF pour −15 % sur votre commande dès 100 € jusqu'au 6 février.",
  path: "/sale",
});

export default async function SalePage({ searchParams }: { searchParams: Promise<RawSearchParams> }) {
  const query = await searchParams;
  const list = getSaleProducts();
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Offres" }]}
        eyebrow="Offres du moment"
        title="Promotions de l'An neuf"
        intro="Une sélection de pièces à prix réduit, et une offre valable sur tout le site jusqu'au Nouvel An lunaire."
      >
        <div className={styles.offer}>
          <div>
            <p className={styles.offerTitle}>
              −15 % avec le code <span className={styles.code}>ANNEUF</span>
            </p>
            <p className={styles.offerText}>Sur toute votre commande dès 100 €, cumulable avec les prix barrés. Jusqu&apos;au 6 février.</p>
          </div>
          <Countdown tone="dark" />
        </div>
      </PageHeader>
      <div className="container">
        <CatalogView
          key={JSON.stringify(query)}
          products={list}
          initialFilters={parseFilters(query, { onSale: true })}
          base={{ onSale: true }}
          emptySuggestions={[{ label: "Voir les nouveautés", href: "/new" }]}
        />
      </div>
      <GuideBlock
        title="Nos promotions, simplement"
        items={[
          {
            heading: "Des prix barrés honnêtes",
            body: "Le prix barré est le prix auquel la pièce a été vendue pendant au moins 30 jours avant la remise, conformément à la réglementation.",
          },
          {
            heading: "Échanges et retours",
            body: "Les pièces en promotion s'échangent et se retournent dans les mêmes conditions que le reste de la collection : 30 jours, gratuitement.",
          },
        ]}
        links={[
          { label: "Conditions générales de vente", href: "/terms" },
          { label: "Livraison & retours", href: "/shipping-returns" },
        ]}
      />
      <JsonLd data={[breadcrumbJsonLd([{ name: "Offres", path: "/sale" }]), itemListJsonLd("Offres", list)]} />
    </>
  );
}
