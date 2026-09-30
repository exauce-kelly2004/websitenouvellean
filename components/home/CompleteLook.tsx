import Image from "next/image";
import { productMap } from "@/data/products";
import { LookBuilder } from "@/components/product/LookBuilder";
import styles from "./home.module.css";

const lookSlugs = ["robe-aurore-epaules-denudees", "creoles-torsadees-dorees", "escarpins-cristal", "sac-matelasse-chaine-perles"];

export function CompleteLook() {
  const items = lookSlugs.map((s) => productMap[s]);
  return (
    <section className={`section ${styles.lookSection}`} aria-labelledby="look-title">
      <div className={`container ${styles.lookGrid}`}>
        <div className={styles.lookMedia}>
          <Image
            src="/images/editorial/look-aurore.jpg"
            alt="Femme en robe Aurore prune à épaules dénudées, portant de longs pendants d'oreilles"
            fill
            sizes="(min-width: 900px) 45vw, 100vw"
          />
        </div>
        <div className={styles.lookCopy}>
          <span className="eyebrow">Le look complet</span>
          <h2 id="look-title">Prune, or et lumière</h2>
          <p className="lead">
            La robe Aurore, des créoles dorées, des escarpins qui scintillent et un sac du soir perlé : une tenue de réveillon composée par nos stylistes. Retirez les pièces que vous avez déjà.
          </p>
          <LookBuilder products={items} title="Ajouter le look au panier" />
        </div>
      </div>
    </section>
  );
}
