import Services from "@/components/Services/Services";
import Contact from "@/components/Contact/Contact";

export const metadata = { title: "Services — LSRHA Agency" };

export default function ServicesPage() {
  return (
    <main>
      <Services full />
      <Contact />
    </main>
  );
}
