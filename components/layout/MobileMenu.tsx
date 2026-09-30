"use client";

import Link from "next/link";
import { ArrowRight, Heart, Mail, Truck } from "lucide-react";
import { categories } from "@/data/categories";
import { collections } from "@/data/collections";
import { Drawer } from "@/components/ui/Drawer";
import { Logo } from "./Logo";
import styles from "./MobileMenu.module.css";

const primary = [
  { label: "Nouveautés", href: "/new" },
  { label: "Toute la boutique", href: "/shop" },
  { label: "Meilleures ventes", href: "/collections/meilleures-ventes" },
  { label: "Idées cadeaux", href: "/gifts" },
  { label: "Offres", href: "/sale" },
];

export function MobileMenu({ open, onClose, favoritesCount }: { open: boolean; onClose: () => void; favoritesCount: number }) {
  return (
    <Drawer open={open} onClose={onClose} side="left" title={<Logo onClick={onClose} />} ariaLabel="Menu">
      <nav aria-label="Menu mobile" className={styles.menu}>
        <ul role="list" className={styles.primary}>
          {primary.map((item) => (
            <li key={item.href}>
              <Link href={item.href} onClick={onClose} className={item.href === "/sale" ? styles.sale : undefined}>
                {item.label}
                <ArrowRight size={16} aria-hidden />
              </Link>
            </li>
          ))}
        </ul>

        <p className={styles.heading}>Catégories</p>
        <ul role="list" className={styles.grid}>
          {categories.map((c) => (
            <li key={c.slug}>
              <Link href={`/category/${c.slug}`} onClick={onClose}>
                {c.name}
              </Link>
            </li>
          ))}
        </ul>

        <p className={styles.heading}>Collections</p>
        <ul role="list" className={styles.grid}>
          {collections.map((c) => (
            <li key={c.slug}>
              <Link href={`/collections/${c.slug}`} onClick={onClose}>
                {c.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul role="list" className={styles.utility}>
          <li>
            <Link href="/favorites" onClick={onClose}>
              <Heart size={18} aria-hidden /> Mes favoris {favoritesCount > 0 && <span className={styles.count}>{favoritesCount}</span>}
            </Link>
          </li>
          <li>
            <Link href="/shipping-returns" onClick={onClose}>
              <Truck size={18} aria-hidden /> Livraison & retours
            </Link>
          </li>
          <li>
            <Link href="/contact" onClick={onClose}>
              <Mail size={18} aria-hidden /> Nous contacter
            </Link>
          </li>
          <li>
            <Link href="/about" onClick={onClose}>
              La Maison
            </Link>
          </li>
        </ul>
      </nav>
    </Drawer>
  );
}
