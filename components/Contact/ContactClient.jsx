"use client";

import { useState } from "react";
import {
  Check,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

import styles from "./Contact.module.css";
import { motion } from "framer-motion";

const benefitIconMap = { ShieldCheck, Check, Sparkles };

const containerAnimation = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemAnimation = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ContactClient({
  contactInfo,
  footerContent,
  bookingFormContent,
  contactBannerContent,
}) {
  const contactMethods = [
    {
      title: "Téléphone",
      numbers: (contactInfo.phones || []).map((phone) => ({
        value: phone.value,
        href: `tel:${phone.value.replace(/\s+/g, "")}`,
      })),
      icon: Phone,
    },
    {
      title: "E-mail",
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
      icon: Mail,
    },
    {
      title: "WhatsApp",
      value: contactInfo.whatsapp,
      href: `https://wa.me/${(contactInfo.whatsapp || "").replace(/\D/g, "")}`,
      icon: FaWhatsapp,
    },
  ];

  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState("idle"); // idle | sending | success | error

  const handleBookingChange = (event) => {
    const { name, value } = event.target;
    setBookingForm((current) => ({ ...current, [name]: value }));
  };

  const handleBookingSubmit = async (event) => {
    event.preventDefault();
    setSubmitStatus("sending");

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...bookingForm,
          recipientEmail: contactInfo.email,
        }),
      });

      if (!response.ok) {
        throw new Error("Échec de l'envoi");
      }

      setSubmitStatus("success");
      setBookingForm({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Erreur d'envoi du formulaire :", error);
      setSubmitStatus("error");
    }
  };

  return (
    <>
    <section className={styles.contactSection} id="contact">
      <div className={styles.container}>
        <motion.div
          className={styles.contactBanner}
          initial={{ opacity: 0, y: 55 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <span className={styles.decorDots} aria-hidden="true" />
          <span className={styles.decorCircle} aria-hidden="true" />
          <span className={styles.decorCrown} aria-hidden="true">
            LSRHA
          </span>

          <div className={styles.contactContent}>
            <motion.div
              className={styles.contactText}
              variants={containerAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.p className={styles.eyebrow} variants={itemAnimation}>
                {contactBannerContent.eyebrow}
              </motion.p>

              <h2 className={styles.contactTitle}>
                {contactBannerContent.title}
                <br />
                <span>{contactBannerContent.titleHighlight}</span>
              </h2>

              <motion.div
                className={styles.titleDecoration}
                variants={itemAnimation}
              >
                <span />
                <i />
              </motion.div>

              <motion.p
                className={styles.contactDescription}
                variants={itemAnimation}
              >
                {contactBannerContent.description}
              </motion.p>

              <motion.div
                className={styles.benefits}
                variants={containerAnimation}
              >
                {(contactBannerContent.benefits || []).map((benefit) => {
                  const Icon = benefitIconMap[benefit.icon] || ShieldCheck;

                  return (
                    <motion.div
                      className={styles.benefitItem}
                      key={benefit.title}
                      variants={itemAnimation}
                    >
                      <span className={styles.benefitIcon}>
                        <Icon size={19} strokeWidth={2} />
                      </span>

                      <span className={styles.benefitText}>
                        <strong>{benefit.title}</strong>
                        <small>{benefit.subtitle}</small>
                      </span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>

            <motion.div
              className={styles.contactCards}
              variants={containerAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {contactMethods.map((method) => {
                const Icon = method.icon;

                if (method.numbers) {
                  return (
                    <motion.div
                      key={method.title}
                      className={styles.contactCard}
                      variants={itemAnimation}
                    >
                      <span className={styles.contactIcon}>
                        <Icon size={31} strokeWidth={1.8} />
                      </span>

                      <span className={styles.contactLabel}>
                        {method.title}
                      </span>

                      <span className={styles.contactMultiValues}>
                        {method.numbers.map((number) => (
                          <a key={number.href} href={number.href}>
                            {number.value}
                          </a>
                        ))}
                      </span>

                      <span className={styles.cardLine} />
                    </motion.div>
                  );
                }

                return (
                  <motion.a
                    key={method.title}
                    href={method.href}
                    className={styles.contactCard}
                    target={
                      method.title === "WhatsApp" ? "_blank" : undefined
                    }
                    rel={
                      method.title === "WhatsApp"
                        ? "noreferrer"
                        : undefined
                    }
                    variants={itemAnimation}
                  >
                    <span className={styles.contactIcon}>
                      <Icon size={31} strokeWidth={1.8} />
                    </span>

                    <span className={styles.contactLabel}>
                      {method.title}
                    </span>

                    <strong>{method.value}</strong>

                    <span className={styles.cardLine} />
                  </motion.a>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>

    <section className={styles.bookingSection} id="reservation">
      <div className={styles.container}>
        <motion.div
          className={styles.bookingCard}
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className={styles.bookingHead}>
            <p className={styles.eyebrowDark}>{bookingFormContent.eyebrow}</p>
            <h3>{bookingFormContent.title}</h3>
            <p className={styles.bookingSubtitle}>
              {bookingFormContent.subtitle}
            </p>
          </div>

          <form className={styles.bookingForm} onSubmit={handleBookingSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="booking-name">
                <User size={16} /> {bookingFormContent.nameLabel}
              </label>
              <input
                id="booking-name"
                name="name"
                type="text"
                required
                placeholder={bookingFormContent.namePlaceholder}
                value={bookingForm.name}
                onChange={handleBookingChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="booking-email">
                <Mail size={16} /> {bookingFormContent.emailLabel}
              </label>
              <input
                id="booking-email"
                name="email"
                type="email"
                required
                placeholder={bookingFormContent.emailPlaceholder}
                value={bookingForm.email}
                onChange={handleBookingChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="booking-phone">
                <Phone size={16} /> {bookingFormContent.phoneLabel}
              </label>
              <input
                id="booking-phone"
                name="phone"
                type="tel"
                required
                placeholder={bookingFormContent.phonePlaceholder}
                value={bookingForm.phone}
                onChange={handleBookingChange}
              />
            </div>

            <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
              <label htmlFor="booking-message">
                {bookingFormContent.messageLabel}
              </label>
              <textarea
                id="booking-message"
                name="message"
                rows={3}
                placeholder={bookingFormContent.messagePlaceholder}
                value={bookingForm.message}
                onChange={handleBookingChange}
              />
            </div>

            <button
              type="submit"
              className={styles.formSubmit}
              disabled={submitStatus === "sending"}
            >
              {submitStatus === "sending"
                ? "Envoi en cours..."
                : bookingFormContent.submitButtonText}
            </button>

            {submitStatus === "success" && (
              <p className={styles.formSuccess}>
                Votre demande a bien été envoyée ! Nous revenons vers vous
                sous 24h.
              </p>
            )}

            {submitStatus === "error" && (
              <p className={styles.formError}>
                Une erreur est survenue, réessayez ou contactez-nous
                directement par téléphone.
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>

    <section className={styles.footerSection}>
      <div className={styles.container}>
        <footer className={styles.footer}>
          <div className={styles.footerGrid}>
            <div className={styles.footerBrand}>
              <h3>LSRHA AGENCY</h3>

              <p className={styles.brandTagline}>
                MARKETING • BRANDING • STRATEGY
              </p>

              <p className={styles.brandDescription}>
                {footerContent.brandDescription}
              </p>
            </div>

            {(footerContent.columns || []).map((group) => (
              <div className={styles.footerColumn} key={group.title}>
                <h4>{group.title}</h4>

                <ul>
                  {(group.links || []).map((link) => (
                    <li key={link.label}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className={styles.footerContact}>
              <h4>Suivez-nous</h4>

              <div className={styles.socialLinks}>
                <a
                  href={contactInfo.facebookUrl || "#"}
                  target={contactInfo.facebookUrl ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label="Facebook"
                >
                  <FaFacebookF size={18} />
                </a>

                <a
                  href={contactInfo.instagramUrl || "#"}
                  target={contactInfo.instagramUrl ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label="Instagram"
                >
                  <FaInstagram size={19} />
                </a>
              </div>

              <h4 className={styles.addressTitle}>Adresse</h4>

              <div className={styles.address}>
                <MapPin size={22} />

                <span>
                  {(contactInfo.addressLines || []).map((line, index) => (
                    <span key={line}>
                      {line}
                      {index < contactInfo.addressLines.length - 1 && <br />}
                    </span>
                  ))}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p>
              © {new Date().getFullYear()} LSRHA Agency. Tous droits réservés.
            </p>

            <div>
              {(footerContent.legalLinks || []).map((link) => (
                <a href={link.href} key={link.label}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </section>
    </>
  );
}