"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Heart, Menu, Search, ShoppingBag } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { categories } from "@/data/categories";
import { collections } from "@/data/collections";
import { mainNav } from "@/data/site";
import { useCart, useHydrated, useStoreState, useUI } from "@/components/providers/StoreProvider";
import { IconButton, IconLink } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { SearchPanel } from "./SearchPanel";
import styles from "./Header.module.css";

export function Header() {
  const pathname = usePathname();
  const hydrated = useHydrated();
  const { favorites } = useStoreState();
  const { totals } = useCart();
  const { openCart } = useUI();

  const [megaOpen, setMegaOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const megaRef = useRef<HTMLLIElement>(null);

  // Ferme le méga-menu au clic extérieur et à Échap.
  useEffect(() => {
    if (!megaOpen) return;
    const onPointer = (e: PointerEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) setMegaOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMegaOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [megaOpen]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));
  const cartCount = hydrated ? totals.itemCount : 0;
  const favCount = hydrated ? favorites.length : 0;

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.left}>
          <IconButton label="Ouvrir le menu" onClick={() => setMenuOpen(true)} className={styles.menuButton} aria-expanded={menuOpen}>
            <Menu size={22} strokeWidth={1.6} aria-hidden />
          </IconButton>
          <Logo tone="light" />
        </div>

        <nav aria-label="Navigation principale" className={styles.nav}>
          <ul role="list" className={styles.navList}>
            {mainNav.map((item) =>
              "mega" in item && item.mega ? (
                <li
                  key={item.label}
                  ref={megaRef}
                  className={styles.megaItem}
                  onMouseEnter={() => setMegaOpen(true)}
                  onMouseLeave={() => setMegaOpen(false)}
                >
                  <button
                    type="button"
                    className={`${styles.navLink} ${pathname.startsWith("/category") ? styles.active : ""}`}
                    aria-expanded={megaOpen}
                    aria-controls="mega-menu"
                    onClick={() => setMegaOpen((o) => !o)}
                  >
                    {item.label}
                    <ChevronDown size={14} aria-hidden className={styles.chevron} />
                  </button>
                  <div id="mega-menu" className={styles.mega} data-open={megaOpen} hidden={!megaOpen}>
                    <div className={`container ${styles.megaInner}`}>
                      <div>
                        <p className={styles.megaTitle}>Catégories</p>
                        <ul role="list" className={styles.megaCats}>
                          {categories.map((c) => (
                            <li key={c.slug}>
                              <Link href={`/category/${c.slug}`} onClick={() => setMegaOpen(false)}>
                                {c.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className={styles.megaTitle}>Collections</p>
                        <ul role="list" className={styles.megaList}>
                          {collections.map((c) => (
                            <li key={c.slug}>
                              <Link href={`/collections/${c.slug}`} onClick={() => setMegaOpen(false)}>
                                {c.name}
                              </Link>
                            </li>
                          ))}
                          <li>
                            <Link href="/shop" onClick={() => setMegaOpen(false)} className={styles.megaAll}>
                              Toute la boutique
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <Link href="/collections/nuit-avant-lan-neuf" className={styles.megaFeature} onClick={() => setMegaOpen(false)}>
                        <span className={styles.megaFeatureMedia}>
                          <Image src="/images/nouvel-an/lanterne-rue.jpg" alt="" fill sizes="320px" />
                        </span>
                        <span className="eyebrow">Collection</span>
                        <span className={styles.megaFeatureTitle}>La Nuit avant l&apos;An neuf</span>
                        <span className={styles.megaFeatureText}>Rouge, or et lumière pour le Nouvel An lunaire.</span>
                      </Link>
                    </div>
                  </div>
                </li>
              ) : (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`${styles.navLink} ${isActive(item.href) ? styles.active : ""}`}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className={styles.actions}>
          <IconButton label="Rechercher" onClick={() => setSearchOpen(true)} aria-expanded={searchOpen}>
            <Search size={20} strokeWidth={1.6} aria-hidden />
          </IconButton>
          <IconLink href="/favorites" label="Mes favoris" count={favCount} className={styles.hideXs}>
            <Heart size={20} strokeWidth={1.6} aria-hidden />
          </IconLink>
          <IconButton label={cartCount ? `Ouvrir le panier (${cartCount} articles)` : "Ouvrir le panier"} onClick={openCart} count={cartCount}>
            <ShoppingBag size={20} strokeWidth={1.6} aria-hidden />
          </IconButton>
        </div>
      </div>

      <SearchPanel open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} favoritesCount={favCount} />
    </header>
  );
}
