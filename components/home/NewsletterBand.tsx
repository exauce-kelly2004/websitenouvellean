import { GoldDust } from "@/components/motion/GoldDust";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import styles from "./home.module.css";

/** Bande newsletter arrondie, dans l'esprit des sites de référence. */
export function NewsletterBand() {
  return (
    <section className="section-tight" aria-labelledby="news-title">
      <div className="container">
        <div className={styles.newsBand}>
          <GoldDust className={styles.newsDust} density={40} />
          <h2 id="news-title">−10 % pour commencer l&apos;année</h2>
          <p>
            Code <strong>BIENVENUE10</strong> à saisir dans le panier, et nos invitations aux ventes privées de janvier en avant-première.
          </p>
          <div className={styles.newsForm}>
            <NewsletterForm />
          </div>
        </div>
      </div>
    </section>
  );
}
