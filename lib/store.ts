/**
 * Magasin client (panier, favoris, préférences de commande) persisté dans localStorage.
 * Implémenté comme « external store » pour useSyncExternalStore : pas de décalage
 * d'hydratation, synchronisation entre onglets via l'événement `storage`.
 */
import type { CartLine, ShippingMethod } from "@/types";

export interface StoreState {
  cart: CartLine[];
  favorites: string[];
  promoCode: string;
  shipping: ShippingMethod;
  giftWrap: boolean;
  recent: string[];
  giftMessage: string;
}

const STORAGE_KEY = "maison-aube:v1";

export const emptyState: StoreState = Object.freeze({
  cart: [],
  favorites: [],
  promoCode: "",
  shipping: "standard",
  giftWrap: false,
  recent: [],
  giftMessage: "",
}) as StoreState;

let state: StoreState | null = null;
const listeners = new Set<() => void>();

function read(): StoreState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState;
    const parsed = JSON.parse(raw) as Partial<StoreState>;
    return {
      cart: Array.isArray(parsed.cart) ? parsed.cart : [],
      favorites: Array.isArray(parsed.favorites) ? parsed.favorites : [],
      promoCode: typeof parsed.promoCode === "string" ? parsed.promoCode : "",
      shipping: parsed.shipping ?? "standard",
      giftWrap: Boolean(parsed.giftWrap),
      recent: Array.isArray(parsed.recent) ? parsed.recent.slice(0, 12) : [],
      giftMessage: typeof parsed.giftMessage === "string" ? parsed.giftMessage.slice(0, 200) : "",
    };
  } catch {
    return emptyState;
  }
}

function write(next: StoreState) {
  state = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Stockage indisponible (navigation privée, quota) : l'état reste en mémoire.
  }
  listeners.forEach((l) => l());
}

export function getSnapshot(): StoreState {
  if (state === null) state = read();
  return state;
}

export function getServerSnapshot(): StoreState {
  return emptyState;
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      state = read();
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function update(recipe: (current: StoreState) => StoreState) {
  write(recipe(getSnapshot()));
}

export function lineId(slug: string, color?: string, size?: string) {
  return [slug, color ?? "", size ?? ""].join("|");
}

export const actions = {
  addToCart(slug: string, options: { color?: string; size?: string; quantity?: number; max?: number } = {}) {
    const id = lineId(slug, options.color, options.size);
    const qty = options.quantity ?? 1;
    const max = options.max ?? 10;
    update((s) => {
      const existing = s.cart.find((l) => l.id === id);
      const cart = existing
        ? s.cart.map((l) => (l.id === id ? { ...l, quantity: Math.min(max, l.quantity + qty) } : l))
        : [...s.cart, { id, slug, color: options.color, size: options.size, quantity: Math.min(max, qty) }];
      return { ...s, cart };
    });
  },
  setQuantity(id: string, quantity: number) {
    update((s) => ({
      ...s,
      cart: quantity <= 0 ? s.cart.filter((l) => l.id !== id) : s.cart.map((l) => (l.id === id ? { ...l, quantity } : l)),
    }));
  },
  removeLine(id: string) {
    update((s) => ({ ...s, cart: s.cart.filter((l) => l.id !== id) }));
  },
  restoreLine(line: CartLine, index: number) {
    update((s) => {
      if (s.cart.some((l) => l.id === line.id)) return s;
      const cart = [...s.cart];
      cart.splice(Math.min(index, cart.length), 0, line);
      return { ...s, cart };
    });
  },
  clearCart() {
    update((s) => ({ ...s, cart: [], promoCode: "", giftWrap: false, giftMessage: "" }));
  },
  toggleFavorite(slug: string): boolean {
    let added = false;
    update((s) => {
      added = !s.favorites.includes(slug);
      return { ...s, favorites: added ? [slug, ...s.favorites] : s.favorites.filter((f) => f !== slug) };
    });
    return added;
  },
  setPromoCode(code: string) {
    update((s) => ({ ...s, promoCode: code.trim().toUpperCase() }));
  },
  setShipping(shipping: ShippingMethod) {
    update((s) => ({ ...s, shipping }));
  },
  addRecent(slug: string) {
    update((s) => (s.recent[0] === slug ? s : { ...s, recent: [slug, ...s.recent.filter((r) => r !== slug)].slice(0, 12) }));
  },
  setGiftMessage(giftMessage: string) {
    update((s) => ({ ...s, giftMessage: giftMessage.slice(0, 200) }));
  },
  setGiftWrap(giftWrap: boolean) {
    update((s) => ({ ...s, giftWrap }));
  },
};
