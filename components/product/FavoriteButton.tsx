"use client";

import { Heart } from "lucide-react";
import { useShop } from "@/components/providers/StoreProvider";
import { IconButton } from "@/components/ui/Button";
import styles from "./FavoriteButton.module.css";

export function FavoriteButton({ slug, name, filled = true }: { slug: string; name: string; filled?: boolean }) {
  const { isFavorite, toggleFavorite } = useShop();
  const active = isFavorite(slug);
  return (
    <IconButton
      label={active ? `Retirer ${name} des favoris` : `Ajouter ${name} aux favoris`}
      aria-pressed={active}
      filled={filled}
      small
      onClick={() => toggleFavorite(slug)}
      className={active ? styles.active : undefined}
    >
      <Heart size={17} strokeWidth={1.75} fill={active ? "currentColor" : "none"} aria-hidden />
    </IconButton>
  );
}
