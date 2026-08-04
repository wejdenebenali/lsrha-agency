import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Ces deux valeurs viennent du fichier .env.local (jamais commit sur GitHub)
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-01-01",
  // Le token permet de lire même si le dataset redevient "public" ou reste
  // privé après la période d'essai — utilisé uniquement côté serveur.
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const builder = imageUrlBuilder(client);

export function urlForImage(source) {
  return builder.image(source);
}
