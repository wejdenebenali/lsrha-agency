import HeaderClient from "./HeaderClient";
import { client } from "@/lib/sanity/client";
import { headerSettingsQuery } from "@/lib/sanity/queries";

const fallbackHeaderSettings = {
  logo: "/images/lsrha-crown-transparent.png",
  brandName: "LSRHA AGENCY",
  tagline: "Marketing · Branding · Strategy",
  navLinks: [
    { label: "Accueil", href: "/" },
    { label: "Services", href: "/services" },
    { label: "À propos", href: "/a-propos" },
    { label: "Contact", href: "/contact" },
  ],
};

async function getHeaderSettings() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return fallbackHeaderSettings;
  }

  try {
    const data = await client.fetch(
      headerSettingsQuery,
      {},
      { next: { revalidate: 60 } }
    );
    return data && data.logo ? data : fallbackHeaderSettings;
  } catch (error) {
    console.error(
      "Erreur de chargement de l'en-tête depuis Sanity :",
      error
    );
    return fallbackHeaderSettings;
  }
}

export default async function Header() {
  const headerSettings = await getHeaderSettings();

  return <HeaderClient headerSettings={headerSettings} />;
}
