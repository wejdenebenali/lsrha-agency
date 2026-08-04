// Transfère les 6 membres de l'équipe vers Sanity.
// À lancer une seule fois, depuis ta machine, avec :
//   node scripts/seed-team.mjs

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

const teamMembers = [
  {
    order: 1,
    title: "Designer Graphique",
    subtitle: "Créativité & identité visuelle",
    imagePath: "public/images/about/designer.png",
    alt: "Espace de travail d'une designer graphique",
    icon: "Palette",
  },
  {
    order: 2,
    title: "Développeur Web",
    subtitle: "Développement & intégration",
    imagePath: "public/images/about/developpeur.png",
    alt: "Espace de travail d'un développeur web",
    icon: "Code2",
  },
  {
    order: 3,
    title: "Content Creator",
    subtitle: "Production audio & vidéo",
    imagePath: "public/images/about/content-creator.png",
    alt: "Studio de création de contenu",
    icon: "Camera",
  },
  {
    order: 4,
    title: "Social Media Manager",
    subtitle: "Gestion des réseaux sociaux",
    imagePath: "public/images/about/social-media-manager.png",
    alt: "Gestion des réseaux sociaux sur smartphone",
    icon: "Share2",
  },
  {
    order: 5,
    title: "Data Analyst",
    subtitle: "Analyse & indicateurs de performance",
    imagePath: "public/images/about/data-analyst.png",
    alt: "Analyse de données sur tablette et graphiques",
    icon: "BarChart3",
  },
  {
    order: 6,
    title: "Expert IA & Automatisation",
    subtitle: "Automatisation marketing intelligente",
    imagePath: "public/images/about/automatisation-ia.png",
    alt: "Poste de travail avec outils d'automatisation et IA",
    icon: "Bot",
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
  console.log(`Transfert de ${teamMembers.length} membres vers Sanity...\n`);

  for (const member of teamMembers) {
    console.log(`→ ${member.title}`);

    const imageAssetId = await uploadImage(member.imagePath);

    await client.createOrReplace({
      _id: `teamMember-${member.order}`,
      _type: "teamMember",
      order: member.order,
      title: member.title,
      subtitle: member.subtitle,
      alt: member.alt,
      icon: member.icon,
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
