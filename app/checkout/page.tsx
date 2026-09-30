import type { Metadata } from "next";
import { CheckoutView } from "@/components/cart/CheckoutView";
import { PageHeader } from "@/components/ui/primitives";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Commande",
  description: "Finalisez votre commande Maison Aube en toute sécurité.",
  path: "/checkout",
  noIndex: true,
});

export default function CheckoutPage() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Panier", href: "/cart" }, { label: "Commande" }]} title="Finaliser ma commande" />
      <div className="container" style={{ paddingBlock: "var(--space-7) var(--section-y)" }}>
        <CheckoutView />
      </div>
    </>
  );
}
