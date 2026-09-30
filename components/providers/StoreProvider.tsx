"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { productMap } from "@/data/products";
import { computeTotals, resolveLines } from "@/lib/pricing";
import { actions, getServerSnapshot, getSnapshot, subscribe, type StoreState } from "@/lib/store";

export type ToastTone = "neutral" | "success" | "error";

export interface Toast {
  id: number;
  message: string;
  tone: ToastTone;
  action?: { label: string; href?: string; onClick?: () => void };
}

interface UIContextValue {
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toasts: Toast[];
  notify: (message: string, options?: { tone?: ToastTone; action?: Toast["action"] }) => void;
  dismiss: (id: number) => void;
}

const UIContext = createContext<UIContextValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const counter = useRef(0);

  const dismiss = useCallback((id: number) => setToasts((list) => list.filter((t) => t.id !== id)), []);

  const notify = useCallback<UIContextValue["notify"]>(
    (message, options = {}) => {
      counter.current += 1;
      const id = counter.current;
      setToasts((list) => [...list.slice(-2), { id, message, tone: options.tone ?? "neutral", action: options.action }]);
      window.setTimeout(() => dismiss(id), 4500);
    },
    [dismiss],
  );

  const value = useMemo<UIContextValue>(
    () => ({
      cartOpen,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      toasts,
      notify,
      dismiss,
    }),
    [cartOpen, toasts, notify, dismiss],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI doit être utilisé dans <StoreProvider>");
  return ctx;
}

export function useStoreState(): StoreState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

const noopSubscribe = () => () => {};

/** `true` une fois l'application hydratée côté navigateur (données localStorage disponibles). */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

export function useCart() {
  const state = useStoreState();
  const lines = useMemo(() => resolveLines(state.cart), [state.cart]);
  const totals = useMemo(
    () => computeTotals(lines, { promoCode: state.promoCode || undefined, shipping: state.shipping }),
    [lines, state.promoCode, state.shipping],
  );
  return { lines, totals, promoCode: state.promoCode, shipping: state.shipping, giftWrap: state.giftWrap, giftMessage: state.giftMessage };
}

/** Actions de haut niveau avec retour utilisateur (toasts, ouverture du mini-panier). */
export function useShop() {
  const { openCart, notify } = useUI();
  const state = useStoreState();

  const addToCart = useCallback(
    (slug: string, options: { color?: string; size?: string; quantity?: number; openDrawer?: boolean } = {}) => {
      const product = productMap[slug];
      if (!product) return;
      const sizeStock = options.size ? product.sizes?.find((s) => s.name === options.size)?.stock : undefined;
      actions.addToCart(slug, { ...options, max: Math.min(10, sizeStock ?? product.stock) });
      if (options.openDrawer === false) {
        notify(`${product.name} a été ajouté à votre panier.`, { tone: "success", action: { label: "Voir le panier", href: "/cart" } });
      } else {
        openCart();
      }
    },
    [openCart, notify],
  );

  const toggleFavorite = useCallback(
    (slug: string) => {
      const product = productMap[slug];
      const added = actions.toggleFavorite(slug);
      notify(added ? `${product?.name ?? "Article"} ajouté à vos favoris.` : `${product?.name ?? "Article"} retiré de vos favoris.`, {
        action: added ? { label: "Voir mes favoris", href: "/favorites" } : undefined,
      });
    },
    [notify],
  );

  const isFavorite = useCallback((slug: string) => state.favorites.includes(slug), [state.favorites]);

  return { addToCart, toggleFavorite, isFavorite, favorites: state.favorites };
}
