import type { Category, CategorySlug } from "@/types";

export const categories: Category[] = [
  {
    slug: "robes",
    name: "Robes",
    shortName: "Robes",
    title: "Robes de soirée pour le Nouvel An",
    metaDescription:
      "Robes de soirée pour le Nouvel An : robe drapée, robe longue en tulle, robe pailletée ou dentelle. Tailles 34 à 46, livraison offerte dès 150 €.",
    intro:
      "Une robe choisie pour le 31 décembre se porte rarement une seule fois. Nous avons sélectionné des coupes qui tiennent la soirée entière — assise au dîner comme sur la piste — dans des matières qui accrochent la lumière sans l'imiter : jersey épais, tulle brodé, dentelle, paillettes cousues main.",
    guide: [
      {
        heading: "Choisir sa longueur",
        body: "La robe longue s'impose pour un dîner placé ou une réception. Pour une soirée debout ou une fête chez des amis, une longueur genou ou un ensemble court laisse plus de liberté de mouvement.",
      },
      {
        heading: "Trouver sa taille",
        body: "Nos robes taillent normalement. Entre deux tailles, prenez la plus grande pour les coupes ajustées (Aurore, Minuit) et votre taille habituelle pour les coupes fluides.",
      },
    ],
    image: { src: "/images/products/robe-rubis.jpg", alt: "Robe longue bordeaux en tulle brodé portée en studio" },
  },
  {
    slug: "vestes-blazers",
    name: "Vestes & blazers",
    shortName: "Vestes",
    title: "Vestes, blazers et manteaux",
    metaDescription:
      "Blazers croisés, manteaux en laine et vestes de costume pour femme et homme. Des pièces structurées pour le réveillon et tout l'hiver.",
    intro:
      "La veste est la pièce qui transforme une tenue simple en tenue de soirée. Blazer croisé sur un top en voile, manteau long sur une robe du soir, veste de costume bleu nuit : des coupes nettes, des laines choisies pour leur tenue, pensées pour durer bien après janvier.",
    guide: [
      {
        heading: "Blazer ou manteau ?",
        body: "Le blazer se garde toute la soirée ; le manteau se choisit pour le trajet et la première impression à l'arrivée. Les deux se combinent très bien sur une robe fluide.",
      },
      {
        heading: "Entretien",
        body: "Brossez vos pièces en laine après chaque port et faites-les nettoyer à sec une à deux fois par saison seulement.",
      },
    ],
    image: { src: "/images/products/blazer-pied-de-poule.jpg", alt: "Blazer croisé gris à motif prince-de-galles porté ouvert" },
  },
  {
    slug: "tops-chemises",
    name: "Tops & chemises",
    shortName: "Tops",
    title: "Tops, chemises et mailles",
    metaDescription:
      "Top en voile, chemise à lavallière, chemise en popeline et pull en cachemire : les hauts habillés pour le Nouvel An, pour elle et pour lui.",
    intro:
      "Un beau haut suffit souvent à faire une tenue : il se porte avec un pantalon large, une jupe ou sous un blazer. Voile transparent, lavallière nouée, popeline impeccable ou cachemire doux — des pièces qui passent du dîner du 31 au déjeuner du 1er.",
    guide: [
      {
        heading: "Associer",
        body: "Un top en voile noir se porte avec un pantalon fluide et des créoles dorées ; la chemise à lavallière s'associe à un pantalon droit et des escarpins.",
      },
    ],
    image: { src: "/images/products/top-voile.jpg", alt: "Femme portant un top en voile noir sur fond sombre" },
  },
  {
    slug: "pantalons",
    name: "Pantalons & combinaisons",
    shortName: "Pantalons",
    title: "Pantalons et combinaisons habillés",
    metaDescription:
      "Pantalons larges, pantalons fluides et combinaisons dos nu pour une tenue de fête élégante et confortable. Livraison offerte dès 150 €.",
    intro:
      "Le pantalon de soirée est une évidence pour celles qui veulent danser jusqu'au matin. Jambes larges, tissus fluides qui bougent avec vous, combinaison à décolleté dos nu : l'allure d'une robe, le confort en plus.",
    guide: [
      {
        heading: "La bonne longueur",
        body: "Un pantalon large se choisit pour tomber juste au-dessus du sol avec vos talons. Nos retouches d'ourlet sont offertes en boutique.",
      },
    ],
    image: { src: "/images/products/combinaison-sarcelle.jpg", alt: "Combinaison dos nu bleu sarcelle portée en extérieur" },
  },
  {
    slug: "chaussures",
    name: "Chaussures",
    shortName: "Chaussures",
    title: "Escarpins et chaussures de soirée confortables",
    metaDescription:
      "Escarpins en satin, en velours ou ornés de strass, derbies en cuir pour homme : les chaussures de soirée pour réussir votre réveillon.",
    intro:
      "Les chaussures sont souvent le dernier choix — et celui qu'on regarde le plus. Nos escarpins ont un talon de 8,5 cm, une semelle intérieure rembourrée et une cambrure étudiée pour tenir la nuit. Pour lui, des derbies en cuir cognac cousues à la main.",
    guide: [
      {
        heading: "Pointures",
        body: "Nos escarpins chaussent normalement. Si vous avez le pied large, prenez une demi-pointure au-dessus pour le modèle en satin.",
      },
      {
        heading: "Premier port",
        body: "Portez-les une heure chez vous avant la soirée : le cuir et le satin se détendent légèrement et épousent votre pied.",
      },
    ],
    image: { src: "/images/products/escarpins-cristal.jpg", alt: "Paire d'escarpins ornés de strass posés sur un rebord enneigé" },
  },
  {
    slug: "sacs",
    name: "Sacs",
    shortName: "Sacs",
    title: "Sacs du soir et pochettes de fête",
    metaDescription:
      "Sac du soir effet croco, sac matelassé à chaîne perlée, cabas en cuir noir : les sacs pour sortir le 31 et pour tous les jours.",
    intro:
      "Un sac du soir doit contenir l'essentiel — téléphone, rouge à lèvres, clés — et rien d'autre. Nous avons ajouté deux modèles plus grands pour la journée, en cuir pleine fleur, qui vieilliront avec vous.",
    guide: [
      {
        heading: "Taille et contenu",
        body: "Chaque fiche indique les dimensions exactes et ce que le sac peut contenir, pour choisir sans surprise.",
      },
    ],
    image: { src: "/images/products/sac-croco.jpg", alt: "Sac à main bordeaux effet croco tenu à la main" },
  },
  {
    slug: "bijoux",
    name: "Bijoux",
    shortName: "Bijoux",
    title: "Bijoux de fête : créoles, colliers, bracelets",
    metaDescription:
      "Créoles dorées, collier de perles, bracelet rivière, pendants saphir et bague halo. Bijoux en laiton doré à l'or fin et argent 925, emballage cadeau offert.",
    intro:
      "Un bijou change une tenue en un geste. Nos créations sont réalisées en laiton doré à l'or fin 24 carats ou en argent 925, sans nickel, dans un atelier familial près de Lyon. Chacune est livrée dans son écrin, prête à offrir.",
    guide: [
      {
        heading: "Entretien",
        body: "Retirez vos bijoux avant la douche et le parfum. Rangez-les séparément dans leur pochette pour éviter les rayures.",
      },
    ],
    image: { src: "/images/products/bracelet-riviere.jpg", alt: "Bracelet rivière en cristal brillant sur fond noir" },
  },
  {
    slug: "montres",
    name: "Montres",
    shortName: "Montres",
    title: "Montres à offrir, pour elle et pour lui",
    metaDescription:
      "Montres minimalistes, montre à maille milanaise et montre de gousset : des cadeaux qui marquent le passage à la nouvelle année. Garantie 2 ans.",
    intro:
      "Offrir une montre au Nouvel An, c'est offrir l'année qui commence. Nos modèles ont un mouvement à quartz japonais, un verre minéral traité et une garantie de deux ans. Le bracelet s'ajuste gratuitement en boutique.",
    guide: [
      {
        heading: "Diamètre",
        body: "36 mm pour un poignet fin, 40 mm pour un poignet moyen à large. Chaque fiche précise le diamètre du boîtier.",
      },
    ],
    image: { src: "/images/products/montre-sable.jpg", alt: "Montre au cadran blanc et bracelet sable tenue entre deux doigts" },
  },
  {
    slug: "beaute-parfums",
    name: "Beauté & parfums",
    shortName: "Parfums",
    title: "Parfums et coffrets beauté",
    metaDescription:
      "Eau de parfum Ambre Minuit et coffret teint lumière : les essentiels beauté pour la soirée du Nouvel An et les idées cadeaux.",
    intro:
      "Un parfum se choisit pour la personne qu'on veut être en entrant dans la pièce. Ambre Minuit a été composé à Grasse autour de l'ambre, de la vanille de Madagascar et d'une touche de poivre rose.",
    guide: [
      {
        heading: "Tenue",
        body: "Vaporisez sur les poignets et la nuque, sans frotter. Une eau de parfum tient entre six et huit heures sur la peau.",
      },
    ],
    image: { src: "/images/products/ambre-minuit.jpg", alt: "Flacon de parfum ambré dans une lumière chaude" },
  },
  {
    slug: "accessoires",
    name: "Accessoires",
    shortName: "Accessoires",
    title: "Accessoires : lunettes, cravates, ceintures",
    metaDescription:
      "Lunettes de soleil rondes, cravate en soie, ceinture et portefeuille en cuir : les accessoires qui finissent une tenue et font de beaux cadeaux.",
    intro:
      "Les accessoires sont les cadeaux les plus sûrs : pas de taille à deviner, un usage quotidien. Cuir tanné végétal, soie de Côme, acétate italien — les matières sont choisies pour durer.",
    guide: [
      {
        heading: "Le bon cadeau",
        body: "Hésitation ? La cravate en soie et le portefeuille sont nos cadeaux pour homme les plus offerts en décembre.",
      },
    ],
    image: { src: "/images/products/solaires-or.jpg", alt: "Lunettes de soleil rondes à monture dorée" },
  },
  {
    slug: "coffrets-cadeaux",
    name: "Cartes & coffrets cadeaux",
    shortName: "Coffrets",
    title: "Cartes cadeaux et coffrets",
    metaDescription:
      "Carte cadeau Maison Aube de 50 à 300 € et coffret surprise du Nouvel An : le cadeau idéal quand on hésite. Envoi immédiat par e-mail possible.",
    intro:
      "Quand on hésite, on laisse choisir. La carte cadeau est valable un an sur tout le site et en boutique ; le coffret surprise réunit trois pièces sélectionnées par notre équipe.",
    guide: [
      {
        heading: "Livraison",
        body: "La carte cadeau est envoyée dans un écrin papier sous 24 h, ou par e-mail à la date de votre choix.",
      },
    ],
    image: { src: "/images/products/carte-cadeau.jpg", alt: "Paquets cadeaux noirs noués de rubans dorés" },
  },
];

export const categoryMap = Object.fromEntries(categories.map((c) => [c.slug, c])) as Record<CategorySlug, Category>;

/** Catégories mises en avant sur la page d'accueil (ordre de la capture de référence : 6 tuiles). */
export const featuredCategorySlugs: CategorySlug[] = ["robes", "vestes-blazers", "chaussures", "sacs", "bijoux", "montres"];
