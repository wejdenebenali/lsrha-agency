"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import styles from "./Header.module.css";

export default function HeaderClient({ headerSettings }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navLinks = headerSettings.navLinks || [];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.brand} onClick={closeMenu}>
          <div className={styles.logoWrap}>
            <Image
              src={headerSettings.logo}
              width={160}
              height={85}
              priority
              unoptimized
              className={styles.logo}
              alt="LSRHA Crown"
            />
          </div>

          <span className={styles.separator} aria-hidden="true" />

          <div className={styles.brandText}>
            <strong>{headerSettings.brandName}</strong>
            <span>{headerSettings.tagline}</span>
          </div>
        </Link>

        <nav
          className={`${styles.nav} ${isOpen ? styles.navOpen : ""}`}
          aria-label="Navigation principale"
        >
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${
                  isActive ? styles.navLinkActive : ""
                }`}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setIsOpen((current) => !current)}
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
    </header>
  );
}

