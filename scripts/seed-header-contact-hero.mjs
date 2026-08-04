// Transfère l'en-tête (logo, nom, menu), la bannière rouge de contact, le
// bandeau du haut de /contact, et la photo du Hero vers Sanity.
// À lancer une seule fois, depuis ta machine, avec :
//   node scripts/seed-header-contact-hero.mjs

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
  console.log("→ En-tête du site (logo + menu)");
  const logoAssetId = await uploadImage(
    "public/images/lsrha-crown-transparent.png"
  );

  await client.createOrReplace({
    _id: "headerSettings",
    _type: "headerSettings",
    logo: {
      _type: "image",
      asset: { _type: "reference", _ref: logoAssetId },
    },
    brandName: "LSRHA AGENCY",
    tagline: "Marketing · Branding · Strategy",
    navLinks: [
      { _key: "n1", label: "Accueil", href: "/" },
      { _key: "n2", label: "Services", href: "/services" },
      { _key: "n3", label: "À propos", href: "/a-propos" },
      { _key: "n4", label: "Contact", href: "/contact" },
    ],
  });
  console.log("  ✓ envoyé\n");

  console.log("→ Bannière rouge de contact");
  await client.createOrReplace({
    _id: "contactBanner",
    _type: "contactBanner",
    eyebrow: "Contactez-nous",
    title: "Prêt à révéler",
    titleHighlight: "le potentiel de votre marque ?",
    description:
      "Parlons de vos idées et construisons ensemble une présence forte, cohérente et durable.",
    benefits: [
      {
        _key: "b1",
        icon: "ShieldCheck",
        title: "Réponse rapide",
        subtitle: "sous 24h",
      },
      {
        _key: "b2",
        icon: "Check",
        title: "Accompagnement",
        subtitle: "personnalisé",
      },
      {
        _key: "b3",
        icon: "Sparkles",
        title: "Solutions",
        subtitle: "sur mesure",
      },
    ],
  });
  console.log("  ✓ envoyé\n");

  console.log("→ Page Contact — Bandeau du haut");
  await client.createOrReplace({
    _id: "contactPageIntro",
    _type: "contactPageIntro",
    title: "Contactez-nous",
    subtitle: "Un projet en tête ? Discutons-en.",
  });
  console.log("  ✓ envoyé\n");

  console.log("→ Photo du Hero (accueil)");
  const heroImageAssetId = await uploadImage(
    "public/images/hero-office-light.png"
  );

  await client
    .patch("hero")
    .set({
      heroImage: {
        _type: "image",
        asset: { _type: "reference", _ref: heroImageAssetId },
      },
    })
    .commit();
  console.log("  ✓ envoyé\n");

  console.log("Terminé ! Va voir dans le Studio Sanity pour vérifier.");
}

seed().catch((error) => {
  console.error("Erreur pendant le transfert :", error.message);
  process.exit(1);
});
