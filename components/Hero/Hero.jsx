import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Headphones,
  Rocket,
  Users,
} from "lucide-react";

import styles from "./Hero.module.css";
import { client } from "@/lib/sanity/client";
import { heroQuery } from "@/lib/sanity/queries";

const iconMap = { Users, Rocket, BarChart3, Headphones };

const fallbackHero = {
  heroImage: "/images/hero-office-light.png",
  eyebrow: "Agence de marketing digitale",
  title: "Nous donnons vie à ",
  titleHighlight: "votre vision",
  description:
    "Nous proposons une approche globale qui couvre l'ensemble des dimensions du marketing, de la stratégie à l'exécution, afin d'aider nos clients à construire une marque forte, se différencier de leurs concurrents et créer une relation durable avec leurs clients.",
  primaryButtonText: "Découvrir nos services",
  secondaryButtonText: "Prendre rendez-vous",
  stats: [
    { icon: "Users", value: "150+", label: "Clients accompagnés" },
    { icon: "Rocket", value: "7+", label: "Années d’expérience" },
    { icon: "BarChart3", value: "250+", label: "Projets réalisés" },
    { icon: "Headphones", value: "24/7", label: "Support dédié" },
  ],
};

async function getHero() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return fallbackHero;
  }

  try {
    const hero = await client.fetch(heroQuery, {}, { next: { revalidate: 60 } });
    return hero
      ? { ...hero, heroImage: hero.heroImage || fallbackHero.heroImage }
      : fallbackHero;
  } catch (error) {
    console.error("Erreur de chargement du Hero depuis Sanity :", error);
    return fallbackHero;
  }
}

export default async function Hero() {
  const hero = await getHero();

  return (
    <section className={styles.hero} id="accueil">
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>
            <span />
            {hero.eyebrow}
          </p>

          <h1 className={styles.title}>
            {hero.title}
            <span>{hero.titleHighlight}</span>
          </h1>

          <p className={styles.description}>{hero.description}</p>

          <div className={styles.actions}>
            <Link href="#services" className={styles.primaryButton}>
              {hero.primaryButtonText}
              <ArrowRight size={18} />
            </Link>

            <Link href="#reservation" className={styles.secondaryButton}>
              {hero.secondaryButtonText}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.imageFrame}>
            <Image
              src={hero.heroImage}
              alt="Bureau de LSRHA Agency"
              fill
              priority
              quality={100}
              unoptimized
              sizes="(max-width: 900px) 100vw, 57vw"
              className={styles.image}
            />
          </div>
        </div>
      </div>

      <div className={styles.statsBar}>
        {(hero.stats || []).map((stat) => {
          const Icon = iconMap[stat.icon] || Users;

          return (
            <article className={styles.stat} key={stat.label}>
              <div className={styles.statIcon}>
                <Icon size={28} strokeWidth={1.8} />
              </div>

              <div className={styles.statText}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
