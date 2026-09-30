"use client";

import { ArrowRight, CircleCheck } from "lucide-react";
import { useId, useState } from "react";
import styles from "./Footer.module.css";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function NewsletterForm() {
  const uid = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  if (status === "done") {
    return (
      <p className={styles.newsDone} role="status">
        <CircleCheck size={18} aria-hidden /> Merci ! Votre code BIENVENUE10 vient de vous être envoyé.
      </p>
    );
  }

  return (
    <form
      className={styles.newsForm}
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (!EMAIL.test(email.trim())) {
          setStatus("error");
          return;
        }
        setStatus("loading");
        // Inscription simulée (aucun envoi réel).
        window.setTimeout(() => setStatus("done"), 700);
      }}
    >
      <label htmlFor={`${uid}-email`} className="visually-hidden">
        Adresse e-mail
      </label>
      <div className={styles.newsField}>
        <input
          id={`${uid}-email`}
          type="email"
          placeholder="Votre adresse e-mail"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          aria-invalid={status === "error" || undefined}
          aria-describedby={status === "error" ? `${uid}-error` : `${uid}-hint`}
        />
        <button type="submit" disabled={status === "loading"} aria-label="S'inscrire à la newsletter">
          {status === "loading" ? "…" : <ArrowRight size={18} aria-hidden />}
        </button>
      </div>
      {status === "error" ? (
        <p id={`${uid}-error`} className={styles.newsError} role="alert">
          Merci de saisir une adresse e-mail valide.
        </p>
      ) : (
        <p id={`${uid}-hint`} className={styles.newsHint}>
          −10 % sur votre première commande. Désinscription en un clic.
        </p>
      )}
    </form>
  );
}
