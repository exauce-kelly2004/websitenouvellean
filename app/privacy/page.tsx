import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/LegalPage";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Politique de confidentialité",
  description: "Comment Maison Aube collecte, utilise et protège vos données personnelles, et comment exercer vos droits (RGPD).",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Politique de confidentialité"
      intro="Nous collectons le moins de données possible, et uniquement pour traiter vos commandes et améliorer votre expérience."
      path="/privacy"
      updated="15 septembre 2026"
      sections={[
        {
          id: "demo",
          title: "Site de démonstration",
          content: (
            <p>
              Ce site est une démonstration front-end. Aucune donnée saisie dans les formulaires (commande, contact, newsletter) n&apos;est transmise à un serveur. Votre panier, vos
              favoris et vos produits consultés sont enregistrés uniquement dans le stockage local de votre navigateur (localStorage), que vous pouvez effacer à tout moment.
            </p>
          ),
        },
        {
          id: "donnees",
          title: "Données collectées",
          content: (
            <ul>
              <li>Identité et coordonnées : nom, prénom, adresse e-mail, téléphone, adresse de livraison.</li>
              <li>Données de commande : articles, montants, mode de livraison.</li>
              <li>Données de navigation : pages consultées, de façon agrégée et anonymisée.</li>
            </ul>
          ),
        },
        {
          id: "finalites",
          title: "Finalités et bases légales",
          content: (
            <ul>
              <li>Traiter et livrer vos commandes (exécution du contrat).</li>
              <li>Vous envoyer notre newsletter si vous l&apos;avez demandée (consentement).</li>
              <li>Prévenir la fraude et respecter nos obligations comptables (obligation légale).</li>
            </ul>
          ),
        },
        {
          id: "conservation",
          title: "Durée de conservation",
          content: <p>Les données de commande sont conservées dix ans (obligation comptable) ; les données de prospection, trois ans après le dernier contact.</p>,
        },
        {
          id: "droits",
          title: "Vos droits",
          content: (
            <p>
              Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de limitation, d&apos;opposition et de portabilité. Écrivez-nous à {site.email} ou via
              la page <Link href="/contact">Contact</Link>. Vous pouvez également saisir la CNIL.
            </p>
          ),
        },
        {
          id: "cookies",
          title: "Cookies et stockage local",
          content: <p>Nous n&apos;utilisons aucun cookie publicitaire. Le stockage local sert uniquement à mémoriser votre panier et vos favoris sur cet appareil.</p>,
        },
      ]}
    />
  );
}
