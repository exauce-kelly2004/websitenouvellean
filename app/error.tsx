"use client";

import { RotateCcw } from "lucide-react";
import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";
import styles from "./system.module.css";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className={styles.system}>
      <div className="container-text">
        <p className={styles.code}>Oups</p>
        <h1>Un contretemps inattendu</h1>
        <p className="lead">La page n&apos;a pas pu s&apos;afficher correctement. Votre panier et vos favoris sont intacts.</p>
        <div className={styles.actions}>
          <Button onClick={reset} icon={<RotateCcw size={16} aria-hidden />}>
            Réessayer
          </Button>
          <ButtonLink href="/" variant="secondary">
            Retour à l&apos;accueil
          </ButtonLink>
        </div>
        {error.digest && <p className={styles.digest}>Référence : {error.digest}</p>}
      </div>
    </section>
  );
}
