import Image from "next/image";
import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/ui/primitives";
import styles from "./EditorialHeader.module.css";

/** En-tête éditorial (image + texte) pour les collections et pages de campagne. */
export function EditorialHeader({
  crumbs,
  eyebrow,
  title,
  intro,
  image,
  children,
  tone = "night",
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  intro: string;
  image: { src: string; alt: string };
  children?: ReactNode;
  tone?: "night" | "light";
}) {
  return (
    <header className={`${styles.header} ${tone === "light" ? styles.light : ""}`}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <div className={styles.crumbs}>
            <Breadcrumbs items={crumbs} />
          </div>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h1>{title}</h1>
          <p className={styles.intro}>{intro}</p>
          {children}
        </div>
        <div className={styles.media}>
          <Image src={image.src} alt={image.alt} fill priority sizes="(min-width: 900px) 50vw, 100vw" />
        </div>
      </div>
    </header>
  );
}
