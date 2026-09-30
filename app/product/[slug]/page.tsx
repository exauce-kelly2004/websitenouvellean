import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BadgeCheck, Star } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { CarouselItem, ProductCarousel } from "@/components/product/ProductCarousel";
import { LookBuilder } from "@/components/product/LookBuilder";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPurchase } from "@/components/product/ProductPurchase";
import { RecentlyViewedTracker } from "@/components/product/RecentlyViewed";
import { ArrowLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { Accordion, Breadcrumbs, Rating, SectionHeader } from "@/components/ui/primitives";
import { categoryMap } from "@/data/categories";
import { products } from "@/data/products";
import { getProductReviews } from "@/data/reviews";
import { commerce } from "@/data/site";
import { getProduct, getRelatedProducts, getSimilarProducts } from "@/lib/catalog";
import { formatDate, formatPrice } from "@/lib/format";
import { breadcrumbJsonLd, pageMetadata, productJsonLd } from "@/lib/seo";
import styles from "./product.module.css";

type Params = Promise<{ slug: string }>;

/** Seuls les slugs connus existent : les autres renvoient un vrai 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Produit introuvable" };
  const category = categoryMap[product.category];
  return pageMetadata({
    title: `${product.name} — ${product.subtitle}`,
    description: `${product.name} (${product.subtitle.toLowerCase()}) à ${formatPrice(product.price)} — noté ${product.rating.toLocaleString("fr-FR")}/5 par ${product.reviewCount} clients. Livré avant le réveillon, livraison offerte dès ${commerce.freeShippingThreshold} €, retours gratuits. ${category.name} Maison Aube.`,
    path: `/product/${product.slug}`,
    image: product.images[0],
  });
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = categoryMap[product.category];
  const related = getRelatedProducts(product, 3);
  const similar = getSimilarProducts(product, 8);
  const reviews = getProductReviews(product.slug, product.category);

  const distribution = [5, 4, 3, 2, 1].map((stars) => {
    // Répartition fictive cohérente avec la note moyenne.
    const weights: Record<number, number> = { 5: product.rating >= 4.7 ? 0.82 : 0.68, 4: product.rating >= 4.7 ? 0.14 : 0.24, 3: 0.03, 2: 0.007, 1: 0.003 };
    return { stars, count: Math.round(product.reviewCount * weights[stars]) };
  });

  return (
    <>
      <div className={`container ${styles.crumbs}`}>
        <Breadcrumbs
          items={[
            { label: "Boutique", href: "/shop" },
            { label: category.name, href: `/category/${category.slug}` },
            { label: product.name },
          ]}
        />
      </div>

      <div className={`container ${styles.main}`}>
        <ProductGallery images={product.images} name={product.name} />
        <div className={styles.side}>
          <ProductPurchase product={product} />
          <div className={styles.description}>
            <p>{product.description}</p>
          </div>
          <Accordion
            items={[
              {
                title: "Détails & coupe",
                open: true,
                content: (
                  <ul>
                    {product.details.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                ),
              },
              { title: "Composition & entretien", content: <p>{product.composition}</p> },
              {
                title: "Livraison & retours",
                content: (
                  <>
                    <p>
                      Livraison standard en 2 à 3 jours ouvrés (5,90 €, offerte dès {commerce.freeShippingThreshold} €), express le lendemain avant 13 h (12,90 €) ou retrait gratuit en
                      boutique à Paris. Retours gratuits sous {commerce.returnsDays} jours.
                    </p>
                    <p style={{ marginTop: "0.75rem" }}>
                      <ArrowLink href="/shipping-returns">Toutes les conditions</ArrowLink>
                    </p>
                  </>
                ),
              },
            ]}
          />
        </div>
      </div>

      {related.length > 0 && (
        <section className={`section ${styles.lookSection}`} aria-labelledby="look-title">
          <div className={`container ${styles.lookGrid}`}>
            <div>
              <span className="eyebrow">Complétez le look</span>
              <h2 id="look-title" className={styles.lookTitle}>
                Souvent portés avec {product.name}
              </h2>
              <p className={styles.lookText}>
                Nos stylistes ont associé ces pièces pour composer une tenue complète. Cochez celles qui vous plaisent et ajoutez-les en une fois.
              </p>
            </div>
            <LookBuilder products={[product, ...related]} title="Ajouter la sélection au panier" />
          </div>
        </section>
      )}

      <section id="avis" className="section" aria-labelledby="reviews-title">
        <div className={`container ${styles.reviews}`}>
          <div className={styles.reviewSummary}>
            <h2 id="reviews-title">Avis clients</h2>
            <p className={styles.reviewScore}>
              <span>{product.rating.toLocaleString("fr-FR")}</span>/5
            </p>
            <Rating value={product.rating} count={product.reviewCount} size={16} />
            <ul role="list" className={styles.distribution} aria-label="Répartition des notes">
              {distribution.map((d) => (
                <li key={d.stars}>
                  <span className={styles.stars}>
                    {d.stars} <Star size={11} fill="currentColor" strokeWidth={0} aria-label="étoiles" />
                  </span>
                  <span className={styles.bar} aria-hidden>
                    <span style={{ width: `${(d.count / product.reviewCount) * 100}%` }} />
                  </span>
                  <span className="tabular">{d.count}</span>
                </li>
              ))}
            </ul>
            <p className={styles.reviewNote}>Avis collectés après achat. Seuls les clients ayant reçu leur commande peuvent noter un produit.</p>
          </div>
          <ul role="list" className={styles.reviewList}>
            {reviews.map((r) => (
              <li key={r.id} className={styles.review}>
                <Rating value={r.rating} showValue={false} />
                <h3>{r.title}</h3>
                <p>{r.body}</p>
                <p className={styles.reviewMeta}>
                  <strong>{r.author}</strong>, {r.city} · <time dateTime={r.date}>{formatDate(r.date)}</time>
                  {r.verified && (
                    <span className={styles.verified}>
                      <BadgeCheck size={14} aria-hidden /> Achat vérifié
                    </span>
                  )}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {similar.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }} aria-labelledby="similar-title">
          <div className="container">
            <ProductCarousel
              label="Vous aimerez aussi"
              header={
                <SectionHeader
                  id="similar-title"
                  eyebrow={category.name}
                  title="Vous aimerez aussi"
                  action={<ArrowLink href={`/category/${category.slug}`}>Voir la catégorie</ArrowLink>}
                />
              }
            >
              {similar.map((p) => (
                <CarouselItem key={p.slug}>
                  <ProductCard product={p} sizes="(min-width: 1200px) 18vw, (min-width: 900px) 23vw, (min-width: 600px) 40vw, 68vw" />
                </CarouselItem>
              ))}
            </ProductCarousel>
          </div>
        </section>
      )}

      <RecentlyViewedTracker slug={product.slug} />
      <JsonLd
        data={[
          productJsonLd(product, reviews),
          breadcrumbJsonLd([
            { name: "Boutique", path: "/shop" },
            { name: category.name, path: `/category/${category.slug}` },
            { name: product.name, path: `/product/${product.slug}` },
          ]),
        ]}
      />
    </>
  );
}
