"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";
import { categoryMap } from "@/data/categories";
import { popularSearches } from "@/data/site";
import { searchProducts } from "@/lib/catalog";
import { Drawer } from "@/components/ui/Drawer";
import { Price } from "@/components/ui/primitives";
import styles from "./SearchPanel.module.css";

export function SearchPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);
  const results = useMemo(() => (deferred.trim().length > 1 ? searchProducts(deferred) : []), [deferred]);

  const submit = (q: string) => {
    const value = q.trim();
    if (!value) return;
    onClose();
    router.push(`/search?q=${encodeURIComponent(value)}`);
  };

  const close = () => {
    onClose();
  };

  return (
    <Drawer open={open} onClose={close} side="top" title="Rechercher" ariaLabel="Recherche">
      <div className={styles.panel}>
        <form
          role="search"
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            submit(query);
          }}
        >
          <label htmlFor="site-search" className="visually-hidden">
            Rechercher un produit, une catégorie, une couleur
          </label>
          <Search size={20} aria-hidden className={styles.icon} />
          <input
            id="site-search"
            type="search"
            className={styles.input}
            placeholder="Robe, escarpins, cadeau homme…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            enterKeyHint="search"
          />
          <button type="submit" className={styles.submit} aria-label="Lancer la recherche">
            <ArrowRight size={18} aria-hidden />
          </button>
        </form>

        {query.trim().length > 1 ? (
          <div className={styles.results} aria-live="polite">
            <p className={styles.heading}>
              {results.length ? `${results.length} résultat${results.length > 1 ? "s" : ""}` : "Aucun résultat pour cette recherche"}
            </p>
            {results.length > 0 ? (
              <>
                <ul role="list" className={styles.list}>
                  {results.slice(0, 6).map((p) => (
                    <li key={p.slug}>
                      <Link href={`/product/${p.slug}`} onClick={close} className={styles.result}>
                        <span className={styles.thumb}>
                          <Image src={p.images[0].src} alt="" fill sizes="64px" />
                        </span>
                        <span className={styles.resultText}>
                          <span className={styles.resultName}>{p.name}</span>
                          <span className={styles.resultCat}>{categoryMap[p.category].name}</span>
                        </span>
                        <Price price={p.price} compareAt={p.compareAtPrice} />
                      </Link>
                    </li>
                  ))}
                </ul>
                <button type="button" className={styles.all} onClick={() => submit(query)}>
                  Voir les {results.length} résultats <ArrowRight size={15} aria-hidden />
                </button>
              </>
            ) : (
              <p className={styles.hint}>Essayez un terme plus large — par exemple « robe », « bijoux » ou « cadeau ».</p>
            )}
          </div>
        ) : (
          <div className={styles.suggestions}>
            <p className={styles.heading}>Recherches fréquentes</p>
            <ul role="list" className={styles.chips}>
              {popularSearches.map((term) => (
                <li key={term}>
                  <button type="button" className={styles.chip} onClick={() => submit(term)}>
                    {term}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Drawer>
  );
}
