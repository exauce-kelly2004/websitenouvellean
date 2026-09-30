import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Countdown } from "./Countdown";
import styles from "./home.module.css";

/** Deux bannières côte à côte : offre « Avant minuit » avec compte à rebours + collection soirée. */
export function PromoBanners() {
  return (
    <section className="section-tight" aria-label="Offres du moment">
      <div className={`container ${styles.promos}`}>
        <article className={`${styles.promo} ${styles.promoOffer}`}>
          <Image src="/images/editorial/bar-lumieres.jpg" alt="" fill sizes="(min-width: 900px) 50vw, 100vw" className={styles.promoImage} />
          <div className={styles.promoShade} aria-hidden />
          <div className={styles.promoContent}>
            <span className={styles.promoEyebrow}>Avant minuit</span>
            <h2 className={styles.promoTitle}>−15 % sur votre commande</h2>
            <p className={styles.promoText}>
              Avec le code <strong>ANNEUF</strong>, dès 100 € d&apos;achat, jusqu&apos;au 31 décembre à 23 h 59.
            </p>
            <Countdown />
            <ButtonLink href="/collections/nuit-avant-lan-neuf" variant="light" arrow>
              J&apos;en profite avant minuit
            </ButtonLink>
          </div>
        </article>

        <article className={`${styles.promo} ${styles.promoNight}`}>
          <Image src="/images/editorial/nuit-portrait.jpg" alt="" fill sizes="(min-width: 900px) 50vw, 100vw" className={styles.promoImage} />
          <div className={styles.promoShade} aria-hidden />
          <div className={styles.promoContent}>
            <span className={styles.promoEyebrow}>Nouvelle collection</span>
            <h2 className={styles.promoTitle}>Le Premier Janvier</h2>
            <p className={styles.promoText}>Manteaux longs, maille douce et couleurs d&apos;aube pour commencer l&apos;année avec allure.</p>
            <ButtonLink href="/collections/le-premier-janvier" variant="lightOutline" arrow>
              Voir la collection
            </ButtonLink>
          </div>
        </article>
      </div>
    </section>
  );
}
