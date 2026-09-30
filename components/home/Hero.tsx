import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import type { CSSProperties } from "react";
import { productMap } from "@/data/products";
import { GoldDust } from "@/components/motion/GoldDust";
import { ButtonLink } from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";
import styles from "./Hero.module.css";

const ringSlugs = [
  "robe-minuit-drapee",
  "creoles-torsadees-dorees",
  "escarpins-cristal",
  "sac-minuit-effet-croco",
  "ambre-minuit-eau-de-parfum",
  "robe-aurore-epaules-denudees",
  "montre-crepuscule",
  "bracelet-riviere-cristal",
  "manteau-long-camel",
  "sac-matelasse-chaine-perles",
];

const titleWords = ["Robes", "de", "soirée", "&", "cadeaux", "du", "Nouvel", "An"];
const goldFrom = 5;

export function Hero() {
  const ring = ringSlugs.map((s) => productMap[s]);
  return (
    <section className={styles.hero} aria-labelledby="hero-title" data-no-reveal>
      <div className={styles.glow} aria-hidden />
      <GoldDust className={styles.dust} density={90} />

      <div className={`container ${styles.copy}`}>
        <span className={styles.eyebrow}>La première impression de l&apos;année</span>
        <h1 id="hero-title" className={styles.title}>
          {titleWords.map((w, i) => (
            <span key={`${w}-${i}`} className={`${styles.word} ${i >= goldFrom ? styles.gold : ""}`} style={{ "--i": i } as CSSProperties}>
              {w}{" "}
            </span>
          ))}
        </h1>
        <p className={styles.lead}>
          Plus de 2 300 clientes et clients nous confient leur réveillon. Tenues prêtes à porter, bijoux qui captent la lumière, cadeaux emballés à la main — livrés avant le 31 décembre.
        </p>
        <div className={styles.ctas}>
          <ButtonLink href="/collections/nuit-avant-lan-neuf" size="lg" arrow>
            Trouver ma tenue
          </ButtonLink>
          <ButtonLink href="/gifts" size="lg" variant="lightOutline">
            Trouver un cadeau
          </ButtonLink>
        </div>
        <ul role="list" className={styles.checks}>
          <li>
            <Check size={15} aria-hidden /> 4,8/5 sur 2 300 avis
          </li>
          <li>
            <Check size={15} aria-hidden /> Livraison offerte dès 150 €
          </li>
          <li>
            <Check size={15} aria-hidden /> Retours gratuits jusqu&apos;au 31 janvier
          </li>
        </ul>
      </div>

      {/* Carrousel 3D : un anneau de produits qui tourne dans l'espace */}
      <div className={styles.stage} aria-label="Pièces de la collection">
        <ul role="list" className={styles.ring} style={{ "--n": ring.length } as CSSProperties}>
          {ring.map((p, i) => (
            <li key={p.slug} className={styles.face} style={{ "--i": i } as CSSProperties}>
              <Link href={`/product/${p.slug}`} className={styles.faceLink}>
                <span className={styles.faceMedia}>
                  <Image src={p.images[0].src} alt={p.images[0].alt} fill sizes="200px" priority={i < 3} />
                </span>
                <span className={styles.faceText}>
                  <span className={styles.faceName}>{p.name}</span>
                  <span className={styles.facePrice}>{formatPrice(p.price)}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.floor} aria-hidden />
      </div>
    </section>
  );
}
