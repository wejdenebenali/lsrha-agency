// Transfère le contenu du footer (colonnes, liens légaux) et les textes du
// formulaire de réservation vers Sanity.
// À lancer une seule fois, depuis ta machine, avec :
//   node scripts/seed-footer-booking.mjs

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
  console.log("→ Footer — Colonnes & liens");
  await client.createOrReplace({
    _id: "footerContent",
    _type: "footerContent",
    brandDescription:
      "Nous créons des connexions fortes entre les marques et leurs clients.",
    columns: [
      {
        _key: "col1",
        title: "Agence",
        links: [
          { _key: "l1", label: "À propos", href: "/a-propos" },
          { _key: "l2", label: "Nos services", href: "#services" },
          { _key: "l3", label: "Nos réalisations", href: "#realisations" },
          { _key: "l4", label: "Notre méthode", href: "#process" },
        ],
      },
      {
        _key: "col2",
        title: "Services",
        links: [
          { _key: "l5", label: "Stratégie Marketing", href: "#services" },
          { _key: "l6", label: "Branding", href: "#services" },
          {
            _key: "l7",
            label: "Marketing Digital & Publicité",
            href: "#services",
          },
          { _key: "l8", label: "Développement Web", href: "#services" },
        ],
      },
      {
        _key: "col3",
        title: "Navigation",
        links: [
          { _key: "l9", label: "Accueil", href: "/" },
          { _key: "l10", label: "Services", href: "#services" },
          { _key: "l11", label: "Contact", href: "#contact" },
        ],
      },
    ],
    legalLinks: [
      { _key: "leg1", label: "Mentions légales", href: "#" },
      { _key: "leg2", label: "Politique de confidentialité", href: "#" },
    ],
  });
  console.log("  ✓ envoyé\n");

  console.log("→ Formulaire de réservation");
  await client.createOrReplace({
    _id: "bookingForm",
    _type: "bookingForm",
    eyebrow: "Prendre rendez-vous",
    title: "Réservez votre créneau",
    subtitle:
      "Indiquez vos coordonnées et la date qui vous arrange, nous revenons vers vous sous 24h pour confirmer.",
    nameLabel: "Nom complet",
    namePlaceholder: "Votre nom",
    emailLabel: "Email",
    emailPlaceholder: "vous@exemple.com",
    dateLabel: "Date souhaitée",
    timeLabel: "Heure souhaitée",
    messageLabel: "Message (optionnel)",
    messagePlaceholder: "Un mot sur votre projet...",
    submitButtonText: "Envoyer la demande",
  });
  console.log("  ✓ envoyé\n");

  console.log("Terminé ! Va voir dans le Studio Sanity pour vérifier.");
}

seed().catch((error) => {
  console.error("Erreur pendant le transfert :", error.message);
  process.exit(1);
});
