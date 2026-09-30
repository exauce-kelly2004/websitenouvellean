import Link from "next/link";
import styles from "./Logo.module.css";

export function Logo({ onClick, tone = "ink" }: { onClick?: () => void; tone?: "ink" | "light" }) {
  return (
    <Link href="/" className={`${styles.logo} ${tone === "light" ? styles.light : ""}`} onClick={onClick} aria-label="Maison Aube — accueil">
      <span className={styles.word}>Maison</span>
      <span className={styles.mark}>Aube</span>
    </Link>
  );
}
