"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { SelectField, TextArea, TextField } from "@/components/ui/Field";
import { Alert } from "@/components/ui/primitives";

type Errors = Partial<Record<"name" | "email" | "topic" | "message", string>>;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [errors, setErrors] = useState<Errors>({});

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const topic = String(data.get("topic") ?? "");
    const message = String(data.get("message") ?? "").trim();
    const found: Errors = {};
    if (!name) found.name = "Indiquez votre nom.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) found.email = "Saisissez une adresse e-mail valide.";
    if (!topic) found.topic = "Choisissez un sujet.";
    if (message.length < 10) found.message = "Votre message doit contenir au moins 10 caractères.";
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    // Envoi simulé : aucune donnée ne quitte le navigateur.
    window.setTimeout(() => setStatus("sent"), 900);
  };

  if (status === "sent") {
    return (
      <Alert tone="success">
        <strong>Message bien reçu.</strong> Un conseiller vous répondra sous 24 h ouvrées (démonstration : aucun message n&apos;a réellement été envoyé).
      </Alert>
    );
  }

  const clear = (field: keyof Errors) => () => errors[field] && setErrors((er) => ({ ...er, [field]: undefined }));

  return (
    <form onSubmit={submit} noValidate style={{ display: "grid", gap: "var(--space-5)" }}>
      <div style={{ display: "grid", gap: "var(--space-4)", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
        <TextField label="Nom" name="name" autoComplete="name" error={errors.name} onChange={clear("name")} />
        <TextField label="E-mail" name="email" type="email" autoComplete="email" error={errors.email} onChange={clear("email")} />
      </div>
      <TextField label="Numéro de commande" name="order" optional placeholder="MA-123456" />
      <SelectField label="Sujet" name="topic" defaultValue="" error={errors.topic} onChange={clear("topic")}>
        <option value="" disabled>
          Choisir un sujet
        </option>
        <option>Conseil taille ou style</option>
        <option>Suivi de commande</option>
        <option>Retour ou échange</option>
        <option>Cadeau et carte cadeau</option>
        <option>Rendez-vous en boutique</option>
        <option>Autre demande</option>
      </SelectField>
      <TextArea label="Message" name="message" rows={6} error={errors.message} onChange={clear("message")} maxLength={1200} />
      <div>
        <Button type="submit" size="lg" loading={status === "sending"}>
          Envoyer le message
        </Button>
      </div>
    </form>
  );
}
