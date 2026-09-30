import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import styles from "./home.module.css";

const bands = [
  { label: "Moins de 100 €", href: "/gifts#moins-de-100", text: "Créoles, cravate en soie, coffret beauté" },
  { label: "De 100 à 250 €", href: "/gifts#100-250", text: "Montres, bijoux, cachemire, parfum" },
  { label: "Pour lui", href: "/gifts#pour-lui", text: "Portefeuille, montre, derbies" },
  { label: "Carte cadeau", href: "/product/carte-cadeau", text: "De 50 à 300 €, envoi immédiat" },
];

export function GiftTeaser() {
  return (
    <section className={`section ${styles.gifts}`} aria-labelledby="gifts-title">
      <div className={`container ${styles.giftsGrid}`}>
        <div className={styles.giftsMedia}>
          <Image src="/images/editorial/rubans.jpg" alt="Écrins noirs noués de rubans dorés" fill sizes="(min-width: 900px) 40vw, 100vw" />
        </div>
        <div className={styles.giftsCopy}>
          <span className={styles.giftsEyebrow}>Cadeaux</span>
          <h2 id="gifts-title">Offrir la première impression</h2>
          <p className={styles.giftsLead}>
            Emballage en écrin, carte manuscrite et retours prolongés jusqu&apos;au 31 janvier : nous nous occupons du reste.
          </p>
          <ul role="list" className={styles.giftBands}>
            {bands.map((b) => (
              <li key={b.label}>
                <Link href={b.href} className={styles.giftBand}>
                  <span>
                    <span className={styles.giftBandLabel}>{b.label}</span>
                    <span className={styles.giftBandText}>{b.text}</span>
                  </span>
                  <ArrowRight size={18} aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
          <ButtonLink href="/gifts" variant="light" arrow>
            Le guide des cadeaux
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
