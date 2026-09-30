import { ChevronDown, CircleAlert } from "lucide-react";
import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import styles from "./Field.module.css";

interface FieldShellProps {
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  hideLabel?: boolean;
}

function Shell({ id, label, hint, error, optional, hideLabel, children }: FieldShellProps & { id: string; children: ReactNode }) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={hideLabel ? "visually-hidden" : styles.label}>
        {label} {optional && <span className={styles.optional}>(facultatif)</span>}
      </label>
      {children}
      {error ? (
        <span id={`${id}-error`} className={styles.error} role="alert">
          <CircleAlert size={13} aria-hidden /> {error}
        </span>
      ) : hint ? (
        <span id={`${id}-hint`} className={styles.hint}>
          {hint}
        </span>
      ) : null}
    </div>
  );
}

function describedBy(id: string, error?: string, hint?: string) {
  return error ? `${id}-error` : hint ? `${id}-hint` : undefined;
}

export function TextField({ label, hint, error, optional, hideLabel, id: idProp, className, ...rest }: FieldShellProps & InputHTMLAttributes<HTMLInputElement>) {
  const autoId = useId();
  const id = idProp ?? autoId;
  return (
    <Shell id={id} label={label} hint={hint} error={error} optional={optional} hideLabel={hideLabel}>
      <input
        id={id}
        className={[styles.control, className].filter(Boolean).join(" ")}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        {...rest}
      />
    </Shell>
  );
}

export function TextArea({ label, hint, error, optional, id: idProp, ...rest }: FieldShellProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const autoId = useId();
  const id = idProp ?? autoId;
  return (
    <Shell id={id} label={label} hint={hint} error={error} optional={optional}>
      <textarea id={id} className={styles.control} aria-invalid={error ? true : undefined} aria-describedby={describedBy(id, error, hint)} {...rest} />
    </Shell>
  );
}

export function SelectField({
  label,
  hint,
  error,
  optional,
  hideLabel,
  id: idProp,
  children,
  ...rest
}: FieldShellProps & SelectHTMLAttributes<HTMLSelectElement>) {
  const autoId = useId();
  const id = idProp ?? autoId;
  return (
    <Shell id={id} label={label} hint={hint} error={error} optional={optional} hideLabel={hideLabel}>
      <div className={styles.selectWrap}>
        <select id={id} className={styles.control} aria-invalid={error ? true : undefined} {...rest}>
          {children}
        </select>
        <ChevronDown size={16} aria-hidden />
      </div>
    </Shell>
  );
}

export function Checkbox({ label, type = "checkbox", ...rest }: { label: ReactNode } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={styles.check}>
      <input type={type} {...rest} />
      <span>{label}</span>
    </label>
  );
}

export { styles as fieldStyles };
