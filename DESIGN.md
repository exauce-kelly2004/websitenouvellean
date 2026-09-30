# Design system — Maison Aube

## 1. Méthode

Sources : cahier des charges V2, capture de structure fournie, et bibliothèque `awesome-design-md` (73 design systems).
Références étudiées en détail, et ce qui a été retenu de chacune — **des principes, jamais une copie** :

| Référence | Principe retenu |
| --- | --- |
| Nike (commerce) | Photo produit sur fond neutre qui fait office de « studio », cartes sans ombre ni padding, prix barré rouge comme seule couleur commerciale, rythme vertical constant |
| Ferrari / Bugatti (luxe) | Titres en graisse moyenne (jamais gras), CTA en capitales espacées, angles vifs, profondeur portée par la photographie |
| Mastercard / Claude (éditorial chaud) | Fond ivoire plutôt que blanc, encre noire chaude, capitales réservées aux eyebrows |
| Superhuman / Resend | Fond nuit pour les moments forts, serif d'affichage face à une sans-serif fonctionnelle |
| Wired | « Serif pour le récit, sans-serif pour la structure » |
| Apple / Meta | Fiche produit en deux colonnes (galerie + colonne d'achat collante), une seule action principale par écran |

## 2. Identité

**Concept** : l'aube, la première lumière de l'année. Le Nouvel An passe par la lumière et l'atmosphère — lueur ambrée, bandes de nuit, fond ivoire — et non par des confettis ou du doré.

## 3. Tokens (`styles/tokens.css`)

- **Couleurs** : ivoire `#f8f5f0` (fond), scène produit `#efe9e0`, encre `#17140f`, nuit `#13161f` (sections fortes et footer), **un seul accent** ambre `#97562b` (eyebrows, indicateur actif, progression), lueur `#d8b88c` réservée aux fonds nuit, rouge promo `#a3261e` réservé aux prix.
- **Typographie** : **Inter Tight**, équivalent libre le plus proche de la grotesque de la capture de référence (esprit Helvetica Now / Neue Haas). Titres en 500 avec un interlettrage de −0,03em, interface en 400 à 600.
- **Espacements** : base 4 px (4 → 128 px), rythme de section `clamp(56px → 112px)`.
- **Grille** : conteneur 1440 px, gouttière fluide 16 → 56 px, colonnes 2 / 3 / 4 selon la largeur.
- **Points de rupture** : 600, 900, 1000 (catalogue), 1100 (navigation), 1200.
- **Formes** : 0 px (images, cartes), 2 px (boutons, champs), arrondi complet (icônes, puces, pastilles). Ombres réservées aux calques (drawers, toasts, cartes flottantes).
- **Mouvement** : 150 / 240 / 420 ms, easing `cubic-bezier(.22,1,.36,1)`, désactivé si `prefers-reduced-motion`.

## 4. Composants (`components/ui`, `components/product`)

Button (primaire, secondaire, clair, clair-contour, accent, ghost · 3 tailles · état chargement), IconButton / IconLink avec compteur, Badge (nouveau, promo, édition limitée, dernières pièces), Rating, Price, Swatch, champs (texte, zone de texte, liste, case à cocher) avec erreurs accessibles, Drawer (droite, gauche, haut, bas, modale — focus piégé, Échap, verrouillage du défilement), Toaster, Skeleton, EmptyState, Breadcrumbs, PageHeader, QuantityStepper, Accordion, Alert, ProductCard (seconde image au survol, ajout rapide avec taille), ProductCarousel, ProductGrid, LookBuilder (cross-selling).

Icônes : **Lucide** exclusivement, trait 1,4 à 1,75.

## 5. Structure de la capture → implémentation

| Capture | Implémentation |
| --- | --- |
| Bandeau 3 messages | AnnouncementBar (3 messages sur desktop, rotation sur mobile) |
| Logo · navigation centrée · icônes | Header collant, méga-menu Catégories, menu mobile en drawer |
| Héros texte / image + produits flottants | Héros éditorial, 3 cartes produits cliquables sur l'image |
| 4 réassurances | Réassurance « service » |
| 6 catégories | 6 tuiles vers `/category/*` |
| Nouveautés en carrousel | ProductCarousel (flèches, défilement tactile) |
| 3 meilleures ventes horizontales | Cartes horizontales avec ajout direct |
| Vente flash + nouvelle collection | « Avant minuit » (compte à rebours jusqu'au 1er janvier, code MINUIT) + collection Le Premier Janvier |
| 4 engagements | Réassurance « marque » |

**Améliorations assumées** : le carrousel du héros est remplacé par un visuel unique (les carrousels de héros diluent le message et le LCP) ; l'icône « compte » est retirée, faute d'authentification réelle, plutôt que de mener nulle part ; le cahier des charges impose en plus les sections look complet, cadeaux et avis, placées entre les bannières et la réassurance finale ; la newsletter est intégrée au footer, donc présente sur toutes les pages.

## 6. Accessibilité et performance

Lien d'évitement, un seul H1 par page, focus visible, cibles tactiles de 40 à 48 px, contrastes AA, `aria-live` pour les compteurs et les toasts. Images locales via `next/image` avec `sizes` adaptés, héros en `priority`, polices `next/font` (auto-hébergées, `swap`), composants client limités aux îlots interactifs.
