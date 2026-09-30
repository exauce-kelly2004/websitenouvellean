import type { Metadata } from "next";
import Image from "next/image";
import { EditorialHeader } from "@/components/catalog/EditorialHeader";
import { Reassurance } from "@/components/home/Reassurance";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { site } from "@/data/site";
import credits from "@/data/photoCredits.json";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import styles from "../info.module.css";

export const metadata: Metadata = pageMetadata({
  title: "Notre histoire — La Maison",
  description:
    "Maison Aube, boutique parisienne de mode et d'accessoires fondée dans le Marais : nos ateliers européens, nos matières, notre façon de travailler et notre engagement.",
  path: "/about",
  image: { src: "/images/editorial/boutique.jpg", alt: "La boutique Maison Aube le soir" },
});

const figures = [
  { value: "2019", label: "Ouverture de la boutique du Marais" },
  { value: "14", label: "Ateliers partenaires en Europe" },
  { value: "4,8/5", label: "Note moyenne sur 2 300 avis" },
  { value: "92 %", label: "Pièces encore portées après trois ans*" },
];

export default function AboutPage() {
  return (
    <>
      <EditorialHeader
        crumbs={[{ label: "La Maison" }]}
        eyebrow="Notre histoire"
        title="Des vêtements pour les moments qui comptent"
        intro="Maison Aube est née d'une idée simple : les pièces que l'on choisit pour une grande soirée devraient être assez belles — et assez bien faites — pour être portées bien après."
        image={{ src: "/images/editorial/boutique.jpg", alt: "Portants de vêtements éclairés dans la boutique Maison Aube" }}
        tone="light"
      />

      <section className="section">
        <div className={`container ${styles.split}`}>
          <div className="prose">
            <h2>L&apos;aube plutôt que la fête</h2>
            <p>
              Nous avons ouvert notre boutique rue Vieille-du-Temple en 2019. Le nom vient d&apos;un constat fait lors de notre premier réveillon derrière le comptoir : les clientes et
              clients ne cherchaient pas une tenue « de fête », mais une tenue dans laquelle ils se sentiraient eux-mêmes, en mieux, au moment où l&apos;année bascule.
            </p>
            <p>
              C&apos;est pour cela que nos collections évitent les paillettes gratuites et les pièces jetables. Une robe du 31 doit pouvoir sortir en mars ; un blazer acheté pour un
              dîner doit tenir dix hivers.
            </p>
            <h2>Des ateliers que nous connaissons</h2>
            <p>
              Nos pièces sont fabriquées par quatorze ateliers partenaires au Portugal, en Italie, en Espagne et en France. Nous les visitons chaque saison, et nous publions leur
              liste sur demande. Les petites séries — soixante robes Rubis, deux cents coffrets — sont un choix : elles limitent les invendus.
            </p>
            <h2>Ce que nous vous promettons</h2>
            <ul>
              <li>Des matières décrites honnêtement, fiche par fiche.</li>
              <li>Des prix barrés réels, jamais gonflés.</li>
              <li>Un conseil humain, par téléphone ou en boutique, six jours sur sept.</li>
              <li>Des retours gratuits, sans justification.</li>
            </ul>
          </div>
          <div className={styles.stickyMedia}>
            <Image src="/images/editorial/portant.jpg" alt="Mailles et manteaux en laine sur un portant" fill sizes="(min-width: 900px) 40vw, 100vw" />
          </div>
        </div>
      </section>

      <section className={`section ${styles.figures}`} aria-label="Maison Aube en chiffres">
        <ul role="list" className="container">
          {figures.map((f) => (
            <li key={f.label}>
              <span className={styles.figure}>{f.value}</span>
              <span className={styles.figureLabel}>{f.label}</span>
            </li>
          ))}
        </ul>
        <p className={`container ${styles.footnote}`}>* Enquête déclarative menée auprès de 640 clientes et clients en 2025.</p>
      </section>

      <section className="section">
        <div className={`container ${styles.cta}`}>
          <h2>Venez nous voir</h2>
          <p>
            {site.address} — {site.hours}. Retouches d&apos;ourlets offertes et conseil personnalisé sur rendez-vous.
          </p>
          <div className={styles.ctaActions}>
            <ButtonLink href="/contact" arrow>
              Nous contacter
            </ButtonLink>
            <ButtonLink href="/shop" variant="secondary">
              Découvrir la boutique
            </ButtonLink>
          </div>
        </div>
      </section>

      <Reassurance variant="brand" />
      <section id="credits" className="section-tight" aria-labelledby="credits-title">
        <div className="container-text prose">
          <h2 id="credits-title">Crédits photographiques</h2>
          <p>Photographies produits : Unsplash. Photographies de rues et d&apos;architecture, sous licence Creative Commons :</p>
          <ul>
            {credits.map((c) => (
              <li key={c.file}>
                « {c.title} » — {c.creator}, {c.license} (
                <a href={c.source} rel="noopener noreferrer" target="_blank">
                  source
                </a>
                )
              </li>
            ))}
          </ul>
        </div>
      </section>
      <JsonLd data={breadcrumbJsonLd([{ name: "La Maison", path: "/about" }])} />
    </>
  );
}
