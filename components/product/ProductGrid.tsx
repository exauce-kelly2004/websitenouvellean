import type { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import styles from "./ProductGrid.module.css";

export function ProductGrid({ products, columns = 4, priorityCount = 0 }: { products: Product[]; columns?: 3 | 4; priorityCount?: number }) {
  const sizes = columns === 4 ? "(min-width: 1200px) 22vw, (min-width: 900px) 30vw, 48vw" : "(min-width: 900px) 30vw, 48vw";
  return (
    <ul role="list" className={`${styles.grid} ${columns === 3 ? styles.three : ""}`}>
      {products.map((p, i) => (
        <li key={p.slug}>
          <ProductCard product={p} sizes={sizes} priority={i < priorityCount} />
        </li>
      ))}
    </ul>
  );
}
