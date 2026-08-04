const stats = [
  { num: "150+", label: "PROJETS RÉALISÉS" },
  { num: "98%", label: "CLIENTS SATISFAITS" },
  { num: "5+", label: "ANNÉES D'EXPÉRIENCE" },
  { num: "30+", label: "EXPERTS PASSIONNÉS" },
];

export default function Stats() {
  return (
    <div
      className="px-6 md:px-12 py-8 flex justify-around flex-wrap gap-4 text-center"
      style={{ background: "linear-gradient(90deg, #5c0708, #B80E13)" }}
    >
      {stats.map((s) => (
        <div key={s.label}>
          <div className="font-heading text-2xl text-brand-goldLight">{s.num}</div>
          <div className="text-[10px] text-[#f3e2c2] tracking-wide">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
