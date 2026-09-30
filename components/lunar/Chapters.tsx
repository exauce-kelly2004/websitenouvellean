import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { productMap } from "@/data/products";
import { AddToCartInline } from "@/components/product/AddToCartInline";
import { Tilt } from "@/components/motion/Tilt";
import { Price } from "@/components/ui/primitives";
import styles from "./lunar.module.css";

function MiniProduct({ slug }: { slug: string }) {
  const p = productMap[slug];
  return (
    <div className={styles.mini}>
      <Link href={`/product/${slug}`} className={styles.miniThumb} tabIndex={-1} aria-hidden>
        <Image src={p.images[0].src} alt="" fill sizes="80px" />
      </Link>
      <div className={styles.miniText}>
        <Link href={`/product/${slug}`} className={styles.miniName}>
          {p.name}
        </Link>
        <Price price={p.price} compareAt={p.compareAtPrice} />
      </div>
      <AddToCartInline product={p} label="Ajouter" />
    </div>
  );
}

/** Quatre chapitres commerciaux, chacun avec sa propre composition. */
export function Chapters() {
  const shoes = productMap["escarpins-cristal"];
  return (
    <div className={styles.chapters}>
      {/* 01 — Pour la fête : grande image + petite image décalée */}
      <section className={`${styles.ch} ${styles.chFete}`} aria-labelledby="ch-fete">
        <div className={`container ${styles.chFeteGrid}`}>
          <div className={styles.chFeteBig}>
            <Image src="/images/editorial/hero.jpg" alt="Femme en robe rouge carmin au pan drapé" fill sizes="(min-width: 900px) 55vw, 100vw" />
          </div>
          <Tilt max={10} className={styles.chFeteSmall}>
            <Link href={`/product/${shoes.slug}`} className={styles.chFeteSmallLink}>
              <Image src={shoes.images[0].src} alt={shoes.images[0].alt} fill sizes="260px" />
              <span className={styles.tag}>
                {shoes.name} — {shoes.price} €
              </span>
            </Link>
          </Tilt>
          <div className={styles.chText}>
            <span className={styles.chapterNo}>01 · Pour la fête</span>
            <h2 id="ch-fete">
              Une tenue neuve,
              <br />
              <em>en rouge de préférence.</em>
            </h2>
            <p>
              La tradition veut qu&apos;on commence l&apos;année habillé de neuf. Nos robes, vestes et escarpins sont choisis pour le dîner de famille comme pour la soirée qui suit.
            </p>
            <MiniProduct slug="robe-minuit-drapee" />
            <MiniProduct slug="blazer-croise-prince-de-galles" />
            <Link href="/category/robes" className={styles.textCta}>
              Toutes les tenues de fête <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* 02 — Pour offrir : fond ivoire, texte à gauche, image verticale */}
      <section className={`${styles.ch} ${styles.chOffrir}`} aria-labelledby="ch-offrir">
        <div className={`container ${styles.chOffrirGrid}`}>
          <div className={styles.chText}>
            <span className={styles.chapterNo}>02 · Pour offrir</span>
            <h2 id="ch-offrir">Le cadeau se donne à deux mains.</h2>
            <p>
              Un bijou, un parfum, une montre : des cadeaux sans taille à deviner, livrés dans un écrin laqué rouge avec votre mot écrit à la main.
            </p>
            <div className={styles.priceSteps}>
              <Link href="/gifts#moins-de-100">
                <span>moins de</span> 100 €
              </Link>
              <Link href="/gifts#100-250">
                <span>jusqu&apos;à</span> 250 €
              </Link>
              <Link href="/gifts#exception">
                <span>au-delà de</span> 250 €
              </Link>
            </div>
            <Link href="/gifts" className={styles.textCta}>
              Le guide des cadeaux <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
          <div className={styles.chOffrirMedia}>
            <Image src="/images/nouvel-an/lanterne-seule.jpg" alt="Lanterne rouge allumée dans la nuit" fill sizes="(min-width: 900px) 40vw, 100vw" />
            <div className={styles.chOffrirCard}>
              <MiniProduct slug="collier-perles-eau-douce" />
            </div>
          </div>
        </div>
      </section>

      {/* 03 — Pour lui : bande sombre, trois produits de tailles différentes */}
      <section className={`${styles.ch} ${styles.chLui}`} aria-labelledby="ch-lui">
        <div className="container">
          <div className={styles.chLuiHead}>
            <span className={styles.chapterNo}>03 · Pour lui</span>
            <h2 id="ch-lui">Bleu nuit, rouge laque, cuir cognac.</h2>
            <Link href="/collections/vestiaire-homme" className={styles.textCta}>
              Le vestiaire homme <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
          <ul role="list" className={styles.chLuiRow}>
            {["veste-costume-nuit", "pull-cachemire-framboise", "montre-crepuscule"].map((slug, i) => {
              const p = productMap[slug];
              return (
                <li key={slug} className={styles[`lui${i}` as "lui0"]}>
                  <Tilt max={7}>
                    <Link href={`/product/${slug}`} className={styles.luiLink}>
                      <span className={styles.luiMedia}>
                        <Image src={p.images[0].src} alt={p.images[0].alt} fill sizes="(min-width: 900px) 30vw, 80vw" />
                      </span>
                      <span className={styles.luiText}>
                        <strong>{p.name}</strong> {p.price} €
                      </span>
                    </Link>
                  </Tilt>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 04 — Pour commencer : image pleine largeur, texte au centre */}
      <section className={`${styles.ch} ${styles.chCommencer}`} aria-labelledby="ch-commencer">
        <Image src="/images/nouvel-an/temple-rouge.jpg" alt="Architecture traditionnelle illuminée de rouge et d'or, la nuit" fill sizes="100vw" className={styles.chCommencerImg} />
        <div className={styles.chCommencerText}>
          <span className={styles.chapterNo}>04 · Pour commencer</span>
          <h2 id="ch-commencer">Les nouveautés de l&apos;année qui vient.</h2>
          <Link href="/new" className={styles.textCtaLight}>
            Voir les nouveautés <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </section>
    </div>
  );
}
