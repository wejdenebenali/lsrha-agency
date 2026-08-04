// Remplace les photos provisoires de Marketeur, Brand Strategist et
// Media Buyer par les vraies photos.
// À lancer une seule fois, depuis ta machine, avec :
//   node scripts/seed-team-real-photos.mjs

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

const updates = [
  {
    id: "teamMember-7",
    imagePath: "public/images/about/marketeur.png",
    alt: "Réunion de stratégie marketing",
  },
  {
    id: "teamMember-8",
    imagePath: "public/images/about/brand-strategist.png",
    alt: "Brainstorming d'identité de marque",
  },
  {
    id: "teamMember-9",
    imagePath: "public/images/about/media-buyer.png",
    alt: "Gestion de campagnes publicitaires digitales",
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
  console.log("Remplacement des photos provisoires par les vraies...\n");

  for (const update of updates) {
    console.log(`→ ${update.id}`);

    const imageAssetId = await uploadImage(update.imagePath);

    await client
      .patch(update.id)
      .set({
        alt: update.alt,
        image: {
          _type: "image",
          asset: { _type: "reference", _ref: imageAssetId },
        },
      })
      .commit();

    console.log("  ✓ photo remplacée\n");
  }

  console.log("Terminé ! Va voir dans le Studio Sanity pour vérifier.");
}

seed().catch((error) => {
  console.error("Erreur pendant le transfert :", error.message);
  process.exit(1);
});
