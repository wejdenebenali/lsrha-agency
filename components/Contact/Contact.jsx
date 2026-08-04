import ContactClient from "./ContactClient";
import { client } from "@/lib/sanity/client";
import {
  contactInfoQuery,
  footerContentQuery,
  bookingFormQuery,
  contactBannerQuery,
} from "@/lib/sanity/queries";

const fallbackContactInfo = {
  phones: [{ value: "+216 99676211" }, { value: "+216 92 60 60 58" }],
  email: "contact@lsrha.tn",
  whatsapp: "21652123456",
  addressLines: [
    "Route Tunis Km 9, Cité Ons 5",
    "Pépinière III, Bureau B8",
    "Sfax, Sakiet Ezzit 3021",
  ],
};

const fallbackFooterContent = {
  brandDescription:
    "Nous créons des connexions fortes entre les marques et leurs clients.",
  columns: [
    {
      title: "Agence",
      links: [
        { label: "À propos", href: "/a-propos" },
        { label: "Nos services", href: "#services" },
        { label: "Nos réalisations", href: "#realisations" },
        { label: "Notre méthode", href: "#process" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Stratégie Marketing", href: "#services" },
        { label: "Branding", href: "#services" },
        { label: "Marketing Digital & Publicité", href: "#services" },
        { label: "Développement Web", href: "#services" },
      ],
    },
    {
      title: "Navigation",
      links: [
        { label: "Accueil", href: "/" },
        { label: "Services", href: "#services" },
        { label: "Contact", href: "#contact" },
      ],
    },
  ],
  legalLinks: [
    { label: "Mentions légales", href: "#" },
    { label: "Politique de confidentialité", href: "#" },
  ],
};

const fallbackBookingForm = {
  eyebrow: "Contactez-nous",
  title: "Envoyez-nous votre demande",
  subtitle:
    "Indiquez vos coordonnées, nous revenons vers vous sous 24h.",
  nameLabel: "Nom complet",
  namePlaceholder: "Votre nom",
  emailLabel: "Email",
  emailPlaceholder: "vous@exemple.com",
  phoneLabel: "Téléphone",
  phonePlaceholder: "+216 99 999 999",
  messageLabel: "Message (optionnel)",
  messagePlaceholder: "Un mot sur votre projet...",
  submitButtonText: "Envoyer la demande",
};

const fallbackContactBanner = {
  eyebrow: "Contactez-nous",
  title: "Prêt à révéler",
  titleHighlight: "le potentiel de votre marque ?",
  description:
    "Parlons de vos idées et construisons ensemble une présence forte, cohérente et durable.",
  benefits: [
    { icon: "ShieldCheck", title: "Réponse rapide", subtitle: "sous 24h" },
    { icon: "Check", title: "Accompagnement", subtitle: "personnalisé" },
    { icon: "Sparkles", title: "Solutions", subtitle: "sur mesure" },
  ],
};

async function getContactInfo() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return fallbackContactInfo;
  }

  try {
    const data = await client.fetch(
      contactInfoQuery,
      {},
      { next: { revalidate: 60 } }
    );
    return data || fallbackContactInfo;
  } catch (error) {
    console.error("Erreur de chargement des coordonnées depuis Sanity :", error);
    return fallbackContactInfo;
  }
}

async function getFooterContent() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return fallbackFooterContent;
  }

  try {
    const data = await client.fetch(
      footerContentQuery,
      {},
      { next: { revalidate: 60 } }
    );
    return data || fallbackFooterContent;
  } catch (error) {
    console.error("Erreur de chargement du footer depuis Sanity :", error);
    return fallbackFooterContent;
  }
}

async function getBookingForm() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return fallbackBookingForm;
  }

  try {
    const data = await client.fetch(
      bookingFormQuery,
      {},
      { next: { revalidate: 60 } }
    );
    return data || fallbackBookingForm;
  } catch (error) {
    console.error(
      "Erreur de chargement du formulaire de réservation depuis Sanity :",
      error
    );
    return fallbackBookingForm;
  }
}

async function getContactBanner() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return fallbackContactBanner;
  }

  try {
    const data = await client.fetch(
      contactBannerQuery,
      {},
      { next: { revalidate: 60 } }
    );
    return data || fallbackContactBanner;
  } catch (error) {
    console.error(
      "Erreur de chargement de la bannière de contact depuis Sanity :",
      error
    );
    return fallbackContactBanner;
  }
}

export default async function Contact() {
  const contactInfo = await getContactInfo();
  const footerContent = await getFooterContent();
  const bookingForm = await getBookingForm();
  const contactBanner = await getContactBanner();

  return (
    <ContactClient
      contactInfo={contactInfo}
      footerContent={footerContent}
      bookingFormContent={bookingForm}
      contactBannerContent={contactBanner}
    />
  );
}
