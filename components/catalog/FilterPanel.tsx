"use client";

import { Check } from "lucide-react";
import { priceSteps } from "@/lib/catalog";
import type { Audience, CatalogFilters, CategorySlug } from "@/types";
import { Checkbox } from "@/components/ui/Field";
import styles from "./Catalog.module.css";

export interface Facets {
  categories: { slug: CategorySlug; name: string; count: number }[];
  colors: { name: string; hex: string; count: number }[];
  audiences: Exclude<Audience, "mixte">[];
}

interface FilterPanelProps {
  filters: CatalogFilters;
  facets: Facets;
  onChange: (patch: Partial<CatalogFilters>) => void;
  hideCategories?: boolean;
  hideSale?: boolean;
  idPrefix: string;
}

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export function FilterPanel({ filters, facets, onChange, hideCategories, hideSale, idPrefix }: FilterPanelProps) {
  return (
    <div className={styles.filters}>
      {!hideCategories && facets.categories.length > 1 && (
        <fieldset className={styles.group}>
          <legend>Catégorie</legend>
          <ul role="list">
            {facets.categories.map((c) => (
              <li key={c.slug}>
                <Checkbox
                  id={`${idPrefix}-cat-${c.slug}`}
                  checked={filters.categories.includes(c.slug)}
                  onChange={() => onChange({ categories: toggle(filters.categories, c.slug) })}
                  label={
                    <span className={styles.optionLabel}>
                      {c.name} <span className={styles.optionCount}>{c.count}</span>
                    </span>
                  }
                />
              </li>
            ))}
          </ul>
        </fieldset>
      )}

      {facets.audiences.length > 1 && (
        <fieldset className={styles.group}>
          <legend>Pour</legend>
          <div className={styles.segmented}>
            {facets.audiences.map((a) => (
              <button
                key={a}
                type="button"
                aria-pressed={filters.audiences.includes(a)}
                onClick={() => onChange({ audiences: toggle(filters.audiences, a) })}
              >
                {a === "femme" ? "Elle" : "Lui"}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <fieldset className={styles.group}>
        <legend>Prix maximum</legend>
        <div className={styles.chips}>
          {priceSteps.map((p) => (
            <button
              key={p}
              type="button"
              className={styles.chip}
              aria-pressed={filters.priceMax === p}
              onClick={() => onChange({ priceMax: filters.priceMax === p ? null : p })}
            >
              {p} €
            </button>
          ))}
        </div>
      </fieldset>

      {facets.colors.length > 1 && (
        <fieldset className={styles.group}>
          <legend>Couleur</legend>
          <ul role="list" className={styles.colors}>
            {facets.colors.map((c) => {
              const active = filters.colors.includes(c.name);
              return (
                <li key={c.name}>
                  <button
                    type="button"
                    className={styles.color}
                    aria-pressed={active}
                    onClick={() => onChange({ colors: toggle(filters.colors, c.name) })}
                  >
                    <span className={styles.colorDot} style={{ background: c.hex }}>
                      {active && <Check size={12} aria-hidden />}
                    </span>
                    {c.name}
                    <span className={styles.optionCount}>{c.count}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </fieldset>
      )}

      <fieldset className={styles.group}>
        <legend>Disponibilité & offres</legend>
        <ul role="list">
          <li>
            <Checkbox id={`${idPrefix}-stock`} checked={filters.inStock} onChange={(e) => onChange({ inStock: e.target.checked })} label="En stock uniquement" />
          </li>
          {!hideSale && (
            <li>
              <Checkbox id={`${idPrefix}-sale`} checked={filters.onSale} onChange={(e) => onChange({ onSale: e.target.checked })} label="En promotion" />
            </li>
          )}
        </ul>
      </fieldset>
    </div>
  );
}
