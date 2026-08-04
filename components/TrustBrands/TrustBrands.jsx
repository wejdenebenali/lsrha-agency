const brands = ["Oppo", "Samsung", "Microsoft", "Airbnb", "Google", "Coca-Cola", "Iberia"];

export default function TrustBand() {
  return (
    <div className="px-6 md:px-12 py-8 bg-brand-bgLight border-b border-[#e9e1d3]">
      <p className="text-center text-[10px] tracking-widest text-brand-muted mb-4">
        ILS NOUS FONT CONFIANCE
      </p>
      <div className="flex justify-center gap-10 flex-wrap opacity-60 text-sm font-medium text-brand-muted">
        {brands.map((b) => (
          <span key={b}>{b}</span>
        ))}
      </div>
    </div>
  );
}
