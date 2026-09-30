import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/LegalPage";
import { commerce, site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Livraison & retours",
  description: `Livraison offerte dès ${commerce.freeShippingThreshold} €, express en 24 h, retrait gratuit en boutique à Paris. Retours gratuits sous ${commerce.returnsDays} jours, prolongés jusqu'au 31 janvier.`,
  path: "/shipping-returns",
});

const price = (n: number) => (n === 0 ? "Gratuit" : `${n.toFixed(2).replace(".", ",")} €`);

export default function ShippingReturnsPage() {
  return (
    <LegalPage
      title="Livraison & retours"
      intro="Tout ce qu'il faut savoir pour recevoir vos pièces à temps — et les renvoyer sans frais si elles ne vous conviennent pas."
      path="/shipping-returns"
      updated="15 septembre 2026"
      sections={[
        {
          id: "delais",
          title: "Modes et délais de livraison",
          content: (
            <>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Mode</th>
                    <th scope="col">Délai</th>
                    <th scope="col">Tarif</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(commerce.shipping).map((s) => (
                    <tr key={s.label}>
                      <td>{s.label}</td>
                      <td>{s.delay}</td>
                      <td>{s.label.startsWith("Livraison standard") ? `${price(s.price)} — offerte dès ${commerce.freeShippingThreshold} €` : price(s.price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p>Les commandes passées avant 15 h en semaine sont préparées le jour même dans notre atelier logistique d&apos;Orléans.</p>
            </>
          ),
        },
        {
          id: "fetes",
          title: "Commandes pour les fêtes",
          content: (
            <>
              <p>{commerce.giftDeadline} Au-delà, choisissez la livraison express (jusqu&apos;au 30 décembre, 15 h) ou le retrait en boutique (jusqu&apos;au 31 décembre, 17 h).</p>
              <p>
                Pressé ? La <Link href="/product/carte-cadeau">carte cadeau par e-mail</Link> est envoyée instantanément, même le soir du réveillon.
              </p>
            </>
          ),
        },
        {
          id: "retours",
          title: "Retours et échanges",
          content: (
            <>
              <p>
                Vous disposez de {commerce.returnsDays} jours après réception pour nous retourner un article, gratuitement. Pour toute commande passée entre le 1er et le 31 décembre,
                ce délai est prolongé jusqu&apos;au 31 janvier.
              </p>
              <ul>
                <li>Utilisez l&apos;étiquette prépayée glissée dans votre colis, ou déposez l&apos;article en boutique.</li>
                <li>Les articles doivent être non portés, avec leurs étiquettes.</li>
                <li>Pour des raisons d&apos;hygiène, les parfums ouverts et les boucles d&apos;oreilles ne sont ni repris ni échangés.</li>
                <li>Les articles gravés ne sont pas repris, sauf défaut.</li>
              </ul>
            </>
          ),
        },
        {
          id: "remboursement",
          title: "Remboursement",
          content: <p>Le remboursement est effectué sur le moyen de paiement utilisé, sous 5 jours ouvrés après réception du retour. Un e-mail vous confirme chaque étape.</p>,
        },
        {
          id: "international",
          title: "Livraison à l'international",
          content: <p>Nous livrons la Belgique, le Luxembourg, la Suisse et Monaco en 3 à 5 jours ouvrés (12,90 €, offerte dès 250 €). Les droits de douane suisses sont inclus.</p>,
        },
        {
          id: "aide",
          title: "Besoin d'aide ?",
          content: (
            <p>
              Notre service client répond au {site.phone} ({site.hours.toLowerCase()}) ou via la page <Link href="/contact">Contact</Link>.
            </p>
          ),
        },
      ]}
    />
  );
}
