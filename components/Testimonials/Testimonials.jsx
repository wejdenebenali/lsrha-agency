const testimonials = [
  {
    quote:
      "Une équipe professionnelle, réactive et créative. Grâce à eux, notre visibilité a explosé et nos ventes ont suivi !",
    name: "Sarah K.",
    role: "CEO — Boutique Chic",
    initials: "SK",
  },
  {
    quote:
      "LSRHA Agency a totalement transformé notre communication digitale. Résultats exceptionnels et accompagnement top.",
    name: "Yassine B.",
    role: "Fondateur — GoTravel",
    initials: "YB",
  },
  {
    quote: "Leur stratégie et leur créativité font la différence. Je recommande vivement !",
    name: "Amira D.",
    role: "Marketing Manager — TechNova",
    initials: "AD",
  },
];

export default function Testimonials() {
  return (
    <section className="px-6 md:px-12 py-16 bg-brand-bgLight">
      <div className="text-center mb-10">
        <p className="text-brand-red text-xs font-semibold tracking-widest">TÉMOIGNAGES</p>
        <h2 className="font-heading text-2xl md:text-3xl mt-2">Ils parlent de nous</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {testimonials.map((t) => (
          <div key={t.name} className="bg-white border border-[#e9e1d3] rounded-xl p-5">
            <div className="text-brand-gold text-xs mb-2" aria-label="5 étoiles">★★★★★</div>
            <p className="text-xs text-brand-muted leading-relaxed my-2">{t.quote}</p>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-brand-gold/15 text-brand-gold text-xs font-semibold flex items-center justify-center">
                {t.initials}
              </div>
              <div>
                <h5 className="text-xs font-semibold">{t.name}</h5>
                <span className="text-[10px] text-brand-muted">{t.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
