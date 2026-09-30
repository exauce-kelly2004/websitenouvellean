import type { ReactNode } from "react";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader } from "@/components/ui/primitives";
import { breadcrumbJsonLd } from "@/lib/seo";
import styles from "@/app/info.module.css";

/** Gabarit des pages de texte long : en-tête, sommaire ancré, contenu. */
export function LegalPage({
  title,
  intro,
  path,
  updated,
  sections,
}: {
  title: string;
  intro: string;
  path: string;
  updated: string;
  sections: { id: string; title: string; content: ReactNode }[];
}) {
  return (
    <>
      <PageHeader crumbs={[{ label: title }]} title={title} intro={intro} meta={`Dernière mise à jour : ${updated}`} />
      <div className={`container-text ${styles.legal}`}>
        <nav aria-label="Sommaire" className={styles.toc}>
          <p>Sommaire</p>
          <ol>
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>{s.title}</a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="prose">
          {sections.map((s) => (
            <section key={s.id} aria-labelledby={s.id}>
              <h2 id={s.id}>{s.title}</h2>
              {s.content}
            </section>
          ))}
        </div>
      </div>
      <JsonLd data={breadcrumbJsonLd([{ name: title, path }])} />
    </>
  );
}
