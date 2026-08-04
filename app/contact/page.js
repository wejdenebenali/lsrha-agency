import Contact from "@/components/Contact/Contact";
import { client } from "@/lib/sanity/client";
import { contactPageIntroQuery } from "@/lib/sanity/queries";

export const metadata = { title: "Contact — LSRHA Agency" };

const fallbackIntro = {
  title: "Contactez-nous",
  subtitle: "Un projet en tête ? Discutons-en.",
};

async function getIntro() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return fallbackIntro;
  }

  try {
    const data = await client.fetch(
      contactPageIntroQuery,
      {},
      { next: { revalidate: 60 } }
    );
    return data || fallbackIntro;
  } catch (error) {
    console.error(
      "Erreur de chargement du bandeau Contact depuis Sanity :",
      error
    );
    return fallbackIntro;
  }
}

export default async function ContactPage() {
  const intro = await getIntro();

  return (
    <main>
      <section className="px-6 md:px-12 py-14 bg-brand-bgLight text-center">
        <h1 className="font-heading text-3xl md:text-4xl text-brand-ink">
          {intro.title}
        </h1>
        <p className="text-brand-muted max-w-lg mx-auto mt-4 text-sm leading-relaxed">
          {intro.subtitle}
        </p>
      </section>
      <Contact />
    </main>
  );
}
