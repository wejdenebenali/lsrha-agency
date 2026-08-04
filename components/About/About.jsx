import AboutClient from "./AboutClient";
import { client } from "@/lib/sanity/client";
import {
  teamMembersQuery,
  citationQuery,
  aboutStoryQuery,
} from "@/lib/sanity/queries";

// Contenu de secours : s'affiche si Sanity n'est pas configuré ou en cas
// d'erreur, pour que le site ne casse jamais.
const fallbackTeamMembers = [
  {
    title: "Designer Graphique",
    subtitle: "Créativité & identité visuelle",
    image: "/images/about/designer.png",
    alt: "Espace de travail d'une designer graphique",
    icon: "Palette",
  },
  {
    title: "Développeur Web",
    subtitle: "Développement & intégration",
    image: "/images/about/developpeur.png",
    alt: "Espace de travail d'un développeur web",
    icon: "Code2",
  },
  {
    title: "Content Creator",
    subtitle: "Production audio & vidéo",
    image: "/images/about/content-creator.png",
    alt: "Studio de création de contenu",
    icon: "Camera",
  },
  {
    title: "Social Media Manager",
    subtitle: "Gestion des réseaux sociaux",
    image: "/images/about/social-media-manager.png",
    alt: "Gestion des réseaux sociaux sur smartphone",
    icon: "Share2",
  },
  {
    title: "Data Analyst",
    subtitle: "Analyse & indicateurs de performance",
    image: "/images/about/data-analyst.png",
    alt: "Analyse de données sur tablette et graphiques",
    icon: "BarChart3",
  },
  {
    title: "Expert IA & Automatisation",
    subtitle: "Automatisation marketing intelligente",
    image: "/images/about/automatisation-ia.png",
    alt: "Poste de travail avec outils d'automatisation et IA",
    icon: "Bot",
  },
  {
    title: "Marketeur",
    subtitle: "Stratégie marketing globale",
    image: "/images/about/marketeur.png",
    alt: "Photo provisoire — Marketeur",
    icon: "TrendingUp",
  },
  {
    title: "Brand Strategist",
    subtitle: "Positionnement & identité de marque",
    image: "/images/about/brand-strategist.png",
    alt: "Photo provisoire — Brand Strategist",
    icon: "Compass",
  },
  {
    title: "Media Buyer",
    subtitle: "Achat & optimisation des campagnes publicitaires",
    image: "/images/about/media-buyer.png",
    alt: "Photo provisoire — Media Buyer",
    icon: "DollarSign",
  },
];

const fallbackCitation = {
  quote:
    "Nous ne créons pas simplement des sites web ou des identités visuelles. Nous construisons des expériences qui renforcent la confiance et accompagnent durablement la croissance de nos clients.",
  highlight:
    "Nous construisons des expériences qui renforcent la confiance",
  author: "— LSRHA Agency",
};

const fallbackAboutStory = {
  eyebrow: "Notre histoire",
  title: "Une histoire de",
  titleHighlight: "passion et de confiance.",
  paragraphs: [
    "LSRHA Agency est née en 2022 de la volonté d'aider les marques à se démarquer dans un monde digital en constante évolution.",
    "Nous mettons la créativité, la stratégie et la technologie au service de nos clients afin de transformer leurs ambitions en expériences digitales modernes, cohérentes et performantes.",
    "Notre plus grande fierté réside dans la confiance de nos clients et dans les relations durables que nous construisons avec eux.",
  ],
  image: "/images/about/notre-histoire.png",
  highlights: [
    {
      icon: "Target",
      title: "Stratégie",
      description: "Des décisions pensées selon vos objectifs.",
    },
    {
      icon: "Sparkles",
      title: "Créativité",
      description: "Des idées originales qui donnent vie à votre identité.",
    },
    {
      icon: "Rocket",
      title: "Performance",
      description: "Des solutions orientées vers des résultats durables.",
    },
  ],
};

async function getTeamMembers() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return fallbackTeamMembers;
  }

  try {
    const members = await client.fetch(
      teamMembersQuery,
      {},
      { next: { revalidate: 60 } }
    );

    return members && members.length > 0 ? members : fallbackTeamMembers;
  } catch (error) {
    console.error("Erreur de chargement de l'équipe depuis Sanity :", error);
    return fallbackTeamMembers;
  }
}

export default async function About() {
  const teamMembers = await getTeamMembers();
  const citation = await getCitation();
  const aboutStory = await getAboutStory();

  return (
    <AboutClient
      teamMembers={teamMembers}
      citation={citation}
      aboutStory={aboutStory}
    />
  );
}

async function getAboutStory() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return fallbackAboutStory;
  }

  try {
    const data = await client.fetch(
      aboutStoryQuery,
      {},
      { next: { revalidate: 60 } }
    );
    return data || fallbackAboutStory;
  } catch (error) {
    console.error(
      "Erreur de chargement de Notre histoire depuis Sanity :",
      error
    );
    return fallbackAboutStory;
  }
}

async function getCitation() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return fallbackCitation;
  }

  try {
    const citation = await client.fetch(
      citationQuery,
      {},
      { next: { revalidate: 60 } }
    );
    return citation || fallbackCitation;
  } catch (error) {
    console.error("Erreur de chargement de la citation depuis Sanity :", error);
    return fallbackCitation;
  }
}
