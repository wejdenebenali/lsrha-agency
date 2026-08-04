import RealisationsClient from "./RealisationsClient";
import { client } from "@/lib/sanity/client";
import { realisationsQuery } from "@/lib/sanity/queries";

const fallbackRealisations = {
  eyebrow: "Notre savoir-faire",
  title: "Nos",
  titleHighlight: "réalisations",
  description:
    "Des identités visuelles pensées pour des entreprises actives dans différents secteurs.",
  logos: [
    { name: "Trade Line Turkey", image: "/images/realisations/trade-line.jpeg" },
    { name: "Syinette Store", image: "/images/realisations/syinette-store.jpeg" },
    { name: "Fabio", image: "/images/realisations/fabio.jpeg" },
    {
      name: "Agence immobilière",
      image: "/images/realisations/agence-immobiliere.jpeg",
    },
    { name: "SK Energy", image: "/images/realisations/sk-energy.jpeg" },
    {
      name: "Eco Volt Solar Energy",
      image: "/images/realisations/eco-volt.jpeg",
    },
    {
      name: "Paradis Para Kammoun",
      image: "/images/realisations/paradis-para.jpeg",
    },
    {
      name: "Marbrerie Mohamed Chakroun",
      image: "/images/realisations/marbrerie-mc.jpeg",
    },
  ],
};

async function getRealisations() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return fallbackRealisations;
  }

  try {
    const data = await client.fetch(
      realisationsQuery,
      {},
      { next: { revalidate: 60 } }
    );
    return data && data.logos && data.logos.length > 0
      ? data
      : fallbackRealisations;
  } catch (error) {
    console.error(
      "Erreur de chargement de Realisations depuis Sanity :",
      error
    );
    return fallbackRealisations;
  }
}

export default async function Realisations() {
  const realisations = await getRealisations();

  return <RealisationsClient realisations={realisations} />;
}
