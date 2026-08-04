"use client";
import { useState } from "react";

const categories = ["Tous", "Branding", "Social media", "Publicité", "Production"];
const projects = [
  { title: "Élégance Naturelle", tag: "Branding et packaging" },
  { title: "Luxe et Vous", tag: "Campagne social media" },
  { title: "Nexora Tech", tag: "Développement web" },
  { title: "FoodLove", tag: "Campagne publicitaire" },
];

export default function Portfolio() {
  const [active, setActive] = useState("Tous");
  return (
    <section className="px-6 md:px-12 py-16 bg-white">
      <div className="text-center mb-8">
        <p className="text-brand-red text-xs font-semibold tracking-widest">NOS RÉALISATIONS</p>
        <h2 className="font-heading text-2xl md:text-3xl mt-2">Des projets, des résultats</h2>
      </div>
      <div className="flex justify-center gap-2 flex-wrap mb-8">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`text-xs px-4 py-1.5 rounded-full border transition ${
              active === c
                ? "bg-brand-red text-white border-brand-red"
                : "border-[#e9e1d3] text-brand-muted"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {projects.map((p) => (
          <div key={p.title} className="border border-[#e9e1d3] rounded-xl overflow-hidden">
            <div className="aspect-[4/3] bg-brand-bgLight flex items-center justify-center text-[10px] tracking-wide text-[#b8a878] text-center px-2">
              VISUEL À VENIR
            </div>
            <div className="p-3">
              <h4 className="text-xs font-semibold">{p.title}</h4>
              <p className="text-[11px] text-brand-muted mt-0.5">{p.tag}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
