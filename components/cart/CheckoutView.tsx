"use client";

import { useRouter } from "next/navigation";
import { Lock, ShoppingBag } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useCart, useHydrated } from "@/components/providers/StoreProvider";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Checkbox, TextField } from "@/components/ui/Field";
import { Alert, EmptyState, Skeleton } from "@/components/ui/primitives";
import { formatPrice } from "@/lib/format";
import { actions } from "@/lib/store";
import { ShippingOptions } from "./CartView";
import { OrderSummary } from "./OrderSummary";
import styles from "./Pages.module.css";

type Field = "email" | "firstName" | "lastName" | "address" | "postcode" | "city" | "phone" | "card" | "expiry" | "cvc";
type Values = Record<Field, string>;

const initial: Values = { email: "", firstName: "", lastName: "", address: "", postcode: "", city: "", phone: "", card: "", expiry: "", cvc: "" };

export const LAST_ORDER_KEY = "maison-aube:last-order";

function validate(v: Values, pickup: boolean): Partial<Record<Field, string>> {
  const e: Partial<Record<Field, string>> = {};
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Saisissez une adresse e-mail valide.";
  if (!v.firstName.trim()) e.firstName = "Indiquez votre prénom.";
  if (!v.lastName.trim()) e.lastName = "Indiquez votre nom.";
  if (!pickup) {
    if (v.address.trim().length < 5) e.address = "Indiquez votre adresse de livraison.";
    if (!/^\d{5}$/.test(v.postcode.trim())) e.postcode = "Code postal à 5 chiffres.";
    if (!v.city.trim()) e.city = "Indiquez votre ville.";
  }
  if (!/^(\+33|0)[1-9](\s?\d{2}){4}$/.test(v.phone.trim())) e.phone = "Numéro de téléphone français attendu (ex. 06 12 34 56 78).";
  if (v.card.replace(/\s/g, "").length !== 16) e.card = "Numéro de carte à 16 chiffres (démonstration).";
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(v.expiry.trim())) e.expiry = "Format MM/AA.";
  if (!/^\d{3}$/.test(v.cvc.trim())) e.cvc = "3 chiffres.";
  return e;
}

export function CheckoutView() {
  const router = useRouter();
  const hydrated = useHydrated();
  const { lines, totals, shipping } = useCart();
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [accepted, setAccepted] = useState(false);
  const [acceptError, setAcceptError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const pickup = shipping === "retrait";

  if (!hydrated) {
    return (
      <div className={styles.cartLayout} aria-busy="true" aria-label="Chargement">
        <Skeleton height={520} />
        <Skeleton height={320} />
      </div>
    );
  }

  if (lines.length === 0 && !submitting) {
    return (
      <EmptyState
        icon={<ShoppingBag size={26} strokeWidth={1.5} />}
        title="Votre panier est vide"
        actions={<ButtonLink href="/shop">Découvrir la boutique</ButtonLink>}
      >
        Ajoutez des articles à votre panier pour passer commande.
      </EmptyState>
    );
  }

  const bind = (field: Field) => ({
    name: field,
    value: values[field],
    error: errors[field],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((v) => ({ ...v, [field]: e.target.value }));
      if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
    },
  });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate(values, pickup);
    setErrors(found);
    setAcceptError(!accepted);
    const firstError = Object.keys(found)[0];
    if (firstError || !accepted) {
      document.getElementsByName(firstError ?? "accept")[0]?.focus();
      return;
    }
    setSubmitting(true);
    // Paiement simulé : aucune donnée n'est transmise.
    window.setTimeout(() => {
      const order = {
        number: `MA-${Date.now().toString().slice(-6)}`,
        email: values.email.trim(),
        firstName: values.firstName.trim(),
        total: totals.total,
        items: totals.itemCount,
        shipping,
      };
      try {
        window.sessionStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
      } catch {
        // stockage indisponible : la confirmation affichera un message générique
      }
      actions.clearCart();
      router.push("/checkout/confirmation");
    }, 1200);
  };

  return (
    <form className={styles.cartLayout} onSubmit={submit} noValidate>
      <div className={styles.checkoutMain}>
        <Alert>Site de démonstration : aucune commande n&apos;est expédiée et aucun paiement n&apos;est débité. Utilisez des données fictives.</Alert>

        <section className={styles.step} aria-labelledby="step-contact">
          <h2 id="step-contact">
            <span>1</span> Contact
          </h2>
          <TextField label="Adresse e-mail" type="email" autoComplete="email" inputMode="email" {...bind("email")} hint="Pour la confirmation et le suivi de commande." />
          <TextField label="Téléphone" type="tel" autoComplete="tel" inputMode="tel" {...bind("phone")} hint="Le transporteur vous préviendra avant la livraison." />
        </section>

        <section className={styles.step} aria-labelledby="step-shipping">
          <h2 id="step-shipping">
            <span>2</span> Livraison
          </h2>
          <div className={styles.row2}>
            <TextField label="Prénom" autoComplete="given-name" {...bind("firstName")} />
            <TextField label="Nom" autoComplete="family-name" {...bind("lastName")} />
          </div>
          <ShippingOptions value={shipping} freeEligible={totals.remainingForFreeShipping === 0} />
          {!pickup && (
            <>
              <TextField label="Adresse" autoComplete="street-address" {...bind("address")} />
              <div className={styles.row2}>
                <TextField label="Code postal" autoComplete="postal-code" inputMode="numeric" maxLength={5} {...bind("postcode")} />
                <TextField label="Ville" autoComplete="address-level2" {...bind("city")} />
              </div>
            </>
          )}
        </section>

        <section className={styles.step} aria-labelledby="step-payment">
          <h2 id="step-payment">
            <span>3</span> Paiement <Lock size={16} aria-hidden className={styles.lock} />
          </h2>
          <TextField label="Numéro de carte" autoComplete="off" inputMode="numeric" placeholder="4242 4242 4242 4242" maxLength={19} {...bind("card")} />
          <div className={styles.row2}>
            <TextField label="Expiration" placeholder="MM/AA" autoComplete="off" maxLength={5} {...bind("expiry")} />
            <TextField label="Cryptogramme" inputMode="numeric" autoComplete="off" maxLength={3} {...bind("cvc")} />
          </div>
          <Checkbox
            name="accept"
            checked={accepted}
            onChange={(e) => {
              setAccepted(e.target.checked);
              if (e.target.checked) setAcceptError(false);
            }}
            aria-invalid={acceptError || undefined}
            label={
              <>
                J&apos;accepte les{" "}
                <a href="/terms" target="_blank" className="text-link">
                  conditions générales de vente
                </a>{" "}
                et la{" "}
                <a href="/privacy" target="_blank" className="text-link">
                  politique de confidentialité
                </a>
                .
              </>
            }
          />
          {acceptError && (
            <p className={styles.fieldError} role="alert">
              Merci d&apos;accepter les conditions générales pour continuer.
            </p>
          )}
        </section>
      </div>

      <aside className={styles.cartAside} aria-label="Récapitulatif de commande">
        <OrderSummary compactLines>
          <Button type="submit" size="lg" fullWidth loading={submitting} icon={<Lock size={16} aria-hidden />}>
            {submitting ? "Validation…" : `Payer ${formatPrice(totals.total)}`}
          </Button>
        </OrderSummary>
      </aside>
    </form>
  );
}
