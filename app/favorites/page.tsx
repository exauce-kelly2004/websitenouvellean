import type { Metadata } from "next";
import { FavoritesView } from "@/components/cart/FavoritesView";
import { PageHeader } from "@/components/ui/primitives";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Mes favoris",
  description: "Retrouvez les pièces que vous avez mises de côté sur Maison Aube.",
  path: "/favorites",
  noIndex: true,
});

export default function FavoritesPage() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Mes favoris" }]} title="Mes favoris" />
      <div className="container" style={{ paddingBlock: "var(--space-7) var(--section-y)" }}>
        <FavoritesView />
      </div>
    </>
  );
}
