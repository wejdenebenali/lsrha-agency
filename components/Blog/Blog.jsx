export const posts = [
  {
    tag: "STRATÉGIE",
    title: "5 stratégies digitales pour booster votre croissance",
    slug: "5-strategies-digitales",
  },
  {
    tag: "RÉSEAUX SOCIAUX",
    title: "Comment créer une communauté engagée autour de votre marque",
    slug: "communaute-engagee",
  },
  {
    tag: "PUBLICITÉ",
    title: "Google Ads vs Meta Ads : lequel choisir en 2026 ?",
    slug: "google-ads-vs-meta-ads",
  },
];

export default function Blog() {
  return (
    <section className="px-6 md:px-12 py-16 bg-white">
      <div className="text-center mb-10">
        <p className="text-brand-red text-xs font-semibold tracking-widest">INSIGHTS ET CONSEILS</p>
        <h2 className="font-heading text-2xl md:text-3xl mt-2">Nos derniers articles</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {posts.map((p) => (
          <div key={p.slug} className="border border-[#e9e1d3] rounded-xl p-5">
            <span className="inline-block bg-brand-gold/10 text-brand-gold text-[9px] font-semibold px-2.5 py-1 rounded-full mb-3">
              {p.tag}
            </span>
            <h4 className="text-sm font-semibold leading-snug mb-3">{p.title}</h4>
            <a href={`/blog/${p.slug}`} className="text-brand-red text-xs font-medium">
              Lire plus →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
