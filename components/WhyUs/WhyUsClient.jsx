"use client";

import {
  BarChart3,
  Handshake,
  MessageCircle,
  Pencil,
  Target,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

import styles from "./WhyUs.module.css";

const iconMap = { Target, Zap, Pencil, BarChart3, Handshake, MessageCircle };

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 55,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function WhyUsClient({ whyUs }) {
  const advantages = whyUs.cards || [];

  return (
    <section className={styles.whyUs} id="why-us">
      <span className={styles.decorTop} aria-hidden="true" />
      <span className={styles.decorBottom} aria-hidden="true" />

      <div className={styles.container}>
        <motion.header
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <p className={styles.eyebrow}>{whyUs.eyebrow}</p>

          <h2 className={styles.sectionTitle}>
            {whyUs.title} <span>{whyUs.titleHighlight}</span>
          </h2>

          <div className={styles.titleDecoration}>
            <span />
            <i />
            <span />
          </div>

          <p className={styles.sectionDescription}>{whyUs.description}</p>
        </motion.header>

        <motion.div
          className={styles.cardsGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {advantages.map((advantage) => {
            const Icon = iconMap[advantage.icon] || Target;

            return (
              <motion.article
                key={advantage._key || advantage.title}
                className={styles.advantageCard}
                variants={cardVariants}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.iconBox}>
                    <Icon size={30} strokeWidth={2} />
                  </div>

                  <div>
                    <h3>{advantage.title}</h3>
                    <span className={styles.smallLine} />
                  </div>
                </div>

                <p>{advantage.description}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
