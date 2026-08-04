import WhyUsClient from "./WhyUsClient";
import { client } from "@/lib/sanity/client";
import { whyUsQuery } from "@/lib/sanity/queries";

const fallbackWhyUs = {
  eyebrow: "Pourquoi nous choisir",
  title: "Pourquoi choisir",
  titleHighlight: "LSRHA Agency ?",
  description:
    "Nous aidons les marques à se développer grâce à des stratégies digitales créatives, efficaces et orientées résultats.",
  cards: [
    {
      icon: "Target",
      title: "Stratégie sur-mesure",
      description:
        "Nous créons des stratégies digitales personnalisées qui répondent à vos objectifs et aux besoins réels de votre marché.",
    },
    {
      icon: "Zap",
      title: "Exécution rapide",
      description:
        "Nous respectons les délais et avançons efficacement sans jamais compromettre la qualité de votre projet.",
    },
    {
      icon: "Pencil",
      title: "Créativité sans limites",
      description:
        "Des idées innovantes et des designs uniques pour construire une image forte et vous démarquer de la concurrence.",
    },
    {
      icon: "BarChart3",
      title: "Résultats mesurables",
      description:
        "Nous nous concentrons sur les performances et les indicateurs qui comptent réellement pour votre croissance.",
    },
    {
      icon: "Handshake",
      title: "Accompagnement",
      description:
        "Nous restons à vos côtés à chaque étape du projet pour garantir une collaboration fluide et satisfaisante.",
    },
    {
      icon: "MessageCircle",
      title: "Transparence totale",
      description:
        "Une communication claire et régulière pour construire une relation de confiance durable avec nos clients.",
    },
  ],
};

async function getWhyUs() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return fallbackWhyUs;
  }

  try {
    const whyUs = await client.fetch(
      whyUsQuery,
      {},
      { next: { revalidate: 60 } }
    );
    return whyUs || fallbackWhyUs;
  } catch (error) {
    console.error("Erreur de chargement de WhyUs depuis Sanity :", error);
    return fallbackWhyUs;
  }
}

export default async function WhyUs() {
  const whyUs = await getWhyUs();

  return <WhyUsClient whyUs={whyUs} />;
}
