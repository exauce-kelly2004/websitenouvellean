import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { CatalogView } from "@/components/catalog/CatalogView";
import { Breadcrumbs } from "@/components/ui/primitives";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { popularSearches } from "@/data/site";
import { parseFilters, type RawSearchParams } from "@/lib/catalog";
import { pageMetadata } from "@/lib/seo";
import styles from "./search.module.css";

export async function generateMetadata({ searchParams }: { searchParams: Promise<RawSearchParams> }): Promise<Metadata> {
  const { q } = await searchParams;
  const term = (Array.isArray(q) ? q[0] : q)?.trim();
  return pageMetadata({
    title: term ? `Recherche « ${term.slice(0, 40)} »` : "Recherche",
    description: "Recherchez parmi les robes, chaussures, bijoux, montres et idées cadeaux Maison Aube.",
    path: "/search",
    noIndex: true,
  });
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<RawSearchParams> }) {
  const params = await searchParams;
  const filters = parseFilters(params);

  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <Breadcrumbs items={[{ label: "Recherche" }]} />
          <h1 className={styles.title}>{filters.query ? `Résultats pour « ${filters.query} »` : "Que cherchez-vous ?"}</h1>
          <form action="/search" method="get" role="search" className={styles.form}>
            <label htmlFor="search-page-input" className="visually-hidden">
              Rechercher un produit
            </label>
            <Search size={20} aria-hidden />
            <input
              id="search-page-input"
              name="q"
              type="search"
              defaultValue={filters.query}
              placeholder="Robe, escarpins, cadeau homme…"
              autoComplete="off"
              enterKeyHint="search"
            />
            <button type="submit">Rechercher</button>
          </form>
          <ul role="list" className={styles.popular} aria-label="Recherches fréquentes">
            {popularSearches.map((term) => (
              <li key={term}>
                <Link href={`/search?q=${encodeURIComponent(term)}`}>{term}</Link>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <div className="container">
        {filters.query ? (
          <CatalogView
            key={JSON.stringify(params)}
            products={products}
            initialFilters={filters}
            emptySuggestions={[
              { label: "Voir les nouveautés", href: "/new" },
              { label: "Idées cadeaux", href: "/gifts" },
            ]}
          />
        ) : (
          <section className={styles.browse} aria-labelledby="browse-title">
            <h2 id="browse-title">Parcourir par catégorie</h2>
            <ul role="list" className={styles.cats}>
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/category/${c.slug}`}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}
