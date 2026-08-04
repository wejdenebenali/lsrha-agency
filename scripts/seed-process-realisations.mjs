// Transfère "Notre méthode" et "Nos réalisations" vers Sanity.
// À lancer une seule fois, depuis ta machine, avec :
//   node scripts/seed-process-realisations.mjs

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
  console.log("→ Notre méthode");
  await client.createOrReplace({
    _id: "process",
    _type: "process",
    eyebrow: "Notre méthode",
    title: "Une collaboration claire,",
    titleHighlight: "de l’idée jusqu’au résultat.",
    description:
      "Une approche structurée et transparente pour vous garantir des solutions efficaces et un accompagnement de A à Z.",
    steps: [
      {
        _key: "st1",
        number: "01",
        title: "Découverte",
        description: "Comprendre votre activité, vos besoins et vos objectifs.",
        icon: "Search",
      },
      {
        _key: "st2",
        number: "02",
        title: "Stratégie",
        description:
          "Définir la direction, les priorités et le plan d’action adapté.",
        icon: "BarChart3",
      },
      {
        _key: "st3",
        number: "03",
        title: "Création",
        description:
          "Concevoir les visuels, contenus et interfaces qui vous démarquent.",
        icon: "Sparkles",
      },
      {
        _key: "st4",
        number: "04",
        title: "Développement",
        description:
          "Transformer les maquettes en solutions performantes et fiables.",
        icon: "Code2",
      },
      {
        _key: "st5",
        number: "05",
        title: "Lancement",
        description: "Vérifier, optimiser et mettre le projet en ligne.",
        icon: "Rocket",
      },
      {
        _key: "st6",
        number: "06",
        title: "Suivi",
        description:
          "Analyser les résultats et améliorer vos performances en continu.",
        icon: "Headphones",
      },
    ],
  });
  console.log("  ✓ envoyé\n");

  console.log("→ Nos réalisations (logos clients)");

  const logosData = [
    { name: "Trade Line Turkey", imagePath: "public/images/realisations/trade-line.jpeg" },
    { name: "Syinette Store", imagePath: "public/images/realisations/syinette-store.jpeg" },
    { name: "Fabio", imagePath: "public/images/realisations/fabio.jpeg" },
    {
      name: "Agence immobilière",
      imagePath: "public/images/realisations/agence-immobiliere.jpeg",
    },
    { name: "SK Energy", imagePath: "public/images/realisations/sk-energy.jpeg" },
    {
      name: "Eco Volt Solar Energy",
      imagePath: "public/images/realisations/eco-volt.jpeg",
    },
    {
      name: "Paradis Para Kammoun",
      imagePath: "public/images/realisations/paradis-para.jpeg",
    },
    {
      name: "Marbrerie Mohamed Chakroun",
      imagePath: "public/images/realisations/marbrerie-mc.jpeg",
    },
  ];

  const logos = [];
  for (const logo of logosData) {
    console.log(`  → upload logo ${logo.name}`);
    const assetId = await uploadImage(logo.imagePath);
    logos.push({
      _key: assetId,
      _type: "logo",
      name: logo.name,
      image: {
        _type: "image",
        asset: { _type: "reference", _ref: assetId },
      },
    });
  }

  await client.createOrReplace({
    _id: "realisations",
    _type: "realisations",
    eyebrow: "Notre savoir-faire",
    title: "Nos",
    titleHighlight: "réalisations",
    description:
      "Des identités visuelles pensées pour des entreprises actives dans différents secteurs.",
    logos,
  });
  console.log("  ✓ envoyé\n");

  console.log("Terminé ! Va voir dans le Studio Sanity pour vérifier.");
}

seed().catch((error) => {
  console.error("Erreur pendant le transfert :", error.message);
  process.exit(1);
});
