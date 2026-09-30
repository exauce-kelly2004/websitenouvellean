import Link from "next/link";
import { JsonLd } from "@/components/ui/JsonLd";
import { Accordion } from "@/components/ui/primitives";
import { commerce } from "@/data/site";
import styles from "./home.module.css";

const faq = [
  {
    q: "Quelle couleur porter pour le Nouvel An chinois ?",
    a: "Le rouge est la couleur de la chance et de la fête : une robe, un pull ou un sac rouge sont de mise. L'or, symbole de prospérité, se porte en bijoux. On évite en revanche le noir et le blanc intégraux, associés au deuil.",
  },
  {
    q: "Serai-je livré(e) avant le Nouvel An lunaire ?",
    a: `${commerce.giftDeadline} En express, vous pouvez commander jusqu'au 4 février à 15 h, ou retirer votre commande en boutique à Paris jusqu'au 5 février.`,
  },
  {
    q: "Quel cadeau offrir pour le Nouvel An chinois ?",
    a: "Les bijoux dorés, les montres, le cachemire ou un parfum sont des cadeaux appréciés. Offrez-les par paire ou à deux mains, et évitez les montres murales et les objets tranchants. En cas de doute, la carte cadeau, envoyée instantanément par e-mail.",
  },
  {
    q: "Puis-je échanger si la taille ne convient pas ?",
    a: `Oui, gratuitement : vous disposez de ${commerce.returnsDays} jours, prolongés jusqu'au 28 février pour les commandes du Nouvel An.`,
  },
];

/** Contenu éditorial de l'accueil : utile aux visiteurs, lisible par Google. */
export function HomeSeo() {
  return (
    <section className="section" aria-labelledby="seo-title">
      <div className={`container ${styles.seoGrid}`}>
        <div className={styles.seoText}>
          <span className="eyebrow">Le guide du Nouvel An lunaire</span>
          <h2 id="seo-title">Tenues rouges, bijoux dorés et cadeaux pour le Nouvel An chinois</h2>
          <p>
            Le Nouvel An chinois se célèbre en rouge et en neuf. Chez Maison Aube, chaque <Link href="/category/robes">robe de fête</Link> est choisie pour tenir la soirée entière,
            du dîner de famille aux premières heures de l&apos;année. Complétez avec des <Link href="/category/chaussures">escarpins</Link> confortables et un{" "}
            <Link href="/category/sacs">sac du soir</Link> rouge laque ou bordeaux.
          </p>
          <p>
            Pour offrir, nos <Link href="/category/bijoux">bijoux dorés</Link> et nos <Link href="/category/montres">montres</Link> partent dans un écrin laqué rouge. Pour
            les fêtes en famille, la collection <Link href="/collections/le-premier-janvier">Le Premier Matin</Link> réunit cachemire et manteaux longs.
          </p>
          <p>
            Livraison offerte dès {commerce.freeShippingThreshold} €, reçue avant le 6 février, écrin laqué offert et retours gratuits : il ne vous reste qu&apos;à choisir.
          </p>
        </div>
        <div>
          <h2 className={styles.faqTitle}>Questions fréquentes</h2>
          <Accordion items={faq.map((f, i) => ({ title: f.q, content: <p>{f.a}</p>, open: i === 0 }))} />
        </div>
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
    </section>
  );
}
