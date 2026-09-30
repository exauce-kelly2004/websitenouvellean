import { BadgeCheck, Gem, Gift, Headset, Lock, RotateCcw, Scissors, Truck } from "lucide-react";
import { commerce } from "@/data/site";
import styles from "./home.module.css";

const service = [
  { icon: Truck, title: "Livraison offerte", text: `Dès ${commerce.freeShippingThreshold} € — express en 24 h` },
  { icon: Lock, title: "Paiement sécurisé", text: "Carte, Apple Pay, PayPal, 3× sans frais" },
  { icon: RotateCcw, title: "Retours gratuits", text: "30 jours, prolongés au 31 janvier" },
  { icon: Gift, title: "Emballage offert", text: "Écrin et carte manuscrite" },
];

const brand = [
  { icon: Gem, title: "Matières choisies", text: "Laine, soie, cuir pleine fleur" },
  { icon: Scissors, title: "Ateliers européens", text: "Portugal, Italie, Espagne, France" },
  { icon: Headset, title: "Conseil 6 j/7", text: "Stylistes par téléphone et e-mail" },
  { icon: BadgeCheck, title: "Clients satisfaits", text: "4,8/5 sur 2 300 avis vérifiés" },
];

export function Reassurance({ variant = "service" }: { variant?: "service" | "brand" }) {
  const items = variant === "service" ? service : brand;
  return (
    <section className={`${styles.reassurance} ${variant === "brand" ? styles.reassuranceBrand : ""}`} aria-label={variant === "service" ? "Nos services" : "Nos engagements"}>
      <ul role="list" className={`container ${styles.reassuranceList}`}>
        {items.map(({ icon: Icon, title, text }) => (
          <li key={title}>
            <Icon size={22} strokeWidth={1.4} aria-hidden />
            <div>
              <p className={styles.reassuranceTitle}>{title}</p>
              <p className={styles.reassuranceText}>{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
