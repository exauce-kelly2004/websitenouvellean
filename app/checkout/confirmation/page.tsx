import type { Metadata } from "next";
import { ConfirmationView } from "@/components/cart/ConfirmationView";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Commande confirmée",
  description: "Merci pour votre commande Maison Aube.",
  path: "/checkout/confirmation",
  noIndex: true,
});

export default function ConfirmationPage() {
  return (
    <div className="container-text" style={{ paddingBlock: "var(--section-y)" }}>
      <ConfirmationView />
    </div>
  );
}
