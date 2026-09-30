import type { CategorySlug } from "@/types";

/** Arguments de vente orientés bénéfice client, par catégorie. */
export const sellingPoints: Record<CategorySlug, string[]> = {
  robes: [
    "Une coupe qui tient toute la nuit, du dîner jusqu'à minuit",
    "Matière épaisse qui ne marque pas et ne se froisse pas",
    "Se reporte après les fêtes : mariage, anniversaire, gala",
  ],
  "vestes-blazers": [
    "Transforme instantanément une tenue simple en tenue de soirée",
    "Laine choisie pour sa tenue : elle garde sa ligne des années",
    "Se porte le 31 au soir comme au bureau en janvier",
  ],
  "tops-chemises": [
    "La pièce la plus facile à associer de votre garde-robe",
    "Tombé impeccable, même après des heures assis(e)",
    "Du dîner du 31 au brunch du 1er janvier",
  ],
  pantalons: [
    "L'allure d'une robe, le confort pour danser jusqu'au matin",
    "Allonge la silhouette avec des talons comme à plat",
    "Ourlet retouché gratuitement en boutique",
  ],
  chaussures: [
    "Semelle rembourrée : pensée pour tenir jusqu'au petit matin",
    "Talon stable, testé sur des soirées entières",
    "Échange de pointure gratuit jusqu'au 31 janvier",
  ],
  sacs: [
    "Juste assez grand pour l'essentiel : téléphone, clés, rouge à lèvres",
    "Cuir et finitions faits pour durer bien après le réveillon",
    "Livré dans son écrin : parfait à offrir",
  ],
  bijoux: [
    "Capte la lumière des bougies et des flashs de minuit",
    "Sans nickel, léger : se porte toute la soirée sans y penser",
    "Livré en écrin, prêt à offrir — le cadeau le plus sûr",
  ],
  montres: [
    "Le symbole parfait de la nouvelle année qui commence",
    "Mouvement japonais fiable, garanti deux ans",
    "Bracelet ajusté gratuitement en boutique",
  ],
  "beaute-parfums": [
    "La touche finale qu'on remarque en se penchant pour la bise",
    "Tenue de six à huit heures : de l'apéritif à minuit",
    "Livré dans son étui, idéal à glisser sous le sapin",
  ],
  accessoires: [
    "Aucune taille à deviner : le cadeau qui tombe toujours juste",
    "Matières nobles qui se patinent avec le temps",
    "Livré en boîte cadeau, avec votre message manuscrit",
  ],
  "coffrets-cadeaux": [
    "La personne choisit elle-même : zéro risque de se tromper",
    "Envoi immédiat par e-mail, même le 31 décembre au soir",
    "Valable un an, en ligne et en boutique",
  ],
};
