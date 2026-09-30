import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import { featuredReviews } from "@/data/reviews";
import { productMap } from "@/data/products";
import { Rating, SectionHeader } from "@/components/ui/primitives";
import { formatDate } from "@/lib/format";
import styles from "./home.module.css";

export function ReviewsSection() {
  return (
    <section className="section" aria-labelledby="reviews-title">
      <div className="container">
        <SectionHeader
          id="reviews-title"
          eyebrow="Ils nous ont fait confiance"
          title="Ils ont fait sensation au réveillon"
          description="4,8/5 de moyenne sur plus de 2 300 avis vérifiés après achat."
        />
        <ul role="list" className={styles.reviews}>
          {featuredReviews.map((r) => {
            const p = r.productSlug ? productMap[r.productSlug] : undefined;
            return (
              <li key={r.id} className={styles.review}>
                <Rating value={r.rating} showValue={false} />
                <blockquote>
                  <p className={styles.reviewTitle}>« {r.title} »</p>
                  <p className={styles.reviewBody}>{r.body}</p>
                </blockquote>
                <div className={styles.reviewMeta}>
                  <p>
                    <strong>{r.author}</strong>, {r.city}
                    {r.verified && (
                      <span className={styles.verified}>
                        <BadgeCheck size={14} aria-hidden /> Achat vérifié
                      </span>
                    )}
                  </p>
                  <p>
                    <time dateTime={r.date}>{formatDate(r.date)}</time>
                    {p && (
                      <>
                        {" · "}
                        <Link href={`/product/${p.slug}`} className="text-link">
                          {p.name}
                        </Link>
                      </>
                    )}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
