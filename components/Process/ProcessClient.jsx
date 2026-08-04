"use client";

import {
  BarChart3,
  Code2,
  Headphones,
  Rocket,
  Search,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

import styles from "./Process.module.css";

const iconMap = { Search, BarChart3, Sparkles, Code2, Rocket, Headphones };

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 45,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ProcessClient({ process }) {
  const steps = process.steps || [];

  return (
    <section className={styles.process} id="process">
      <span className={styles.decorLeft} aria-hidden="true" />
      <span className={styles.decorRight} aria-hidden="true" />

      <div className={styles.container}>
        <motion.header
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <p className={styles.eyebrow}>{process.eyebrow}</p>

          <h2 className={styles.sectionTitle}>
            {process.title}
            <br />
            <span>{process.titleHighlight}</span>
          </h2>

          <div className={styles.titleDecoration}>
            <span />
            <i />
            <span />
          </div>

          <p className={styles.sectionDescription}>{process.description}</p>
        </motion.header>

        <motion.div
          className={styles.timeline}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <div className={styles.timelineLine} aria-hidden="true" />
          <span className={`${styles.centerPoint} ${styles.pointOne}`} />
          <span className={`${styles.centerPoint} ${styles.pointTwo}`} />
          <span className={`${styles.centerPoint} ${styles.pointThree}`} />

          {steps.map((step, index) => {
            const Icon = iconMap[step.icon] || Search;
            const isTop = index % 2 === 0;

            return (
              <motion.article
                key={step._key || step.number}
                className={`${styles.step} ${
                  isTop ? styles.stepTop : styles.stepBottom
                }`}
                variants={cardVariants}
              >
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div className={styles.iconBox}>
                      <Icon size={28} strokeWidth={1.9} />
                    </div>

                    <div>
                      <span className={styles.stepNumber}>{step.number}</span>
                      <h3>{step.title}</h3>
                      <span className={styles.smallLine} />
                    </div>
                  </div>

                  <p>{step.description}</p>
                </div>

                <span className={styles.connector} aria-hidden="true" />
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
