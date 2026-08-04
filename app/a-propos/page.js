import About from "@/components/About/About";
import Contact from "@/components/Contact/Contact";

export const metadata = {
  title: "À propos — LSRHA Agency",
  description:
    "Découvrez l'histoire, la philosophie et l'équipe de LSRHA Agency, agence de marketing digital à Sfax, Tunisie.",
};

export default function AProposPage() {
  return (
    <>
      <About />
      <Contact />
    </>
  );
}
