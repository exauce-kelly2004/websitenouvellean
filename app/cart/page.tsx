import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";
import { PageHeader } from "@/components/ui/primitives";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Mon panier",
  description: "Votre panier Maison Aube : modifiez les quantités, ajoutez un code promo et choisissez votre mode de livraison.",
  path: "/cart",
  noIndex: true,
});

export default function CartPage() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Panier" }]} title="Mon panier" />
      <div className="container" style={{ paddingBlock: "var(--space-7) var(--section-y)" }}>
        <CartView />
      </div>
    </>
  );
}
