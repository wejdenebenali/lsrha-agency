// Transfère le Hero, "Pourquoi nous choisir", les coordonnées et la citation
// vers Sanity. À lancer une seule fois, depuis ta machine, avec :
//   node scripts/seed-site-content.mjs

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

async function seed() {
  console.log("→ Hero (accueil)");
  await client.createOrReplace({
    _id: "hero",
    _type: "hero",
    eyebrow: "Agence de marketing digitale",
    title: "Nous donnons vie à ",
    titleHighlight: "votre vision",
    description:
      "Nous proposons une approche globale qui couvre l'ensemble des dimensions du marketing, de la stratégie à l'exécution, afin d'aider nos clients à construire une marque forte, se différencier de leurs concurrents et créer une relation durable avec leurs clients.",
    primaryButtonText: "Découvrir nos services",
    secondaryButtonText: "Voir nos réalisations",
    stats: [
      { _key: "s1", icon: "Users", value: "150+", label: "Clients accompagnés" },
      { _key: "s2", icon: "Rocket", value: "7+", label: "Années d’expérience" },
      { _key: "s3", icon: "BarChart3", value: "250+", label: "Projets réalisés" },
      { _key: "s4", icon: "Headphones", value: "24/7", label: "Support dédié" },
    ],
  });
  console.log("  ✓ envoyé\n");

  console.log("→ Pourquoi nous choisir");
  await client.createOrReplace({
    _id: "whyUs",
    _type: "whyUs",
    eyebrow: "Pourquoi nous choisir",
    title: "Pourquoi choisir",
    titleHighlight: "LSRHA Agency ?",
    description:
      "Nous aidons les marques à se développer grâce à des stratégies digitales créatives, efficaces et orientées résultats.",
    cards: [
      {
        _key: "c1",
        icon: "Target",
        title: "Stratégie sur-mesure",
        description:
          "Nous créons des stratégies digitales personnalisées qui répondent à vos objectifs et aux besoins réels de votre marché.",
      },
      {
        _key: "c2",
        icon: "Zap",
        title: "Exécution rapide",
        description:
          "Nous respectons les délais et avançons efficacement sans jamais compromettre la qualité de votre projet.",
      },
      {
        _key: "c3",
        icon: "Pencil",
        title: "Créativité sans limites",
        description:
          "Des idées innovantes et des designs uniques pour construire une image forte et vous démarquer de la concurrence.",
      },
      {
        _key: "c4",
        icon: "BarChart3",
        title: "Résultats mesurables",
        description:
          "Nous nous concentrons sur les performances et les indicateurs qui comptent réellement pour votre croissance.",
      },
      {
        _key: "c5",
        icon: "Handshake",
        title: "Accompagnement",
        description:
          "Nous restons à vos côtés à chaque étape du projet pour garantir une collaboration fluide et satisfaisante.",
      },
      {
        _key: "c6",
        icon: "MessageCircle",
        title: "Transparence totale",
        description:
          "Une communication claire et régulière pour construire une relation de confiance durable avec nos clients.",
      },
    ],
  });
  console.log("  ✓ envoyé\n");

  console.log("→ Coordonnées");
  await client.createOrReplace({
    _id: "contactInfo",
    _type: "contactInfo",
    phones: [
      { _key: "p1", value: "+216 99676211" },
      { _key: "p2", value: "+216 92 60 60 58" },
    ],
    email: "contact@lsrha.tn",
    whatsapp: "21652123456",
    addressLines: [
      "Route Tunis Km 9, Cité Ons 5",
      "Pépinière III, Bureau B8",
      "Sfax, Sakiet Ezzit 3021",
    ],
  });
  console.log("  ✓ envoyé\n");

  console.log("→ Citation (À propos)");
  await client.createOrReplace({
    _id: "citation",
    _type: "citation",
    quote:
      "Nous ne créons pas simplement des sites web ou des identités visuelles. Nous construisons des expériences qui renforcent la confiance et accompagnent durablement la croissance de nos clients.",
    highlight:
      "Nous construisons des expériences qui renforcent la confiance",
    author: "— LSRHA Agency",
  });
  console.log("  ✓ envoyé\n");

  console.log("Terminé ! Va voir dans le Studio Sanity pour vérifier.");
}

seed().catch((error) => {
  console.error("Erreur pendant le transfert :", error.message);
  process.exit(1);
});
