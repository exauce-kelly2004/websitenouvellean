"use client";

import { usePathname } from "next/navigation";
import { SearchX, SlidersHorizontal, X } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";
import { categoryMap } from "@/data/categories";
import { applyFilters, defaultFilters, filtersToQuery, getFacets, sortOptions } from "@/lib/catalog";
import type { CatalogFilters, Product } from "@/types";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import { EmptyState } from "@/components/ui/primitives";
import { FilterPanel } from "./FilterPanel";
import styles from "./Catalog.module.css";

interface CatalogViewProps {
  products: Product[];
  initialFilters: CatalogFilters;
  /** Filtres imposés par la page (ex. promotions) — non affichés comme puces. */
  base?: Partial<CatalogFilters>;
  hideCategoryFacet?: boolean;
  pageSize?: number;
  /** Liens proposés quand aucun résultat ne correspond. */
  emptySuggestions?: { label: string; href: string }[];
}

export function CatalogView({ products, initialFilters, base = {}, hideCategoryFacet, pageSize = 12, emptySuggestions }: CatalogViewProps) {
  const pathname = usePathname();
  const [filters, setFilters] = useState<CatalogFilters>(initialFilters);
  const [visible, setVisible] = useState(pageSize);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const deferredFilters = useDeferredValue(filters);
  const stale = deferredFilters !== filters;
  const results = useMemo(() => applyFilters(products, deferredFilters), [products, deferredFilters]);
  const facets = useMemo(() => getFacets(products), [products]);

  const update = (patch: Partial<CatalogFilters>) => {
    const next = { ...filters, ...patch };
    setFilters(next);
    setVisible(pageSize);
    // Met à jour l'URL sans rechargement : les filtres restent partageables.
    window.history.replaceState(null, "", `${pathname}${filtersToQuery(next, base)}`);
  };

  const reset = () => update({ ...defaultFilters, ...base, query: filters.query, sort: filters.sort });

  const chips = [
    ...filters.categories.map((c) => ({ key: `cat-${c}`, label: categoryMap[c].name, clear: () => update({ categories: filters.categories.filter((x) => x !== c) }) })),
    ...filters.audiences.map((a) => ({ key: `aud-${a}`, label: a === "femme" ? "Pour elle" : "Pour lui", clear: () => update({ audiences: filters.audiences.filter((x) => x !== a) }) })),
    ...filters.colors.map((c) => ({ key: `col-${c}`, label: c, clear: () => update({ colors: filters.colors.filter((x) => x !== c) }) })),
    ...(filters.priceMax !== null ? [{ key: "price", label: `Jusqu'à ${filters.priceMax} €`, clear: () => update({ priceMax: null }) }] : []),
    ...(filters.inStock ? [{ key: "stock", label: "En stock", clear: () => update({ inStock: false }) }] : []),
    ...(filters.onSale && !base.onSale ? [{ key: "sale", label: "En promotion", clear: () => update({ onSale: false }) }] : []),
  ];

  const shown = results.slice(0, visible);

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar} aria-label="Filtres">
        <p className={styles.sidebarTitle}>Filtrer</p>
        <FilterPanel filters={filters} facets={facets} onChange={update} hideCategories={hideCategoryFacet} hideSale={base.onSale} idPrefix="side" />
      </aside>

      <div className={styles.main}>
        <div className={styles.toolbar}>
          <p className={styles.count} aria-live="polite">
            <strong>{results.length}</strong> {results.length > 1 ? "articles" : "article"}
            {filters.query && (
              <>
                {" "}
                pour « {filters.query} »
              </>
            )}
          </p>
          <div className={styles.toolbarActions}>
            <button type="button" className={styles.filterButton} onClick={() => setDrawerOpen(true)}>
              <SlidersHorizontal size={16} aria-hidden /> Filtrer
              {chips.length > 0 && <span className={styles.filterCount}>{chips.length}</span>}
            </button>
            <label className={styles.sort}>
              <span className={styles.sortLabel}>Trier par</span>
              <select value={filters.sort} onChange={(e) => update({ sort: e.target.value as CatalogFilters["sort"] })}>
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {chips.length > 0 && (
          <ul role="list" className={styles.activeChips} aria-label="Filtres actifs">
            {chips.map((c) => (
              <li key={c.key}>
                <button type="button" onClick={c.clear} className={styles.activeChip} aria-label={`Retirer le filtre ${c.label}`}>
                  {c.label} <X size={13} aria-hidden />
                </button>
              </li>
            ))}
            <li>
              <button type="button" onClick={reset} className={styles.clearAll}>
                Tout effacer
              </button>
            </li>
          </ul>
        )}

        <div className={styles.results} data-stale={stale || undefined}>
          {results.length === 0 ? (
            <EmptyState
              icon={<SearchX size={26} strokeWidth={1.5} />}
              title="Aucun article ne correspond"
              actions={
                <>
                  {chips.length > 0 && <Button onClick={reset}>Réinitialiser les filtres</Button>}
                  {(emptySuggestions ?? [{ label: "Voir toute la boutique", href: "/shop" }]).map((s) => (
                    <ButtonLink key={s.href} href={s.href} variant="secondary">
                      {s.label}
                    </ButtonLink>
                  ))}
                </>
              }
            >
              {filters.query
                ? "Vérifiez l'orthographe ou essayez un terme plus général. Nos conseillers peuvent aussi vous aider par téléphone."
                : "Essayez d'élargir votre sélection en retirant un ou plusieurs filtres."}
            </EmptyState>
          ) : (
            <>
              <ProductGrid products={shown} columns={3} priorityCount={3} />
              <div className={styles.more}>
                <p>
                  Vous avez vu {shown.length} article{shown.length > 1 ? "s" : ""} sur {results.length}
                </p>
                <div className={styles.moreTrack} aria-hidden>
                  <span style={{ width: `${(shown.length / results.length) * 100}%` }} />
                </div>
                {shown.length < results.length && (
                  <Button variant="secondary" onClick={() => setVisible((v) => v + pageSize)}>
                    Afficher plus d&apos;articles
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        side="bottom"
        title="Filtrer"
        footer={
          <div className={styles.drawerActions}>
            <Button variant="secondary" onClick={reset} disabled={chips.length === 0}>
              Effacer
            </Button>
            <Button onClick={() => setDrawerOpen(false)}>Voir {results.length} articles</Button>
          </div>
        }
      >
        <FilterPanel filters={filters} facets={facets} onChange={update} hideCategories={hideCategoryFacet} hideSale={base.onSale} idPrefix="drawer" />
      </Drawer>
    </div>
  );
}
