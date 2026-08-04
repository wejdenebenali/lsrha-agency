"use client";

import Image from "next/image";
import {
  BarChart3,
  Bot,
  Camera,
  Code2,
  Compass,
  DollarSign,
  Palette,
  Rocket,
  Share2,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";

import styles from "./About.module.css";

// Sanity ne peut pas stocker un composant React — le Studio enregistre juste
// le nom de l'icône en texte (ex: "Palette"), et on le transforme ici en
// vrai composant à afficher.
const iconMap = {
  Palette,
  Code2,
  Camera,
  Share2,
  BarChart3,
  Bot,
  TrendingUp,
  Compass,
  DollarSign,
};

function renderQuote(quote, highlight) {
  if (!quote) return null;
  if (!highlight || !quote.includes(highlight)) return quote;

  const [before, after] = quote.split(highlight);
  return (
    <>
      {before}
      <strong>{highlight}</strong>
      {after}
    </>
  );
}

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export default function AboutClient({ teamMembers, citation, aboutStory }) {
  return (
    <main className={styles.aboutPage}>
      {/* =========================
          NOTRE HISTOIRE
      ========================= */}

      <section className={styles.storySection} id="notre-histoire">
        <span className={styles.storyBackgroundText} aria-hidden="true">
          LSRHA
        </span>

        <div className={styles.container}>
          <div className={styles.storyGrid}>
            <motion.div
              className={styles.storyVisual}
              initial={{ opacity: 0, x: -55 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className={styles.storyShape} aria-hidden="true" />

              <div className={styles.storyImageFrame}>
                <Image
                  src={aboutStory.image}
                  alt="Collaboration et relation de confiance avec un client"
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 50vw"
                  className={styles.storyImage}
                />

                <span className={styles.storyOverlay} aria-hidden="true" />
              </div>
            </motion.div>

            <motion.div
              className={styles.storyContent}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={staggerContainer}
            >
              <motion.p className={styles.sectionEyebrow} variants={fadeUp}>
                {aboutStory.eyebrow}
              </motion.p>

              <motion.h1 className={styles.storyTitle} variants={fadeUp}>
                {aboutStory.title}
                <span> {aboutStory.titleHighlight}</span>
              </motion.h1>

              <motion.div
                className={styles.titleDecoration}
                variants={fadeUp}
              >
                <span />
                <i />
              </motion.div>

              {(aboutStory.paragraphs || []).map((paragraph) => (
                <motion.p
                  className={styles.storyParagraph}
                  variants={fadeUp}
                  key={paragraph}
                >
                  {paragraph}
                </motion.p>
              ))}

              <motion.div
                className={styles.storyHighlights}
                variants={staggerContainer}
              >
                {(aboutStory.highlights || []).map((highlight) => {
                  const HighlightIcon = iconMap[highlight.icon] || Target;

                  return (
                    <motion.div variants={fadeUp} key={highlight.title}>
                      <HighlightIcon size={22} />

                      <span>
                        <strong>{highlight.title}</strong>
                        {highlight.description}
                      </span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================
          NOTRE ÉQUIPE
      ========================= */}

      <section className={styles.teamSection} id="equipe">
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeading}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.p className={styles.sectionEyebrow} variants={fadeUp}>
              Notre équipe
            </motion.p>

            <motion.h2 variants={fadeUp}>
              Rencontrez l&apos;équipe
              <br />
              derrière <span>notre succès.</span>
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.teamGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
          >
            {teamMembers.map((member) => {
              const Icon = iconMap[member.icon] || Palette;

              return (
                <motion.article
                  key={member._id || member.title}
                  className={styles.teamCard}
                  variants={fadeUp}
                >
                  <div className={styles.teamImageFrame}>
                    <Image
                      src={member.image}
                      alt={member.alt}
                      fill
                      sizes="(max-width: 760px) 100vw, 33vw"
                      className={styles.teamImage}
                    />

                    <span
                      className={styles.teamImageOverlay}
                      aria-hidden="true"
                    />
                  </div>

                  <div className={styles.teamInformation}>
                    <span className={styles.teamIcon}>
                      <Icon size={24} strokeWidth={1.8} />
                    </span>

                    <span>
                      <h3>{member.title}</h3>
                      <p>{member.subtitle}</p>
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* =========================
          CITATION
      ========================= */}

      <section className={styles.quoteSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.quoteBox}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span className={styles.quoteSymbol} aria-hidden="true">
              &ldquo;
            </span>

            <span className={styles.quoteCrown} aria-hidden="true" />

            <blockquote>{renderQuote(citation.quote, citation.highlight)}</blockquote>

            <span className={styles.quoteAuthor}>{citation.author}</span>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
