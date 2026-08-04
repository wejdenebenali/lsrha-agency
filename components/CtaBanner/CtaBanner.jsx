export default function CtaBanner() {
  return (
    <section className="bg-brand-red px-6 md:px-12 py-10 flex flex-wrap items-center justify-between gap-6">
      <div>
        <h3 className="font-heading text-2xl md:text-3xl text-white">
          Prêt à faire décoller votre business ?
        </h3>
        <p className="text-white/80 text-sm mt-2 max-w-md">
          Discutons de votre projet et construisons ensemble votre succès.
        </p>
      </div>
      <a
        href="/contact"
        className="bg-brand-gold text-[#2b1a05] font-semibold text-sm px-6 py-3 rounded-lg flex items-center gap-2 hover:brightness-105 transition-all whitespace-nowrap"
      >
        Contactez-nous <span aria-hidden>→</span>
      </a>
    </section>
  );
}
