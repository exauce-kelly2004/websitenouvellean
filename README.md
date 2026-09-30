# Maison Aube — « La première impression de l'année »

Site e-commerce **front-end** multi-pages (Next.js 16 · App Router · React 19 · TypeScript · CSS Modules) pour une campagne de Nouvel An.
Aucun backend : catalogue local, panier, favoris et « vus récemment » dans le `localStorage`, commande simulée.

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run build && npm start
```

Node 20.9+ requis.

## Déployer (Vercel)

1. Pousser le dépôt sur GitHub puis « Import Project » dans Vercel (aucune configuration).
2. Facultatif : définir `NEXT_PUBLIC_SITE_URL` (ex. `https://www.maison-aube.fr`) pour les URLs canoniques, le sitemap et l'Open Graph.
   Sans elle, `https://maison-aube.vercel.app` est utilisé.

Aucun secret, aucune API externe. Les images sont servies depuis `public/images` et optimisées par `next/image`.

## Pages

| Route | Rôle |
| --- | --- |
| `/` | Accueil éditorial et commercial (porte d'entrée) |
| `/shop` | Boutique complète — filtres, tri, chargement progressif |
| `/category/[slug]` | 11 catégories avec texte d'introduction et conseils |
| `/collections/[slug]` | 4 collections (La Nuit du 31, Le Premier Janvier, Vestiaire homme, Meilleures ventes) |
| `/product/[slug]` | 41 fiches produit : galerie, variantes, stock, look complet, avis |
| `/search` | Résultats de recherche (non indexée) |
| `/new`, `/sale`, `/gifts` | Nouveautés, promotions (code MINUIT), guide des cadeaux |
| `/favorites`, `/cart`, `/checkout`, `/checkout/confirmation` | Parcours d'achat (non indexé) |
| `/about`, `/contact`, `/shipping-returns`, `/privacy`, `/terms` | Pages d'information |

Les filtres sont reflétés dans l'URL (`/shop?cat=robes&couleur=Noir&tri=prix-croissant`) : les listes filtrées sont partageables.

Codes promo de démonstration : `MINUIT` (−15 % dès 100 €) et `BIENVENUE10` (−10 %).

## Architecture

```
app/         routes, metadata, sitemap.ts, robots.ts, 404/erreur
components/  ui/ (design system), layout/, product/, catalog/, cart/, home/, providers/
data/        catalogue, catégories, collections, avis, configuration du site
lib/         catalog (recherche/filtres/tri), pricing (totaux), store (localStorage), seo (JSON-LD)
types/       types partagés
styles/      tokens.css (design tokens), globals.css
public/      images produits et éditoriales
```

Voir [DESIGN.md](./DESIGN.md) pour le design system.

## Crédits

Photographies : Unsplash (licence Unsplash), téléchargées localement et recadrées. Marques, produits, prix, avis et stocks sont fictifs.
