"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { ProductImage } from "@/types";
import styles from "./ProductGallery.module.css";

export function ProductGallery({ images, name }: { images: ProductImage[]; name: string }) {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const goTo = (index: number) => {
    setActive(index);
    const track = trackRef.current;
    if (track) track.scrollTo({ left: index * track.clientWidth, behavior: "smooth" });
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const index = Math.round(track.scrollLeft / track.clientWidth);
    if (index !== active) setActive(index);
  };

  return (
    <div className={`${styles.gallery} ${images.length < 2 ? styles.single : ""}`}>
      {images.length > 1 && (
        <ul role="list" className={styles.thumbs} aria-label={`Photos de ${name}`}>
          {images.map((img, i) => (
            <li key={img.src}>
              <button type="button" className={styles.thumb} aria-current={i === active} aria-label={`Afficher la photo ${i + 1}`} onClick={() => goTo(i)}>
                <Image src={img.src} alt="" fill sizes="80px" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className={styles.stage}>
        <div ref={trackRef} className={styles.track} onScroll={onScroll} tabIndex={0} aria-label={`Galerie photo de ${name}`}>
          {images.map((img, i) => (
            <div key={img.src} className={styles.slide} aria-hidden={i !== active}>
              <Image src={img.src} alt={img.alt} fill priority={i === 0} sizes="(min-width: 900px) 50vw, 100vw" className={styles.image} />
            </div>
          ))}
        </div>
        {images.length > 1 && (
          <div className={styles.dots} aria-hidden>
            {images.map((img, i) => (
              <span key={img.src} data-active={i === active} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
