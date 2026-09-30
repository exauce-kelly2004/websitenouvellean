import type { Collection, CollectionSlug } from "@/types";

export const collections: Collection[] = [
  {
    slug: "nuit-avant-lan-neuf",
    name: "La Nuit avant l'An neuf",
    eyebrow: "Collection Nouvel An lunaire",
    title: "La Nuit avant l'An neuf — tenues et bijoux du Nouvel An chinois",
    metaDescription:
      "Robes rouges, bijoux dorés, escarpins scintillants et sacs du soir pour célébrer le Nouvel An chinois. Livraison avant le 6 février, écrin laqué offert.",
    intro:
      "Le rouge qui porte chance, l'or qui capte la lumière des lanternes : les pièces pour la dernière nuit avant l'année nouvelle, du dîner en famille jusqu'aux premières heures.",
    story:
      "Nous avons construit cette collection comme une promenade nocturne : la rue qui s'illumine, le dîner de famille, les cadeaux échangés, puis minuit. Chaque pièce se combine avec les autres, et chacune se reporte bien après la fête.",
    image: { src: "/images/nouvel-an/lanterne-rue.jpg", alt: "Lanterne rouge suspendue au-dessus d'une rue de nuit" },
  },
  {
    slug: "le-premier-janvier",
    name: "Le Premier Matin",
    eyebrow: "Collection lendemain",
    title: "Le Premier Janvier — l'élégance du lendemain",
    metaDescription:
      "Manteaux longs, maille douce, pantalons fluides et lunettes de soleil : la collection du 1er janvier pour commencer l'année avec allure et confort.",
    intro:
      "Le premier matin de l'année mérite autant d'attention que la veille. Manteau camel, pantalon fluide, pull en cachemire : l'élégance qui ne se force pas.",
    story:
      "Promenade sur les quais, brunch tardif, premières résolutions : des matières douces, des couleurs d'aube — camel, poudre, ivoire — et des pièces qui se portent toute la saison.",
    image: { src: "/images/editorial/manteau.jpg", alt: "Femme en manteau camel long dans une rue parisienne" },
  },
  {
    slug: "vestiaire-homme",
    name: "Vestiaire homme",
    eyebrow: "Pour lui",
    title: "Vestiaire homme — costumes, chemises et accessoires",
    metaDescription:
      "Veste de costume bleu nuit, chemise col italien, derbies cognac, montres et cravates en soie : le vestiaire homme du Nouvel An et les idées cadeaux pour lui.",
    intro:
      "Un costume bleu nuit bien coupé, une chemise impeccable et des accessoires choisis : l'essentiel pour le réveillon et pour toute l'année.",
    story:
      "Notre vestiaire homme est court par choix. Une veste bleu nuit plutôt que noire — plus douce à la lumière artificielle —, une chemise en popeline repassée, des derbies cousues main. Le reste est affaire de détails : une cravate en soie, une montre, un portefeuille qui vieillit bien.",
    image: { src: "/images/editorial/homme.jpg", alt: "Homme boutonnant une veste de costume bleu nuit" },
  },
  {
    slug: "meilleures-ventes",
    name: "Meilleures ventes",
    eyebrow: "Les plus aimés",
    title: "Meilleures ventes — les pièces préférées de nos clientes et clients",
    metaDescription:
      "Les meilleures ventes Maison Aube : les robes, escarpins, bijoux et accessoires les plus commandés et les mieux notés cette saison.",
    intro:
      "Les pièces les plus commandées et les mieux notées de la saison. Une valeur sûre quand on veut viser juste — pour soi ou pour offrir.",
    story:
      "Cette sélection se met à jour chaque semaine selon les commandes et les avis vérifiés. Les tailles partent vite en décembre : nous indiquons le stock restant sur chaque fiche.",
    image: { src: "/images/editorial/boutique.jpg", alt: "Portants de vêtements dans la boutique Maison Aube éclairée le soir" },
  },
];

export const collectionMap = Object.fromEntries(collections.map((c) => [c.slug, c])) as Record<CollectionSlug, Collection>;
