import ProcessClient from "./ProcessClient";
import { client } from "@/lib/sanity/client";
import { processQuery } from "@/lib/sanity/queries";

const fallbackProcess = {
  eyebrow: "Notre méthode",
  title: "Une collaboration claire,",
  titleHighlight: "de l'idée jusqu'au résultat.",
  description:
    "Une approche structurée et transparente pour vous garantir des solutions efficaces et un accompagnement de A à Z.",
  steps: [
    {
      number: "01",
      title: "Découverte",
      description: "Comprendre votre activité, vos besoins et vos objectifs.",
      icon: "Search",
    },
    {
      number: "02",
      title: "Stratégie",
      description:
        "Définir la direction, les priorités et le plan d'action adapté.",
      icon: "BarChart3",
    },
    {
      number: "03",
      title: "Création",
      description:
        "Concevoir les visuels, contenus et interfaces qui vous démarquent.",
      icon: "Sparkles",
    },
    {
      number: "04",
      title: "Développement",
      description:
        "Transformer les maquettes en solutions performantes et fiables.",
      icon: "Code2",
    },
    {
      number: "05",
      title: "Lancement",
      description: "Vérifier, optimiser et mettre le projet en ligne.",
      icon: "Rocket",
    },
    {
      number: "06",
      title: "Suivi",
      description:
        "Analyser les résultats et améliorer vos performances en continu.",
      icon: "Headphones",
    },
  ],
};

async function getProcess() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return fallbackProcess;
  }

  try {
    const data = await client.fetch(
      processQuery,
      {},
      { next: { revalidate: 60 } }
    );
    return data || fallbackProcess;
  } catch (error) {
    console.error("Erreur de chargement de Process depuis Sanity :", error);
    return fallbackProcess;
  }
}

export default async function Process() {
  const processData = await getProcess();

  return <ProcessClient process={processData} />;
}
