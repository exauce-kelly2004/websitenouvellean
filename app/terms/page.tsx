import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/LegalPage";
import { commerce, site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Conditions générales de vente",
  description: "Conditions générales de vente Maison Aube : commandes, prix, paiement, livraison, droit de rétractation, garanties et codes promotionnels.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Conditions générales de vente"
      intro="Les présentes conditions régissent les ventes réalisées sur le site Maison Aube. Elles sont fictives et rédigées pour cette démonstration."
      path="/terms"
      updated="15 septembre 2026"
      sections={[
        {
          id: "objet",
          title: "1. Objet",
          content: (
            <p>
              Les présentes conditions s&apos;appliquent à toute commande passée sur le site {site.name}, édité par Maison Aube SAS (société fictive), {site.address}.
            </p>
          ),
        },
        {
          id: "commande",
          title: "2. Commande",
          content: <p>La commande est ferme après validation du paiement. Un e-mail de confirmation récapitule les articles, le prix total et le mode de livraison.</p>,
        },
        {
          id: "prix",
          title: "3. Prix",
          content: (
            <p>
              Les prix sont indiqués en euros, toutes taxes comprises. Les prix barrés correspondent au prix le plus bas pratiqué au cours des 30 jours précédant la réduction.
            </p>
          ),
        },
        {
          id: "promotions",
          title: "4. Codes promotionnels",
          content: (
            <ul>
              <li>ANNEUF : −15 % sur la commande dès 100 € d&apos;achat, valable jusqu&apos;au 6 février.</li>
              <li>BIENVENUE10 : −10 % sur la première commande, reçu après inscription à la newsletter.</li>
              <li>Un seul code par commande ; non applicable à l&apos;achat de cartes cadeaux.</li>
            </ul>
          ),
        },
        {
          id: "paiement",
          title: "5. Paiement",
          content: <p>Le paiement s&apos;effectue par carte bancaire, Apple Pay ou PayPal, en une fois ou en trois fois sans frais. Les transactions sont sécurisées (3-D Secure).</p>,
        },
        {
          id: "livraison",
          title: "6. Livraison",
          content: (
            <p>
              Les délais et tarifs sont détaillés sur la page <Link href="/shipping-returns">Livraison & retours</Link>. La livraison standard est offerte dès{" "}
              {commerce.freeShippingThreshold} €.
            </p>
          ),
        },
        {
          id: "retractation",
          title: "7. Droit de rétractation",
          content: (
            <p>
              Conformément au Code de la consommation, vous disposez de 14 jours pour vous rétracter. Nous étendons ce délai à {commerce.returnsDays} jours, et jusqu&apos;au 31 janvier
              pour les commandes de décembre.
            </p>
          ),
        },
        {
          id: "garanties",
          title: "8. Garanties",
          content: <p>Tous nos produits bénéficient de la garantie légale de conformité et de la garantie des vices cachés. Les montres sont garanties deux ans.</p>,
        },
        {
          id: "litiges",
          title: "9. Litiges",
          content: <p>En cas de litige, une solution amiable sera recherchée en priorité. À défaut, vous pouvez recourir gratuitement à un médiateur de la consommation.</p>,
        },
      ]}
    />
  );
}
