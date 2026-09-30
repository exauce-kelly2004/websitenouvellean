import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { productMap } from "@/data/products";
import { formatPrice } from "@/lib/format";
import styles from "./lunar.module.css";

const picks = ["robe-aurore-epaules-denudees", "creoles-torsadees-dorees", "sac-minuit-effet-croco"];

/** Transition narrative : de l'immersion vers la sélection. */
export function CityPrepares() {
  return (
    <section id="la-ville" className={styles.prepare} aria-labelledby="prepare-title">
      <div className={`container ${styles.prepareGrid}`}>
        <div className={styles.prepareText}>
          <span className={styles.chapterNo}>Chapitre I</span>
          <h2 id="prepare-title">
            La ville
            <br />
            se prépare.
          </h2>
          <p>
            Dans les rues, on accroche les dernières lanternes. On nettoie la maison pour faire place à la chance, on choisit une tenue neuve, on prépare les
            cadeaux pour la famille. Le rouge est partout : il porte bonheur à ceux qui le portent.
          </p>
        </div>

        <figure className={styles.prepareFigure}>
          <Image src="/images/nouvel-an/rue-lanternes.jpg" alt="Rue bordée de centaines de lanternes rouges suspendues au-dessus de la chaussée" fill sizes="(min-width: 900px) 55vw, 100vw" />
          <figcaption>Une rue, quelques jours avant la fête.</figcaption>
        </figure>

        <div className={styles.andYou}>
          <p className={styles.andYouTitle}>Et vous&nbsp;?</p>
          <ul role="list" className={styles.andYouList}>
            {picks.map((slug) => {
              const p = productMap[slug];
              return (
                <li key={slug}>
                  <Link href={`/product/${slug}`}>
                    <span className={styles.andYouThumb}>
                      <Image src={p.images[0].src} alt="" fill sizes="64px" />
                    </span>
                    <span>
                      <strong>{p.name}</strong>
                      <span>{formatPrice(p.price)}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link href="/collections/nuit-avant-lan-neuf" className={styles.textCta}>
            Découvrir la sélection du Nouvel An <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
