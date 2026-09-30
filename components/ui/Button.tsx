import Link from "next/link";
import { ArrowRight, LoaderCircle } from "lucide-react";
import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "dark" | "secondary" | "light" | "lightOutline" | "accent" | "ghost";
type Size = "sm" | "md" | "lg";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  icon?: ReactNode;
  /** Affiche une flèche animée après le libellé. */
  arrow?: boolean;
  children: ReactNode;
  className?: string;
}

function classes({ variant = "primary", size = "md", fullWidth, className }: Omit<CommonProps, "children">) {
  return [
    styles.button,
    variant !== "primary" && styles[variant],
    size !== "md" && styles[size],
    fullWidth && styles.full,
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean };

export function Button({ variant, size, fullWidth, icon, arrow, loading, children, className, disabled, type = "button", ...rest }: ButtonProps) {
  return (
    <button
      type={type}
      className={classes({ variant, size, fullWidth, className })}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? <LoaderCircle size={16} className={styles.spinner} aria-hidden /> : icon}
      {children}
      {arrow && <ArrowRight size={16} className={styles.trailing} aria-hidden />}
    </button>
  );
}

type ButtonLinkProps = CommonProps & Omit<ComponentProps<typeof Link>, "className" | "children">;

export function ButtonLink({ variant, size, fullWidth, icon, arrow, children, className, ...rest }: ButtonLinkProps) {
  return (
    <Link className={classes({ variant, size, fullWidth, className })} {...rest}>
      {icon}
      {children}
      {arrow && <ArrowRight size={16} className={styles.trailing} aria-hidden />}
    </Link>
  );
}

export function ArrowLink({ children, className, ...rest }: Omit<ComponentProps<typeof Link>, "children"> & { children: ReactNode }) {
  return (
    <Link className={[styles.arrowLink, className].filter(Boolean).join(" ")} {...rest}>
      {children}
      <ArrowRight size={15} aria-hidden />
    </Link>
  );
}

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  children: ReactNode;
  filled?: boolean;
  small?: boolean;
  count?: number;
}

export function IconButton({ label, children, filled, small, count, className, type = "button", ...rest }: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={[styles.icon, filled && styles.iconFilled, small && styles.iconSm, className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
      {count ? (
        <span className={styles.count} aria-hidden>
          {count > 99 ? "99+" : count}
        </span>
      ) : null}
    </button>
  );
}

interface IconLinkProps extends Omit<ComponentProps<typeof Link>, "children"> {
  label: string;
  children: ReactNode;
  count?: number;
}

export function IconLink({ label, children, count, className, ...rest }: IconLinkProps) {
  return (
    <Link aria-label={count ? `${label} (${count})` : label} title={label} className={[styles.icon, className].filter(Boolean).join(" ")} {...rest}>
      {children}
      {count ? (
        <span className={styles.count} aria-hidden>
          {count > 99 ? "99+" : count}
        </span>
      ) : null}
    </Link>
  );
}

export { styles as buttonStyles };
