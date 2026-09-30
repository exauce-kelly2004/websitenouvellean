import Link from "next/link";
import { ChevronRight, CircleAlert, CircleCheck, Info, Minus, Plus, Star } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { discountPercent, formatPrice } from "@/lib/format";
import type { ProductBadge } from "@/types";
import styles from "./primitives.module.css";

/* ---------------- Badge ---------------- */

type BadgeTone = "default" | "new" | "sale" | "limited" | "low";

const badgeToneForLabel: Record<ProductBadge, BadgeTone> = {
  Nouveau: "new",
  "Best-seller": "default",
  "Édition limitée": "limited",
  "Dernières pièces": "low",
};

export function Badge({ children, tone = "default" }: { children: ReactNode; tone?: BadgeTone }) {
  const toneClass = { default: "", new: styles.badgeNew, sale: styles.badgeSale, limited: styles.badgeLimited, low: styles.badgeLow }[tone];
  return <span className={[styles.badge, toneClass].join(" ")}>{children}</span>;
}

export function ProductBadgeTag({ badge }: { badge: ProductBadge }) {
  return <Badge tone={badgeToneForLabel[badge]}>{badge}</Badge>;
}

/* ---------------- Rating ---------------- */

export function Rating({ value, count, size = 13, showValue = true }: { value: number; count?: number; size?: number; showValue?: boolean }) {
  const pct = `${Math.max(0, Math.min(100, (value / 5) * 100))}%`;
  const stars = Array.from({ length: 5 }, (_, i) => <Star key={i} size={size} fill="currentColor" strokeWidth={0} aria-hidden />);
  return (
    <span className={styles.rating}>
      <span className={styles.stars} role="img" aria-label={`Note : ${value.toLocaleString("fr-FR")} sur 5${count ? `, ${count} avis` : ""}`}>
        <span className={styles.starsBase}>{stars}</span>
        <span className={styles.starsFill} style={{ width: pct }}>
          {stars}
        </span>
      </span>
      {showValue && (
        <span aria-hidden>
          <span className={styles.ratingValue}>{value.toLocaleString("fr-FR")}</span>
          {count !== undefined && <> ({count})</>}
        </span>
      )}
    </span>
  );
}

/* ---------------- Price ---------------- */

export function Price({ price, compareAt, large, showOff = false }: { price: number; compareAt?: number; large?: boolean; showOff?: boolean }) {
  const off = discountPercent(price, compareAt);
  return (
    <span className={[styles.price, large && styles.priceLg].filter(Boolean).join(" ")}>
      {off ? (
        <>
          <span className={styles.priceSale}>
            <span className="visually-hidden">Prix réduit : </span>
            {formatPrice(price)}
          </span>
          <s className={styles.priceCompare}>
            <span className="visually-hidden">Prix initial : </span>
            {formatPrice(compareAt!)}
          </s>
          {showOff && <span className={styles.priceOff}>−{off} %</span>}
        </>
      ) : (
        <span>{formatPrice(price)}</span>
      )}
    </span>
  );
}

/* ---------------- Swatch ---------------- */

export function Swatch({ hex, style }: { hex: string; style?: CSSProperties }) {
  return <span className={styles.swatch} style={{ background: hex, ...style }} aria-hidden />;
}

/* ---------------- Section header ---------------- */

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  id,
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  id?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={styles.sectionHeader}>
      <div className={styles.sectionHeaderText}>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <Heading id={id}>{title}</Heading>
        {description && <p>{description}</p>}
      </div>
      {action && <div className={styles.sectionHeaderAction}>{action}</div>}
    </div>
  );
}

/* ---------------- Breadcrumbs ---------------- */

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ label: "Accueil", href: "/" }, ...items];
  return (
    <nav aria-label="Fil d'Ariane" className={styles.breadcrumbs}>
      <ol>
        {all.map((item, i) => {
          const last = i === all.length - 1;
          return (
            <li key={`${item.label}-${i}`}>
              {last || !item.href ? (
                <span aria-current={last ? "page" : undefined}>{item.label}</span>
              ) : (
                <Link href={item.href}>{item.label}</Link>
              )}
              {!last && <ChevronRight size={12} aria-hidden />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* ---------------- Page header ---------------- */

export function PageHeader({
  crumbs,
  eyebrow,
  title,
  intro,
  meta,
  children,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  intro?: string;
  meta?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className={styles.pageHeader}>
      <div className={`container ${styles.pageHeaderInner}`}>
        <Breadcrumbs items={crumbs} />
        <div>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1>{title}</h1>
        </div>
        {intro && <p className={styles.pageHeaderIntro}>{intro}</p>}
        {meta && <p className={styles.pageHeaderMeta}>{meta}</p>}
        {children}
      </div>
    </header>
  );
}

/* ---------------- Quantity stepper ---------------- */

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 10,
  label,
  large,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label: string;
  large?: boolean;
}) {
  return (
    <div className={[styles.stepper, large && styles.stepperLg].filter(Boolean).join(" ")} role="group" aria-label={label}>
      <button type="button" onClick={() => onChange(value - 1)} disabled={value <= min} aria-label="Diminuer la quantité">
        <Minus size={14} aria-hidden />
      </button>
      <output aria-live="polite">{value}</output>
      <button type="button" onClick={() => onChange(value + 1)} disabled={value >= max} aria-label="Augmenter la quantité">
        <Plus size={14} aria-hidden />
      </button>
    </div>
  );
}

/* ---------------- Skeleton ---------------- */

export function Skeleton({ width = "100%", height = 16, style }: { width?: string | number; height?: string | number; style?: CSSProperties }) {
  return <span className={styles.skeleton} style={{ display: "block", width, height, ...style }} aria-hidden />;
}

/* ---------------- Empty state ---------------- */

export function EmptyState({
  icon,
  title,
  children,
  actions,
  headingLevel = "h2",
}: {
  icon: ReactNode;
  title: string;
  children?: ReactNode;
  actions?: ReactNode;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <div className={styles.empty}>
      <span className={styles.emptyIcon} aria-hidden>
        {icon}
      </span>
      <Heading>{title}</Heading>
      {children && <p>{children}</p>}
      {actions && <div className={styles.emptyActions}>{actions}</div>}
    </div>
  );
}

/* ---------------- Accordion ---------------- */

export function Accordion({ items }: { items: { title: string; content: ReactNode; open?: boolean }[] }) {
  return (
    <div className={styles.accordion}>
      {items.map((item) => (
        <details key={item.title} className={styles.accordionItem} open={item.open}>
          <summary>
            {item.title}
            <Plus size={16} aria-hidden />
          </summary>
          <div className={styles.accordionBody}>{item.content}</div>
        </details>
      ))}
    </div>
  );
}

/* ---------------- Alert ---------------- */

export function Alert({ tone = "info", children }: { tone?: "info" | "success" | "error"; children: ReactNode }) {
  const Icon = tone === "success" ? CircleCheck : tone === "error" ? CircleAlert : Info;
  const toneClass = { info: styles.alertInfo, success: styles.alertSuccess, error: styles.alertError }[tone];
  return (
    <div className={[styles.alert, toneClass].join(" ")} role={tone === "error" ? "alert" : "status"}>
      <Icon size={16} aria-hidden />
      <div>{children}</div>
    </div>
  );
}
