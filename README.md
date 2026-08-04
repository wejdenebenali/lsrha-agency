# LSRHA Agency — Site web (Next.js + Tailwind CSS)

## Comment lancer le projet sur votre ordinateur

### 1. Prérequis
Node.js doit être installé (vous l'avez déjà, version 22.22.1 ✅).

### 2. Installer les dépendances
Ouvrez un terminal (invite de commande) dans ce dossier, puis tapez :

```
npm install
```

Attendez que ça se termine (peut prendre 1-2 minutes).

### 3. Lancer le site en local

```
npm run dev
```

Puis ouvrez votre navigateur à l'adresse : **http://localhost:3000**

Le site se met à jour automatiquement à chaque modification de code.

### 4. Construire la version finale (avant mise en ligne)

```
npm run build
npm run start
```

## Structure du projet

```
app/
  page.js              → Page d'accueil
  layout.js            → Structure commune (Header + Footer sur toutes les pages)
  globals.css          → Styles globaux
  services/page.js     → Page Services
  a-propos/page.js     → Page À propos
  realisations/page.js → Page Réalisations / Portfolio
  blog/page.js         → Page Blog
  contact/page.js      → Page Contact

components/
  Header.jsx           → Menu de navigation
  Footer.jsx           → Pied de page
  Hero.jsx             → Section hero (accueil)
  TrustBand.jsx        → Bandeau logos
  Services.jsx         → Cartes de services
  Stats.jsx            → Statistiques
  Portfolio.jsx        → Grille de projets avec filtres
  Testimonials.jsx     → Témoignages clients
  Blog.jsx             → Articles de blog
  Contact.jsx          → Formulaire de contact

public/
  lsrha-logo-transparent.png → Le logo
```

## Ce qu'il reste à faire

- Remplacer les logos "Ils nous font confiance" (Oppo, Samsung...) par vos vrais partenaires/clients, ou les retirer
- Remplacer les 4 projets "VISUEL À VENIR" dans Portfolio.jsx par vos vrais projets (avec photos)
- Remplacer les témoignages (Sarah K., Yassine B., Amira D.) par de vrais avis clients quand vous en aurez
- Rédiger le contenu complet des 3 articles de blog (actuellement juste les titres)
- Rendre le formulaire de contact fonctionnel (actuellement juste visuel — nécessite un service comme Formspree, ou une route API Next.js)
- Ajouter les vrais liens réseaux sociaux dans le Footer

## Mettre le site en ligne

Ce projet peut être déployé gratuitement sur **Vercel** (créé par les créateurs de Next.js) :
1. Créez un compte sur vercel.com
2. Importez ce projet (via GitHub, ou glisser-déposer le dossier)
3. Vercel s'occupe de tout le reste automatiquement

Vous pourrez ensuite connecter votre nom de domaine (lsrha-agency.tn) une fois réservé.

## Note sécurité

Le projet utilise Next.js 14.2.35, une version corrigée des failles de sécurité connues. Pensez à vérifier régulièrement les mises à jour avec `npm outdated` avant la mise en ligne finale.
