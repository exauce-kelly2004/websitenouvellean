"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { useRef } from "react";
import { productMap } from "@/data/products";
import { useShop } from "@/components/providers/StoreProvider";
import { formatPrice } from "@/lib/format";
import styles from "./lunar.module.css";

const scenes = [
  { no: "I", title: "La rue", text: "Les guirlandes s'allument une à une.", img: "/images/nouvel-an/arches-lumiere.jpg", alt: "Façades anciennes sous une guirlande de lanternes rouges", href: "/collections/nuit-avant-lan-neuf", product: "robe-aurore-epaules-denudees", shape: "wide" },
  { no: "II", title: "La boutique", text: "Dernières emplettes avant la fermeture.", img: "/images/nouvel-an/rue-foule.jpg", alt: "Rue commerçante animée sous les lanternes", href: "/shop", product: "sac-minuit-effet-croco", shape: "tall" },
  { no: "III", title: "Les lanternes", text: "Le rouge qui porte chance.", img: "/images/nouvel-an/lanterne-dessous.jpg", alt: "Lanterne rouge vue de dessous, ses franges dorées", href: "/category/bijoux", product: "creoles-torsadees-dorees", shape: "square" },
  { no: "IV", title: "L'architecture", text: "Au bout de la rue, le pavillon s'embrase.", img: "/images/nouvel-an/pagode-nuit.jpg", alt: "Pagode illuminée la nuit derrière les arbres", href: "/collections/vestiaire-homme", product: "veste-costume-nuit", shape: "tall" },
  { no: "V", title: "La silhouette", text: "Une robe rouge traverse la foule.", img: "/images/editorial/hero.jpg", alt: "Femme en robe rouge carmin drapée", href: "/category/robes", product: "robe-minuit-drapee", shape: "wide" },
  { no: "VI", title: "Le détail", text: "Un parfum d'ambre dans l'air froid.", img: "/images/nouvel-an/lanterne-facade.jpg", alt: "Lanterne suspendue entre deux immeubles la nuit", href: "/category/beaute-parfums", product: "ambre-minuit-eau-de-parfum", shape: "square" },
] as const;

/** Section signature : une promenade horizontale, chaque scène mène à une collection et à un produit. */
export function CityLights() {
  const trackRef = useRef<HTMLOListElement>(null);
  const { addToCart } = useShop();
  const scroll = (dir: 1 | -1) => trackRef.current?.scrollBy({ left: dir * trackRef.current.clientWidth * 0.7, behavior: "smooth" });

  return (
    <section className={styles.lights} aria-labelledby="lights-title">
      <div className={`container ${styles.lightsHead}`}>
        <div>
          <span className={styles.chapterNo}>Chapitre III</span>
          <h2 id="lights-title">
            La ville
            <br />
            <em>s&apos;illumine.</em>
          </h2>
        </div>
        <div className={styles.lightsNav}>
          <p>Faites défiler la rue — chaque scène cache une pièce de la collection.</p>
          <div>
            <button type="button" onClick={() => scroll(-1)} aria-label="Scène précédente">
              <ArrowLeft size={18} aria-hidden />
            </button>
            <button type="button" onClick={() => scroll(1)} aria-label="Scène suivante">
              <ArrowRight size={18} aria-hidden />
            </button>
          </div>
        </div>
      </div>

      <ol ref={trackRef} className={styles.lightsTrack} tabIndex={0} aria-label="Scènes de la nuit">
        {scenes.map((s) => {
          const p = productMap[s.product];
          const needsSize = Boolean(p.sizes && p.sizeLabel !== "Contenance");
          return (
            <li key={s.no} className={`${styles.scene} ${styles[`scene_${s.shape}`]}`}>
              <Link href={s.href} className={styles.sceneMedia}>
                <Image src={s.img} alt={s.alt} fill sizes="(min-width: 900px) 45vw, 85vw" />
                <span className={styles.sceneNo}>{s.no}</span>
              </Link>
              <div className={styles.sceneText}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
              <div className={styles.sceneProduct}>
                <Link href={`/product/${p.slug}`} className={styles.sceneThumb} tabIndex={-1} aria-hidden>
                  <Image src={p.images[0].src} alt="" fill sizes="56px" />
                </Link>
                <Link href={`/product/${p.slug}`} className={styles.sceneName}>
                  {p.name}
                  <span>{formatPrice(p.price)}</span>
                </Link>
                {needsSize ? (
                  <Link href={`/product/${p.slug}`} className={styles.sceneAdd} aria-label={`Choisir ma taille : ${p.name}`}>
                    <Plus size={16} aria-hidden />
                  </Link>
                ) : (
                  <button type="button" className={styles.sceneAdd} onClick={() => addToCart(p.slug, { color: p.colors[0]?.name, size: p.sizes?.[0]?.name })} aria-label={`Ajouter au panier : ${p.name}`}>
                    <Plus size={16} aria-hidden />
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
