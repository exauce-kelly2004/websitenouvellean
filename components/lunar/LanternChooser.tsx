"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState, type CSSProperties } from "react";
import { productMap } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import styles from "./lunar.module.css";

const lanterns = [
  {
    id: "eclat",
    name: "Éclat",
    wish: "pour briller le soir de la fête",
    text: "Paillettes, strass et rouge profond : la sélection pour être vu(e) de loin dans la rue illuminée.",
    products: ["ensemble-eclat-paillete", "escarpins-cristal", "bracelet-riviere-cristal"],
    href: "/collections/nuit-avant-lan-neuf",
    hue: 0,
  },
  {
    id: "fortune",
    name: "Fortune",
    wish: "pour attirer l'or et la chance",
    text: "L'or est la couleur de la prospérité. Créoles, montres et fermoirs dorés, à porter ou à offrir.",
    products: ["creoles-torsadees-dorees", "montre-sable", "sac-minuit-effet-croco"],
    href: "/category/bijoux",
    hue: 22,
  },
  {
    id: "douceur",
    name: "Douceur",
    wish: "pour les retrouvailles en famille",
    text: "Cachemire, laine et satin : des pièces confortables pour les longs dîners et les visites aux proches.",
    products: ["pull-cachemire-framboise", "manteau-long-camel", "pantalon-fluide-poudre"],
    href: "/collections/le-premier-janvier",
    hue: 12,
  },
  {
    id: "promesse",
    name: "Promesse",
    wish: "pour quelqu'un de précieux",
    text: "Un collier de perles, une bague, un parfum : les cadeaux qui disent plus qu'une carte.",
    products: ["collier-perles-eau-douce", "bague-halo", "ambre-minuit-eau-de-parfum"],
    href: "/gifts#exception",
    hue: -8,
  },
  {
    id: "renouveau",
    name: "Renouveau",
    wish: "pour commencer l'année autrement",
    text: "Les dernières pièces arrivées, produites en petites séries. Pour faire peau neuve avec l'année.",
    products: ["escarpins-velours-bleu-nuit", "sac-matelasse-chaine-perles", "manteau-long-camel"],
    href: "/new",
    hue: 30,
  },
];

export function LanternChooser() {
  const [active, setActive] = useState(0);
  const current = lanterns[active];

  return (
    <section className={styles.chooser} aria-labelledby="chooser-title">
      <div className="container">
        <div className={styles.chooserHead}>
          <span className={styles.chapterNo}>Chapitre II</span>
          <h2 id="chooser-title">Choisissez votre lanterne.</h2>
          <p>Chaque lanterne porte un vœu. Allumez celle qui vous ressemble : elle vous montre le chemin vers votre sélection.</p>
        </div>

        <div className={styles.lanterns} role="tablist" aria-label="Vœux du Nouvel An">
          {lanterns.map((l, i) => (
            <button
              key={l.id}
              type="button"
              role="tab"
              id={`tab-${l.id}`}
              aria-selected={active === i}
              aria-controls="lantern-panel"
              className={styles.lanternBtn}
              style={{ "--hue": `${l.hue}deg`, "--i": i } as CSSProperties}
              onClick={() => setActive(i)}
            >
              <span className={styles.cord} aria-hidden />
              <span className={styles.lantern3d} aria-hidden>
                <span className={styles.lanternCap} />
                <span className={styles.lanternGlobe} />
                <span className={styles.lanternCap} />
                <span className={styles.lanternTassel} />
              </span>
              <span className={styles.lanternName}>{l.name}</span>
              <span className={styles.lanternWish}>{l.wish}</span>
            </button>
          ))}
        </div>

        <div id="lantern-panel" role="tabpanel" aria-labelledby={`tab-${current.id}`} className={styles.chooserPanel} key={current.id}>
          <div className={styles.chooserIntro}>
            <p className={styles.chooserWish}>
              Lanterne <em>{current.name}</em> — {current.wish}
            </p>
            <p>{current.text}</p>
            <Link href={current.href} className={styles.textCtaLight}>
              Voir toute la sélection <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
          <ul role="list" className={styles.chooserProducts}>
            {current.products.map((slug) => (
              <li key={slug}>
                <ProductCard product={productMap[slug]} sizes="(min-width: 900px) 22vw, 70vw" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
