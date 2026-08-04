"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import styles from "./Realisations.module.css";

function LogoCard({ logo }) {
  return (
    <article className={styles.logoCard}>
      <div className={styles.logoImageWrapper}>
        <Image
          src={logo.image}
          alt={`Logo ${logo.name}`}
          width={360}
          height={240}
          quality={100}
          sizes="(max-width: 600px) 210px, 280px"
          className={styles.logoImage}
        />
      </div>

      <span className={styles.logoName}>{logo.name}</span>
    </article>
  );
}

export default function RealisationsClient({ realisations }) {
  const logos = realisations.logos || [];
  const allLogos = [...logos, ...logos];

  return (
    <section className={styles.realisations} id="realisations">
      <span className={styles.decorOne} aria-hidden="true" />
      <span className={styles.decorTwo} aria-hidden="true" />

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
          <p className={styles.eyebrow}>{realisations.eyebrow}</p>

          <h2 className={styles.sectionTitle}>
            {realisations.title} <span>{realisations.titleHighlight}</span>
          </h2>

          <div className={styles.titleDecoration}>
            <span />
            <i />
            <span />
          </div>

          <p className={styles.sectionDescription}>
            {realisations.description}
          </p>
        </motion.header>
      </div>

      <motion.div
        className={styles.marqueeArea}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.marqueeRow}>
          <div className={`${styles.marqueeTrack} ${styles.moveLeft}`}>
            {allLogos.map((logo, index) => (
              <LogoCard key={`${logo.name}-${index}`} logo={logo} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
