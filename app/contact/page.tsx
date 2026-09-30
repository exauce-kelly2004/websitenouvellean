import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/layout/ContactForm";
import { JsonLd } from "@/components/ui/JsonLd";
import { Accordion, PageHeader } from "@/components/ui/primitives";
import { commerce, site } from "@/data/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import styles from "../info.module.css";

export const metadata: Metadata = pageMetadata({
  title: "Contact — Service client et boutique",
  description: `Contactez Maison Aube : conseil de taille, suivi de commande, retours. Par téléphone au ${site.phone}, par e-mail ou dans notre boutique du Marais à Paris.`,
  path: "/contact",
});

const faq = [
  {
    q: "Quand vais-je recevoir ma commande ?",
    a: `En livraison standard, sous 2 à 3 jours ouvrés ; en express, le lendemain avant 13 h pour toute commande passée avant 15 h. ${commerce.giftDeadline}`,
  },
  { q: "Comment retourner un article ?", a: "Une étiquette de retour prépayée est glissée dans chaque colis. Vous disposez de 30 jours, prolongés jusqu'au 31 janvier pour les commandes de décembre." },
  { q: "Puis-je modifier ma commande ?", a: "Oui, dans l'heure qui suit la commande : appelez-nous ou répondez à l'e-mail de confirmation." },
  { q: "Proposez-vous des retouches ?", a: "Les ourlets de pantalons et de manches sont offerts en boutique, en 48 h." },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Contact" }]}
        eyebrow="Service client"
        title="Nous sommes là pour vous"
        intro="Une question de taille, un cadeau à trouver, une commande à suivre ? Nos conseillères et conseillers répondent en moins de 24 h ouvrées."
      />
      <div className={`container section ${styles.contactGrid}`}>
        <section aria-labelledby="form-title">
          <h2 id="form-title" className="visually-hidden">
            Formulaire de contact
          </h2>
          <ContactForm />
        </section>
        <aside className={styles.channels} aria-label="Autres moyens de contact">
          <div className={styles.channel}>
            <Phone size={22} strokeWidth={1.5} aria-hidden />
            <div>
              <p className={styles.channelTitle}>Par téléphone</p>
              <p>
                <a href={`tel:${site.phoneHref}`}>{site.phone}</a> — appel non surtaxé
              </p>
            </div>
          </div>
          <div className={styles.channel}>
            <Mail size={22} strokeWidth={1.5} aria-hidden />
            <div>
              <p className={styles.channelTitle}>Par e-mail</p>
              <p>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </p>
            </div>
          </div>
          <div className={styles.channel}>
            <MapPin size={22} strokeWidth={1.5} aria-hidden />
            <div>
              <p className={styles.channelTitle}>En boutique</p>
              <p>{site.address}</p>
            </div>
          </div>
          <div className={styles.channel}>
            <Clock size={22} strokeWidth={1.5} aria-hidden />
            <div>
              <p className={styles.channelTitle}>Horaires</p>
              <p>{site.hours}. Ouverture exceptionnelle le dimanche 28 décembre.</p>
            </div>
          </div>
        </aside>
      </div>

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="faq-title">
        <div className="container-text">
          <h2 id="faq-title" style={{ fontSize: "var(--text-h2)", marginBottom: "var(--space-5)" }}>
            Questions fréquentes
          </h2>
          <Accordion items={faq.map((f) => ({ title: f.q, content: <p>{f.a}</p> }))} />
          <p style={{ marginTop: "var(--space-5)", fontSize: "var(--text-small)" }}>
            Toutes les informations pratiques sont sur la page{" "}
            <Link href="/shipping-returns" className="text-link">
              Livraison & retours
            </Link>
            .
          </p>
        </div>
      </section>

      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Contact", path: "/contact" }]),
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          },
        ]}
      />
    </>
  );
}
