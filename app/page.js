import Hero from "@/components/Hero/Hero";
import Services from "@/components/Services/Services";
import About from "@/components/About/About";
import Portfolio from "@/components/Portfolio/Portfolio";
import Contact from "@/components/Contact/Contact";
import WhyUs from "@/components/WhyUs/WhyUs";
import Realisations from "@/components/Realisations/Realisations";
import Process from "@/components/Process/Process";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <WhyUs />
      <Realisations />
      <Process />
      <Contact />
    </main>
  );
}