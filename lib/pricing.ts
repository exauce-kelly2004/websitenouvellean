import { productMap } from "@/data/products";
import { commerce, promoCodes, type PromoCode } from "@/data/site";
import type { CartLine, Product, ShippingMethod } from "@/types";

export function unitPrice(product: Product, size?: string): number {
  const option = size ? product.sizes?.find((s) => s.name === size) : undefined;
  return option?.price ?? product.price;
}

export function unitCompareAt(product: Product, size?: string): number | undefined {
  // Pas de prix barré pour les options à prix propre (contenance, montant).
  const option = size ? product.sizes?.find((s) => s.name === size) : undefined;
  return option?.price ? undefined : product.compareAtPrice;
}

export interface ResolvedLine extends CartLine {
  product: Product;
  unitPrice: number;
  compareAt?: number;
  total: number;
  maxQuantity: number;
}

export function resolveLines(lines: CartLine[]): ResolvedLine[] {
  return lines.flatMap((line) => {
    const product = productMap[line.slug];
    if (!product) return [];
    const price = unitPrice(product, line.size);
    const sizeStock = line.size ? product.sizes?.find((s) => s.name === line.size)?.stock : undefined;
    const maxQuantity = Math.max(1, Math.min(10, sizeStock ?? product.stock));
    return [{ ...line, product, unitPrice: price, compareAt: unitCompareAt(product, line.size), total: price * line.quantity, maxQuantity }];
  });
}

export function findPromo(code: string): PromoCode | undefined {
  return promoCodes.find((p) => p.code === code.trim().toUpperCase());
}

export interface CartTotals {
  itemCount: number;
  subtotal: number;
  savings: number;
  discount: number;
  promo?: PromoCode;
  promoError?: string;
  shipping: number;
  total: number;
  remainingForFreeShipping: number;
}

export function computeTotals(lines: ResolvedLine[], options: { promoCode?: string; shipping?: ShippingMethod } = {}): CartTotals {
  const itemCount = lines.reduce((n, l) => n + l.quantity, 0);
  const subtotal = lines.reduce((n, l) => n + l.total, 0);
  const savings = lines.reduce((n, l) => n + (l.compareAt ? (l.compareAt - l.unitPrice) * l.quantity : 0), 0);

  let promo: PromoCode | undefined;
  let promoError: string | undefined;
  if (options.promoCode) {
    promo = findPromo(options.promoCode);
    if (!promo) promoError = "Ce code n'est pas valide.";
    else if (promo.minSubtotal && subtotal < promo.minSubtotal) {
      promoError = `Ce code est valable dès ${promo.minSubtotal} € d'achat.`;
      promo = undefined;
    }
  }
  const discount = promo ? Math.round(subtotal * promo.rate * 100) / 100 : 0;
  const afterDiscount = subtotal - discount;

  const method = options.shipping ?? "standard";
  const freeEligible = afterDiscount >= commerce.freeShippingThreshold;
  const shipping = itemCount === 0 || method === "retrait" ? 0 : method === "standard" && freeEligible ? 0 : commerce.shipping[method].price;

  return {
    itemCount,
    subtotal,
    savings,
    discount,
    promo,
    promoError,
    shipping,
    total: Math.max(0, afterDiscount + shipping),
    remainingForFreeShipping: Math.max(0, commerce.freeShippingThreshold - afterDiscount),
  };
}
