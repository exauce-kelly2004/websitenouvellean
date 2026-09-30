"use client";

import Link from "next/link";
import { CircleAlert, CircleCheck, X } from "lucide-react";
import { useUI } from "@/components/providers/StoreProvider";
import styles from "./Toaster.module.css";

export function Toaster() {
  const { toasts, dismiss } = useUI();
  return (
    <div className={styles.region} role="region" aria-label="Notifications">
      <ol className={styles.list} aria-live="polite">
        {toasts.map((toast) => (
          <li key={toast.id} className={styles.toast} data-tone={toast.tone}>
            {toast.tone === "error" ? (
              <CircleAlert size={18} aria-hidden className={styles.icon} />
            ) : (
              <CircleCheck size={18} aria-hidden className={styles.icon} />
            )}
            <p className={styles.message}>{toast.message}</p>
            {toast.action &&
              (toast.action.href ? (
                <Link href={toast.action.href} className={styles.action} onClick={() => dismiss(toast.id)}>
                  {toast.action.label}
                </Link>
              ) : (
                <button
                  type="button"
                  className={styles.action}
                  onClick={() => {
                    toast.action?.onClick?.();
                    dismiss(toast.id);
                  }}
                >
                  {toast.action.label}
                </button>
              ))}
            <button type="button" className={styles.close} onClick={() => dismiss(toast.id)} aria-label="Fermer la notification">
              <X size={16} aria-hidden />
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
