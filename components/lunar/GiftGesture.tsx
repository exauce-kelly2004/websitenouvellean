"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { productMap } from "@/data/products";
import { sellingPoints } from "@/data/sellingPoints";
import { AddToCartInline } from "@/components/product/AddToCartInline";
import { Price, Rating } from "@/components/ui/primitives";
import styles from "./lunar.module.css";

const groups = [
  { id: "petits", label: "Petits gestes", note: "moins de 100 €", slugs: ["creoles-torsadees-dorees", "cravate-soie-lavande", "coffret-teint-lumiere", "ceinture-cuir-cognac"], href: "/gifts#moins-de-100" },
  { id: "famille", label: "Pour la famille", note: "à partager", slugs: ["pull-cachemire-framboise", "montre-sable", "ambre-minuit-eau-de-parfum", "portefeuille-cuir-vieilli"], href: "/gifts" },
  { id: "special", label: "Pour quelqu'un de spécial", note: "les grands gestes", slugs: ["collier-perles-eau-douce", "bague-halo", "sac-minuit-effet-croco", "montre-gousset-heure-pleine"], href: "/gifts#exception" },
  { id: "soi", label: "Pour soi", note: "on le mérite", slugs: ["robe-minuit-drapee", "manteau-long-camel", "escarpins-cristal", "bracelet-riviere-cristal"], href: "/collections/nuit-avant-lan-neuf" },
];

/** « Un geste pour commencer l'année » : une pièce mise en avant, trois alternatives en liste. */
export function GiftGesture() {
  const [tab, setTab] = useState(0);
  const g = groups[tab];
  const [lead, ...rest] = g.slugs.map((s) => productMap[s]);

  return (
    <section className={styles.gifts} aria-labelledby="gifts-title">
      <div className="container">
        <div className={styles.giftsHead}>
          <span className={styles.chapterNo}>Chapitre IV</span>
          <h2 id="gifts-title">
            Un geste pour
            <br />
            commencer l&apos;année.
          </h2>
          <p>
            Au Nouvel An, on offre pour souhaiter le meilleur. Tous nos cadeaux partent dans un écrin laqué rouge, avec votre message écrit à la main — et peuvent être
            échangés jusqu&apos;au 28 février.
          </p>
        </div>

        <div className={styles.giftTabs} role="tablist" aria-label="Pour qui ?">
          {groups.map((grp, i) => (
            <button key={grp.id} type="button" role="tab" aria-selected={tab === i} aria-controls="gift-panel" onClick={() => setTab(i)}>
              {grp.label}
              <span>{grp.note}</span>
            </button>
          ))}
        </div>

        <div id="gift-panel" role="tabpanel" className={styles.giftPanel} key={g.id}>
          <article className={styles.giftLead}>
            <Link href={`/product/${lead.slug}`} className={styles.giftLeadMedia} tabIndex={-1} aria-hidden>
              <Image src={lead.images[0].src} alt="" fill sizes="(min-width: 900px) 30vw, 90vw" />
            </Link>
            <div className={styles.giftLeadText}>
              <span className={styles.giftPick}>Notre choix</span>
              <h3>
                <Link href={`/product/${lead.slug}`}>{lead.name}</Link>
              </h3>
              <Rating value={lead.rating} count={lead.reviewCount} />
              <p>{sellingPoints[lead.category][0]}.</p>
              <Price price={lead.price} compareAt={lead.compareAtPrice} large />
              <AddToCartInline product={lead} />
            </div>
          </article>
          <ul role="list" className={styles.giftList}>
            {rest.map((p) => (
              <li key={p.slug}>
                <Link href={`/product/${p.slug}`} className={styles.giftRowThumb} tabIndex={-1} aria-hidden>
                  <Image src={p.images[0].src} alt="" fill sizes="72px" />
                </Link>
                <div>
                  <Link href={`/product/${p.slug}`} className={styles.giftRowName}>
                    {p.name}
                  </Link>
                  <p>{sellingPoints[p.category][2]}</p>
                </div>
                <Price price={p.price} compareAt={p.compareAtPrice} />
              </li>
            ))}
            <li className={styles.giftMore}>
              <Link href={g.href} className={styles.textCta}>
                Plus d&apos;idées « {g.label.toLowerCase()} » <ArrowRight size={16} aria-hidden />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
