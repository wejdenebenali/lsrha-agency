// Transfère "Notre histoire" (page À propos) vers Sanity, et ajoute les
// champs Facebook/Instagram aux coordonnées existantes.
// À lancer une seule fois, depuis ta machine, avec :
//   node scripts/seed-story-socials.mjs

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

async function uploadImage(imagePath) {
  const fullPath = path.join(__dirname, "..", imagePath);
  const buffer = readFileSync(fullPath);
  const asset = await client.assets.upload("image", buffer, {
    filename: path.basename(imagePath),
  });
  return asset._id;
}

async function seed() {
  console.log("→ Notre histoire (À propos)");

  const imageAssetId = await uploadImage(
    "public/images/about/notre-histoire.png"
  );

  await client.createOrReplace({
    _id: "aboutStory",
    _type: "aboutStory",
    eyebrow: "Notre histoire",
    title: "Une histoire de",
    titleHighlight: "passion et de confiance.",
    paragraphs: [
      "LSRHA Agency est née en 2022 de la volonté d'aider les marques à se démarquer dans un monde digital en constante évolution.",
      "Nous mettons la créativité, la stratégie et la technologie au service de nos clients afin de transformer leurs ambitions en expériences digitales modernes, cohérentes et performantes.",
      "Notre plus grande fierté réside dans la confiance de nos clients et dans les relations durables que nous construisons avec eux.",
    ],
    image: {
      _type: "image",
      asset: { _type: "reference", _ref: imageAssetId },
    },
    highlights: [
      {
        _key: "h1",
        icon: "Target",
        title: "Stratégie",
        description: "Des décisions pensées selon vos objectifs.",
      },
      {
        _key: "h2",
        icon: "Sparkles",
        title: "Créativité",
        description: "Des idées originales qui donnent vie à votre identité.",
      },
      {
        _key: "h3",
        icon: "Rocket",
        title: "Performance",
        description: "Des solutions orientées vers des résultats durables.",
      },
    ],
  });
  console.log("  ✓ envoyé\n");

  console.log(
    "→ Réseaux sociaux : à remplir toi-même dans le Studio (page Coordonnées),"
  );
  console.log(
    "  je ne connais pas les vrais liens Facebook/Instagram d'Amel."
  );

  console.log("\nTerminé ! Va voir dans le Studio Sanity pour vérifier.");
}

seed().catch((error) => {
  console.error("Erreur pendant le transfert :", error.message);
  process.exit(1);
});
