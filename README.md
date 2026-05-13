# Velori Site — Next.js Clone Multi-Locale

Site e-commerce bijoux/montres. Un repo, une variable d'environnement `SITE_LOCALE` = une langue.

## Structure

```
src/
├── app/
│   ├── layout.tsx                    # Root layout (thème, panier, header/footer)
│   ├── page.tsx                      # Accueil (hero + favoris + bannière)
│   ├── catalogue/page.tsx            # Catalogue avec filtres et pagination
│   ├── [slug]/
│   │   ├── page.tsx                  # Page produit (metadata)
│   │   └── ProductDetail.tsx         # Galerie + variantes + add-to-cart (client)
│   ├── panier/page.tsx               # Panier + checkout Stripe
│   ├── commande/succes/page.tsx      # Confirmation commande
│   ├── cgv/page.tsx                  # Conditions Générales de Vente
│   ├── mentions-legales/page.tsx     # Mentions légales
│   ├── politique-confidentialite/    # RGPD
│   ├── sitemap.xml/route.ts          # Sitemap dynamique
│   └── api/revalidate/route.ts       # ISR webhook (appelé par le CMS)
├── components/
│   ├── CartContext.tsx               # Panier global (useReducer + localStorage)
│   ├── Header.tsx                    # Navigation sticky
│   ├── Footer.tsx                    # Footer avec liens légaux
│   ├── CookieBanner.tsx              # Consentement RGPD
│   └── ProductCard.tsx               # Carte produit (image + titre + prix)
├── lib/
│   └── cms.ts                        # Fetch Payload REST (produits, catégories, config)
└── styles/
    ├── globals.css                   # CSS global (variables, layout, composants)
    └── themes/
        ├── elegant.css               # Thème luxe (Cormorant Garamond, or champagne)
        └── minimal.css               # Thème épuré (Inter, noir & blanc)
```

## Variables d'environnement par déploiement

| Variable | FR | DE | EN |
|---|---|---|---|
| `SITE_LOCALE` | `fr` | `de` | `en` |
| `THEME_KEY` | `elegant` | `minimal` | `elegant` |
| `NEXT_PUBLIC_SITE_DOMAIN` | `fr.zojewel.com` | `de.zojewel.com` | `zojewel.com` |
| `REVALIDATE_SECRET` | (= SiteConfigs.fr.revalidateSecret) | idem | idem |
| `CMS_URL` | `https://cms.zojewel.com` | idem | idem |

## Déploiement multi-locale (Coolify)

Chaque langue = une application Coolify séparée, même repo GitHub :

```
Repo GitHub: github.com/your-org/velori-site
  ↓
App Coolify "site-fr"  → SITE_LOCALE=fr  → fr.zojewel.com
App Coolify "site-de"  → SITE_LOCALE=de  → de.zojewel.com
App Coolify "site-en"  → SITE_LOCALE=en  → zojewel.com
...20 apps au total
```

### Dockerfile (à créer)

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
ENV PORT=3000
EXPOSE 3000
CMD ["pnpm", "start"]
```

## ISR — Revalidation

Quand un produit est publié dans le CMS, le hook `notifySites` envoie :

```
POST https://{domain}/api/revalidate
x-revalidate-secret: {secret}
{ productId, slug, locale }
```

Le site revalide `/`, `/catalogue`, et `/{slug}` via `revalidatePath`.

## Flux de paiement

```
Client → /panier → "Checkout" → POST cms.zojewel.com/api/checkout
                                         ↓
                              Session Stripe Checkout créée
                                         ↓
                              Redirect page.stripe.com/...
                                         ↓
                              Paiement OK → webhook → commande CMS
                                         ↓
                              Redirect → /commande/succes
```

## Installation locale

```bash
cp .env.example .env.local
# Remplir les variables

pnpm install
pnpm dev
```
