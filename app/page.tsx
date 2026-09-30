import type { Metadata } from "next";
import { HomeSeo } from "@/components/home/HomeSeo";
import { NewsletterBand } from "@/components/home/NewsletterBand";
import { Chapters } from "@/components/lunar/Chapters";
import { CityLights } from "@/components/lunar/CityLights";
import { CityPrepares } from "@/components/lunar/CityPrepares";
import { GiftGesture } from "@/components/lunar/GiftGesture";
import { LanternChooser } from "@/components/lunar/LanternChooser";
import { LunarHero } from "@/components/lunar/LunarHero";
import { NewYearEdit } from "@/components/lunar/NewYearEdit";
import { pageMetadata } from "@/lib/seo";

const title = "Nouvel An chinois : tenues rouges, bijoux et cadeaux | Maison Aube";

export const metadata: Metadata = {
  ...pageMetadata({
    title,
    description:
      "Robes rouges, bijoux dorés, escarpins et idées cadeaux pour le Nouvel An chinois, livrés avant le 6 février dans un écrin laqué offert. Livraison offerte dès 150 €, retours gratuits.",
    path: "/",
    image: { src: "/images/nouvel-an/rue-lanternes.jpg", alt: "Rue illuminée de lanternes rouges la nuit" },
  }),
  title: { absolute: title },
};

/**
 * Accueil — « La nuit avant l'An neuf » : une promenade en cinq temps,
 * de l'immersion (la rue) vers la sélection (les produits).
 */
export default function HomePage() {
  return (
    <>
      <LunarHero />
      <CityPrepares />
      <Chapters />
      <LanternChooser />
      <CityLights />
      <GiftGesture />
      <NewYearEdit />
      <HomeSeo />
      <NewsletterBand />
    </>
  );
}
