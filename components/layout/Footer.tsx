import Link from "next/link";
import { CreditCard, Lock, MapPin, Phone } from "lucide-react";
import { footerNav, site } from "@/data/site";
import { Logo } from "./Logo";
import { NewsletterForm } from "./NewsletterForm";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <Logo tone="light" />
            <p className={styles.newsTitle}>Recevez nos nouveautés et nos invitations en avant-première.</p>
            <NewsletterForm />
          </div>

          <nav aria-label="Liens du pied de page" className={styles.columns}>
            {footerNav.map((col) => (
              <div key={col.title}>
                <p className={styles.colTitle}>{col.title}</p>
                <ul role="list">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className={styles.contact}>
          <p>
            <MapPin size={15} aria-hidden /> Boutique : {site.address}
          </p>
          <p>
            <Phone size={15} aria-hidden /> <a href={`tel:${site.phoneHref}`}>{site.phone}</a> — {site.hours}
          </p>
          <p>
            <Lock size={15} aria-hidden /> Paiement sécurisé
            <span className={styles.pay}>
              <CreditCard size={15} aria-hidden /> Carte bancaire · Apple Pay · PayPal · 3× sans frais
            </span>
          </p>
        </div>

        <div className={styles.bottom}>
          <p>© {site.campaignYear - 1} Maison Aube — Site de démonstration, aucune commande réelle n&apos;est traitée.</p>
          <ul role="list">
            <li>
              <Link href="/terms">CGV</Link>
            </li>
            <li>
              <Link href="/privacy">Confidentialité</Link>
            </li>
            <li>
              <Link href="/shipping-returns">Livraison & retours</Link>
            </li>
            <li>
              <Link href="/about#credits">Crédits photos</Link>
            </li>
            <li>
              <a href="https://www.instagram.com" rel="noopener noreferrer" target="_blank">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://www.pinterest.com" rel="noopener noreferrer" target="_blank">
                Pinterest
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
