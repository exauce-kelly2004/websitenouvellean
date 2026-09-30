import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./GuideBlock.module.css";

/** Bloc de contenu éditorial en bas des listes (conseils + maillage interne). */
export function GuideBlock({
  title,
  items,
  links,
  children,
}: {
  title: string;
  items: { heading: string; body: string }[];
  links?: { label: string; href: string }[];
  children?: ReactNode;
}) {
  return (
    <section className={styles.guide} aria-labelledby="guide-title">
      <div className={`container ${styles.grid}`}>
        <div>
          <span className="eyebrow">Nos conseils</span>
          <h2 id="guide-title">{title}</h2>
          {children}
        </div>
        <div className={styles.items}>
          {items.map((item) => (
            <div key={item.heading}>
              <h3>{item.heading}</h3>
              <p>{item.body}</p>
            </div>
          ))}
          {links && links.length > 0 && (
            <div>
              <h3>À découvrir aussi</h3>
              <ul role="list" className={styles.links}>
                {links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-link">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
