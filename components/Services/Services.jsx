import Image from "next/image";
import { Check } from "lucide-react";

import styles from "./Services.module.css";
import { client } from "@/lib/sanity/client";
import { servicesQuery } from "@/lib/sanity/queries";

// Contenu de secours : s'affiche si Sanity n'est pas encore configuré
// (variables d'environnement absentes) ou en cas d'erreur réseau, pour que
// le site ne casse jamais même si le CMS a un souci.
const fallbackServices = [
  {
    number: "01",
    title: "Stratégie Marketing",
    subtitle: "Penser juste. Agir efficacement.",
    description:
      "Nous concevons des stratégies marketing sur mesure qui permettent à votre entreprise d'atteindre ses objectifs, de renforcer son positionnement, d'identifier de nouvelles opportunités et de générer une croissance durable.",
    features: [
      "Audit marketing",
      "Études de marché",
      "Analyse concurrentielle",
      "Positionnement",
      "Plan marketing",
    ],
    image: "/images/services/strategie-digitale.png",
    alt: "Illustration de stratégie marketing",
  },
  {
    number: "02",
    title: "Branding",
    subtitle: "Une identité qui marque les esprits.",
    description:
      "Nous construisons une identité de marque forte et cohérente en définissant votre positionnement, vos valeurs, votre identité visuelle et votre proposition de valeur afin de vous démarquer durablement sur votre marché.",
    features: ["Création d'identité visuelle", "Charte graphique"],
    image: "/images/services/branding.png",
    alt: "Illustration de branding",
  },
  {
    number: "03",
    title: "Communication",
    subtitle: "Le bon message, au bon moment.",
    description:
      "Nous développons des stratégies de communication efficaces pour transmettre le bon message, au bon public et au bon moment, tout en renforçant la notoriété et la crédibilité de votre marque.",
    features: [
      "Stratégie de communication",
      "Création de concepts publicitaires",
      "Communication digitale et offline",
      "Planification des campagnes de communication",
    ],
    image: "/images/services/communication.png",
    alt: "Illustration de communication",
  },
  {
    number: "04",
    title: "Création de Contenu & Design",
    subtitle: "Créer. Captiver. Engager.",
    description:
      "Nous concevons des contenus créatifs et des supports visuels percutants qui reflètent l'identité de votre marque et captivent votre audience sur tous les canaux de communication.",
    features: [
      "Création de contenus visuels et graphiques",
      "Design publicitaire et supports marketing",
      "Production photo et vidéo",
      "Création de contenus pour réseaux sociaux",
    ],
    image: "/images/services/creation-contenu.png",
    alt: "Illustration de création de contenu et design",
  },
  {
    number: "05",
    title: "Marketing Digital & Publicité",
    subtitle: "Être visible. Être choisi.",
    description:
      "Nous mettons en œuvre des campagnes marketing performantes à travers les canaux digitaux et traditionnels afin d'accroître votre visibilité, d'attirer de nouveaux clients et de maximiser votre retour sur investissement.",
    features: [
      "Gestion des réseaux sociaux",
      "Publicité en ligne (Meta Ads, Google Ads)",
      "Référencement SEO & SEA",
      "Email marketing et acquisition digitale",
    ],
    image: "/images/services/marketing-digital-publicite.png",
    alt: "Illustration de marketing digital et publicité",
  },
  {
    number: "06",
    title: "Développement Web",
    subtitle: "Des expériences digitales modernes.",
    description:
      "Nous créons des sites web modernes, performants et adaptés à vos objectifs pour offrir une expérience utilisateur optimale, renforcer votre présence et soutenir le développement de votre activité.",
    features: [
      "Création de sites web professionnels",
      "Développement de sites e-commerce",
      "Optimisation de l'expérience utilisateur (UX/UI)",
      "Maintenance et amélioration continue",
    ],
    image: "/images/services/developpement-web.png",
    alt: "Illustration de développement web",
  },
  {
    number: "07",
    title: "Automatisation & Intelligence Artificielle",
    subtitle: "Optimiser chaque interaction.",
    description:
      "Nous intégrons des solutions d'automatisation et d'intelligence artificielle pour optimiser vos processus marketing, améliorer l'expérience client et accroître l'efficacité de vos opérations.",
    features: ["Marketing automation", "Chatbots et assistants intelligents"],
    image: "/images/services/automatisation-ia.png",
    alt: "Illustration d'automatisation et intelligence artificielle",
  },
  {
    number: "08",
    title: "Analyse de Données & Performance",
    subtitle: "Mesurer pour progresser.",
    description:
      "Nous analysons les performances de vos actions marketing à l'aide d'indicateurs clés afin d'identifier les opportunités d'amélioration, d'optimiser vos investissements et de favoriser une croissance durable.",
    features: [
      "Analyse des indicateurs de performance (KPI)",
      "Reporting et tableaux de bord",
      "Analyse du comportement client",
      "Optimisation des campagnes marketing",
    ],
    image: "/images/services/analyse-donnees-performance.png",
    alt: "Illustration d'analyse de données et performance",
  },
  {
    number: "09",
    title: "Conseil & Accompagnement",
    subtitle: "Un partenaire à chaque étape.",
    description:
      "Nous accompagnons les entreprises dans leurs décisions stratégiques en apportant une expertise marketing globale, des recommandations personnalisées et un suivi continu pour assurer leur développement.",
    features: [
      "Analyse des tendances consommateurs",
      "Études de satisfaction client",
    ],
    image: "/images/services/conseil-accompagnement.png",
    alt: "Illustration de conseil et accompagnement",
  },
];

async function getServices() {
  // Si les variables Sanity ne sont pas encore configurées, on garde le
  // contenu de secours plutôt que de faire planter la page.
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return fallbackServices;
  }

  try {
    const services = await client.fetch(servicesQuery, {}, {
      next: { revalidate: 60 }, // Recharge le contenu toutes les 60 secondes
    });

    return services && services.length > 0 ? services : fallbackServices;
  } catch (error) {
    console.error("Erreur de chargement des services depuis Sanity :", error);
    return fallbackServices;
  }
}

export default async function Services() {
  const services = await getServices();

  return (
    <section className={styles.services} id="services">
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Nos expertises</p>

          <h2 className={styles.sectionTitle}>
            Plus qu'une agence,
            <span>un partenaire de croissance.</span>
          </h2>

          <p className={styles.sectionDescription}>
            Innovation. Créativité. Performance
          </p>
        </header>

        <div className={styles.servicesList}>
          {services.map((service, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <article
                key={service._id || service.number}
                className={`${styles.serviceItem} ${
                  isReversed ? styles.reversed : ""
                }`}
              >
                <div className={styles.serviceContent}>
                  <div className={styles.numberRow}>
                    <span className={styles.serviceNumber}>
                      {service.number}
                    </span>

                    <span className={styles.numberLine} />
                  </div>

                  <h3 className={styles.serviceTitle}>{service.title}</h3>

                  <p className={styles.serviceSubtitle}>{service.subtitle}</p>

                  <p className={styles.serviceDescription}>
                    {service.description}
                  </p>

                  <ul className={styles.features}>
                    {service.features.map((feature) => (
                      <li key={feature}>
                        <span className={styles.checkIcon}>
                          <Check size={14} strokeWidth={3} />
                        </span>

                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.serviceVisual}>
                  <span className={styles.visualCircle} aria-hidden="true" />
                  <span className={styles.visualDot} aria-hidden="true" />

                  <Image
                    src={service.image}
                    alt={service.alt}
                    width={800}
                    height={600}
                    quality={100}
                    sizes="(max-width: 900px) 100vw, 52vw"
                    className={styles.serviceImage}
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}