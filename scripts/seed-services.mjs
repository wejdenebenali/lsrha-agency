// Ce script transfère automatiquement les 9 services dans Sanity.
// À lancer une seule fois, depuis ta machine (pas depuis Claude), avec :
//   node scripts/seed-services.mjs
//
// Il lit les identifiants dans .env.local, donc pas besoin de les retaper.

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Charge .env.local manuellement (pas de dépendance dotenv nécessaire)
const envPath = path.join(__dirname, "..", ".env.local");
const envContent = readFileSync(envPath, "utf-8");
const env = {};
for (const line of envContent.split("\n")) {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) env[match[1].trim()] = match[2].trim();
}

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-01-01",
  token: env.SANITY_API_TOKEN,
  useCdn: false,
});

const services = [
  {
    order: 1,
    number: "01",
    title: "Stratégie Marketing",
    subtitle: "Penser juste. Agir efficacement.",
    description:
      "Nous concevons des stratégies marketing sur mesure qui permettent à votre entreprise d'atteindre ses objectifs, de renforcer son positionnement, d'identifier de nouvelles opportunités et de générer une croissance durable.",
    features: [
      "Audit marketing",
      "Études de marché",
      "Analyse concurrentielle",
      "Positionnement",
      "Plan marketing",
    ],
    imagePath: "public/images/services/strategie-digitale.png",
    alt: "Illustration de stratégie marketing",
  },
  {
    order: 2,
    number: "02",
    title: "Branding",
    subtitle: "Une identité qui marque les esprits.",
    description:
      "Nous construisons une identité de marque forte et cohérente en définissant votre positionnement, vos valeurs, votre identité visuelle et votre proposition de valeur afin de vous démarquer durablement sur votre marché.",
    features: ["Création d'identité visuelle", "Charte graphique"],
    imagePath: "public/images/services/branding.png",
    alt: "Illustration de branding",
  },
  {
    order: 3,
    number: "03",
    title: "Communication",
    subtitle: "Le bon message, au bon moment.",
    description:
      "Nous développons des stratégies de communication efficaces pour transmettre le bon message, au bon public et au bon moment, tout en renforçant la notoriété et la crédibilité de votre marque.",
    features: [
      "Stratégie de communication",
      "Création de concepts publicitaires",
      "Communication digitale et offline",
      "Planification des campagnes de communication",
    ],
    imagePath: "public/images/services/communication.png",
    alt: "Illustration de communication",
  },
  {
    order: 4,
    number: "04",
    title: "Création de Contenu & Design",
    subtitle: "Créer. Captiver. Engager.",
    description:
      "Nous concevons des contenus créatifs et des supports visuels percutants qui reflètent l'identité de votre marque et captivent votre audience sur tous les canaux de communication.",
    features: [
      "Création de contenus visuels et graphiques",
      "Design publicitaire et supports marketing",
      "Production photo et vidéo",
      "Création de contenus pour réseaux sociaux",
    ],
    imagePath: "public/images/services/creation-contenu.png",
    alt: "Illustration de création de contenu et design",
  },
  {
    order: 5,
    number: "05",
    title: "Marketing Digital & Publicité",
    subtitle: "Être visible. Être choisi.",
    description:
      "Nous mettons en œuvre des campagnes marketing performantes à travers les canaux digitaux et traditionnels afin d'accroître votre visibilité, d'attirer de nouveaux clients et de maximiser votre retour sur investissement.",
    features: [
      "Gestion des réseaux sociaux",
      "Publicité en ligne (Meta Ads, Google Ads)",
      "Référencement SEO & SEA",
      "Email marketing et acquisition digitale",
    ],
    imagePath: "public/images/services/marketing-digital-publicite.png",
    alt: "Illustration de marketing digital et publicité",
  },
  {
    order: 6,
    number: "06",
    title: "Développement Web",
    subtitle: "Des expériences digitales modernes.",
    description:
      "Nous créons des sites web modernes, performants et adaptés à vos objectifs pour offrir une expérience utilisateur optimale, renforcer votre présence et soutenir le développement de votre activité.",
    features: [
      "Création de sites web professionnels",
      "Développement de sites e-commerce",
      "Optimisation de l'expérience utilisateur (UX/UI)",
      "Maintenance et amélioration continue",
    ],
    imagePath: "public/images/services/developpement-web.png",
    alt: "Illustration de développement web",
  },
  {
    order: 7,
    number: "07",
    title: "Automatisation & Intelligence Artificielle",
    subtitle: "Optimiser chaque interaction.",
    description:
      "Nous intégrons des solutions d'automatisation et d'intelligence artificielle pour optimiser vos processus marketing, améliorer l'expérience client et accroître l'efficacité de vos opérations.",
    features: ["Marketing automation", "Chatbots et assistants intelligents"],
    imagePath: "public/images/services/automatisation-ia.png",
    alt: "Illustration d'automatisation et intelligence artificielle",
  },
  {
    order: 8,
    number: "08",
    title: "Analyse de Données & Performance",
    subtitle: "Mesurer pour progresser.",
    description:
      "Nous analysons les performances de vos actions marketing à l'aide d'indicateurs clés afin d'identifier les opportunités d'amélioration, d'optimiser vos investissements et de favoriser une croissance durable.",
    features: [
      "Analyse des indicateurs de performance (KPI)",
      "Reporting et tableaux de bord",
      "Analyse du comportement client",
      "Optimisation des campagnes marketing",
    ],
    imagePath: "public/images/services/analyse-donnees-performance.png",
    alt: "Illustration d'analyse de données et performance",
  },
  {
    order: 9,
    number: "09",
    title: "Conseil & Accompagnement",
    subtitle: "Un partenaire à chaque étape.",
    description:
      "Nous accompagnons les entreprises dans leurs décisions stratégiques en apportant une expertise marketing globale, des recommandations personnalisées et un suivi continu pour assurer leur développement.",
    features: [
      "Analyse des tendances consommateurs",
      "Études de satisfaction client",
    ],
    imagePath: "public/images/services/conseil-accompagnement.png",
    alt: "Illustration de conseil et accompagnement",
  },
];

async function uploadImage(imagePath) {
  const fullPath = path.join(__dirname, "..", imagePath);
  const buffer = readFileSync(fullPath);
  const asset = await client.assets.upload("image", buffer, {
    filename: path.basename(imagePath),
  });
  return asset._id;
}

async function seed() {
  console.log(`Transfert de ${services.length} services vers Sanity...\n`);

  for (const service of services) {
    console.log(`→ ${service.title}`);

    const imageAssetId = await uploadImage(service.imagePath);

    await client.createOrReplace({
      _id: `service-${service.order}`,
      _type: "service",
      order: service.order,
      number: service.number,
      title: service.title,
      subtitle: service.subtitle,
      description: service.description,
      features: service.features,
      alt: service.alt,
      image: {
        _type: "image",
        asset: { _type: "reference", _ref: imageAssetId },
      },
    });

    console.log(`  ✓ envoyé\n`);
  }

  console.log("Terminé ! Va voir dans le Studio Sanity pour vérifier.");
}

seed().catch((error) => {
  console.error("Erreur pendant le transfert :", error.message);
  process.exit(1);
});
