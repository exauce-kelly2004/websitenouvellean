import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Gift, RotateCcw, Truck } from "lucide-react";
import { featuredReviews } from "@/data/reviews";
import { commerce } from "@/data/site";
import { Countdown } from "@/components/home/Countdown";
import styles from "./lunar.module.css";

/** Offre raffinée + réassurance + une seule grande citation client. */
export function NewYearEdit() {
  const quote = featuredReviews[0];
  return (
    <>
      <section className={styles.edit} aria-labelledby="edit-title">
        <div className={`container ${styles.editGrid}`}>
          <div className={styles.editMedia}>
            <Image src="/images/products/carte-cadeau.jpg" alt="Écrins noirs noués de rubans dorés" fill sizes="(min-width: 900px) 35vw, 90vw" />
            <span className={styles.envelope} aria-hidden>
              <span />
            </span>
          </div>
          <div className={styles.editText}>
            <span className={styles.chapterNo}>L&apos;édition du Nouvel An</span>
            <h2 id="edit-title">
              L&apos;enveloppe rouge
              <br />
              <em>vous est offerte.</em>
            </h2>
            <p>
              Pour toute commande dès {commerce.freeShippingThreshold} € jusqu&apos;au 6 février, nous glissons dans votre écrin une enveloppe rouge contenant{" "}
              <strong>une carte cadeau de 20 €</strong> — à garder pour vous, ou à offrir à votre tour. Comme le veut la tradition.
            </p>
            <Countdown tone="dark" />
            <Link href="/collections/nuit-avant-lan-neuf" className={styles.editCta}>
              Composer ma commande <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.trust} aria-label="Nos engagements">
        <div className={`container ${styles.trustGrid}`}>
          <blockquote className={styles.quote}>
            <p>« {quote.body} »</p>
            <footer>
              {quote.author}, {quote.city} — <BadgeCheck size={14} aria-hidden /> achat vérifié · 4,8/5 sur 2 300 avis
            </footer>
          </blockquote>
          <ul role="list" className={styles.trustList}>
            <li>
              <Truck size={20} strokeWidth={1.4} aria-hidden />
              <span>
                <strong>Reçu avant le 6 février</strong> — {commerce.giftDeadline.replace(" pour être livré avant le Nouvel An lunaire du 6 février.", ".")}
              </span>
            </li>
            <li>
              <Gift size={20} strokeWidth={1.4} aria-hidden />
              <span>
                <strong>Écrin laqué offert</strong> — et votre message écrit à la main.
              </span>
            </li>
            <li>
              <RotateCcw size={20} strokeWidth={1.4} aria-hidden />
              <span>
                <strong>Retours gratuits</strong> — {commerce.returnsDays} jours, sans justification.
              </span>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
