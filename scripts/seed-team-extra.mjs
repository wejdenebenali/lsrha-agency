// Ajoute Marketeur, Brand Strategist et Media Buyer à l'équipe.
// Photos provisoires en attendant les vraies — à remplacer plus tard
// directement dans le Studio (clique sur le membre → change la photo).
// À lancer une seule fois, depuis ta machine, avec :
//   node scripts/seed-team-extra.mjs

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

const newMembers = [
  {
    order: 7,
    title: "Marketeur",
    subtitle: "Stratégie marketing globale",
    imagePath: "public/images/about/marketeur.png",
    alt: "Photo provisoire — Marketeur",
    icon: "TrendingUp",
  },
  {
    order: 8,
    title: "Brand Strategist",
    subtitle: "Positionnement & identité de marque",
    imagePath: "public/images/about/brand-strategist.png",
    alt: "Photo provisoire — Brand Strategist",
    icon: "Compass",
  },
  {
    order: 9,
    title: "Media Buyer",
    subtitle: "Achat & optimisation des campagnes publicitaires",
    imagePath: "public/images/about/media-buyer.png",
    alt: "Photo provisoire — Media Buyer",
    icon: "DollarSign",
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
  console.log(`Ajout de ${newMembers.length} membres à l'équipe...\n`);

  for (const member of newMembers) {
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

    console.log(`  ✓ envoyé (photo provisoire — à remplacer dans le Studio)\n`);
  }

  console.log("Terminé ! Va voir dans le Studio Sanity pour vérifier.");
}

seed().catch((error) => {
  console.error("Erreur pendant le transfert :", error.message);
  process.exit(1);
});
