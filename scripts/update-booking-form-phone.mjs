// Met à jour le formulaire dans Sanity : remplace Date/Heure par Téléphone.
// À lancer une seule fois, depuis ta machine, avec :
//   node scripts/update-booking-form-phone.mjs

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

async function run() {
  console.log("→ Mise à jour du formulaire de réservation");

  await client
    .patch("bookingForm")
    .unset(["dateLabel", "timeLabel"])
    .set({
      eyebrow: "Contactez-nous",
      title: "Envoyez-nous votre demande",
      subtitle: "Indiquez vos coordonnées, nous revenons vers vous sous 24h.",
      phoneLabel: "Téléphone",
      phonePlaceholder: "+216 99 999 999",
    })
    .commit();

  console.log("  ✓ mis à jour\n");
  console.log("Terminé ! Va voir dans le Studio Sanity pour vérifier.");
}

run().catch((error) => {
  console.error("Erreur pendant la mise à jour :", error.message);
  process.exit(1);
});
