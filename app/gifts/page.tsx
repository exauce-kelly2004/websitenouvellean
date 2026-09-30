import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, Gift, PenLine, RotateCcw } from "lucide-react";
import { EditorialHeader } from "@/components/catalog/EditorialHeader";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ArrowLink, ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeader } from "@/components/ui/primitives";
import { products } from "@/data/products";
import { commerce } from "@/data/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import type { Product } from "@/types";
import styles from "./gifts.module.css";

export const metadata: Metadata = pageMetadata({
  title: "Idées cadeaux du Nouvel An — pour elle, pour lui, par budget",
  description:
    "Guide des cadeaux Maison Aube : bijoux, montres, parfums, accessoires et cartes cadeaux, classés par budget et par destinataire. Emballage cadeau et carte manuscrite offerts.",
  path: "/gifts",
  image: { src: "/images/editorial/rubans.jpg", alt: "Écrins cadeaux noirs noués de rubans dorés" },
});

/** Les cadeaux « sans taille » d'abord : plus sûrs à offrir. */
const giftable = products.filter((p) => !["robes", "pantalons"].includes(p.category));
const bySafety = (a: Product, b: Product) => Number(Boolean(a.sizes && a.sizeLabel !== "Montant" && a.sizeLabel !== "Contenance")) - Number(Boolean(b.sizes && b.sizeLabel !== "Montant" && b.sizeLabel !== "Contenance")) || b.reviewCount - a.reviewCount;

const sections = [
  {
    id: "moins-de-100",
    eyebrow: "Petits prix, grand effet",
    title: "Moins de 100 €",
    description: "Des attentions qui ne font pas « petit cadeau » : bijoux dorés, soie, beauté.",
    items: giftable.filter((p) => p.price < 100 && p.slug !== "carte-cadeau"),
  },
  {
    id: "100-250",
    eyebrow: "Le juste milieu",
    title: "De 100 à 250 €",
    description: "Montres, cachemire, parfum, escarpins : les cadeaux qu'on garde des années.",
    items: giftable.filter((p) => p.price >= 100 && p.price <= 250),
  },
  {
    id: "exception",
    eyebrow: "Pour marquer l'année",
    title: "Les cadeaux d'exception",
    description: "Pour une personne qui compte beaucoup, ou pour se faire plaisir.",
    items: giftable.filter((p) => p.price > 250),
  },
  {
    id: "pour-elle",
    eyebrow: "Pour elle",
    title: "Ses cadeaux préférés",
    description: "Sélectionnés parmi les pièces les plus offertes l'an dernier.",
    items: products.filter((p) => p.audience !== "homme" && ["bijoux", "sacs", "montres", "beaute-parfums"].includes(p.category)),
  },
  {
    id: "pour-lui",
    eyebrow: "Pour lui",
    title: "Idées cadeaux homme",
    description: "Portefeuille, montre, cravate, cachemire : pas de taille à deviner pour la plupart.",
    items: products.filter((p) => p.audience !== "femme" && p.category !== "coffrets-cadeaux"),
  },
].map((s) => ({ ...s, items: [...s.items].sort(bySafety).slice(0, 8) }));

const services = [
  { icon: Gift, title: "Écrin offert", text: "Chaque commande peut être emballée dans notre écrin noir noué d'un ruban." },
  { icon: PenLine, title: "Carte manuscrite", text: "Écrivez votre message au panier : nous le recopions à la main." },
  { icon: RotateCcw, title: "Retours jusqu'au 31 janvier", text: "La personne qui reçoit le cadeau peut l'échanger sans frais." },
  { icon: Clock, title: "Livraison avant le réveillon", text: commerce.giftDeadline },
];

export default function GiftsPage() {
  return (
    <>
      <EditorialHeader
        crumbs={[{ label: "Idées cadeaux" }]}
        eyebrow="Guide des cadeaux"
        title="Offrir la première impression"
        intro="Par budget ou par destinataire, nos idées pour ne pas se tromper. Emballage en écrin et carte manuscrite offerts sur chaque commande."
        image={{ src: "/images/editorial/rubans.jpg", alt: "Écrins cadeaux noirs noués de rubans dorés" }}
      >
        <nav aria-label="Rubriques du guide" className={styles.jump}>
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`}>
              {s.title}
            </a>
          ))}
          <a href="#carte-cadeau">Carte cadeau</a>
        </nav>
      </EditorialHeader>

      <section className={styles.services} aria-label="Services cadeaux">
        <ul role="list" className="container">
          {services.map(({ icon: Icon, title, text }) => (
            <li key={title}>
              <Icon size={22} strokeWidth={1.4} aria-hidden />
              <div>
                <p className={styles.serviceTitle}>{title}</p>
                <p className={styles.serviceText}>{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {sections.map((s) => (
        <section key={s.id} id={s.id} className={`section ${styles.anchor}`} aria-labelledby={`${s.id}-title`}>
          <div className="container">
            <SectionHeader id={`${s.id}-title`} eyebrow={s.eyebrow} title={s.title} description={s.description} />
            <ProductGrid products={s.items} />
          </div>
        </section>
      ))}

      <section id="carte-cadeau" className={`section ${styles.card} ${styles.anchor}`} aria-labelledby="card-title">
        <div className={`container ${styles.cardGrid}`}>
          <div className={styles.cardMedia}>
            <Image src="/images/editorial/paquet.jpg" alt="Mains tenant un paquet cadeau en papier kraft" fill sizes="(min-width: 900px) 40vw, 100vw" />
          </div>
          <div className={styles.cardCopy}>
            <span className="eyebrow">Toujours juste</span>
            <h2 id="card-title">La carte cadeau</h2>
            <p className="lead">
              De 50 à 300 €, valable un an sur tout le site et dans notre boutique du Marais. Envoyée dans un écrin sous 24 h, ou par e-mail à la date de votre choix — même le 31
              décembre à 23 h.
            </p>
            <div className={styles.cardActions}>
              <ButtonLink href="/product/carte-cadeau" size="lg" arrow>
                Offrir une carte cadeau
              </ButtonLink>
              <ArrowLink href="/product/coffret-surprise-nouvel-an">Ou le coffret surprise</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="gift-faq">
        <div className="container-text prose">
          <h2 id="gift-faq">Questions fréquentes sur les cadeaux</h2>
          <h3>Le prix apparaît-il sur le colis ?</h3>
          <p>Non. Quand vous cochez « C&apos;est un cadeau » dans le panier, les prix sont masqués sur le bon de livraison.</p>
          <h3>Et si la taille ne convient pas ?</h3>
          <p>
            L&apos;échange est gratuit jusqu&apos;au 31 janvier pour toute commande passée en décembre. Consultez nos{" "}
            <Link href="/shipping-returns">conditions de livraison et de retour</Link>.
          </p>
          <h3>Puis-je faire livrer directement la personne ?</h3>
          <p>Oui : indiquez simplement son adresse à l&apos;étape de livraison. Votre message manuscrit sera glissé dans l&apos;écrin.</p>
        </div>
      </section>

      <JsonLd data={breadcrumbJsonLd([{ name: "Idées cadeaux", path: "/gifts" }])} />
    </>
  );
}
