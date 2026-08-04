export default function Footer() {
  return (
    <footer className="bg-brand-dark text-[#cbbfae] px-6 md:px-12 pt-12 pb-6">
      <div className="flex flex-wrap justify-between gap-8 mb-8">
        <div className="max-w-xs">
          <div className="font-heading tracking-widest text-lg text-[#F7F2E7] mb-3">
            LSRHA <span className="text-brand-goldLight">AGENCY</span>
          </div>
          <p className="text-xs text-[#a8998a] leading-relaxed">
            Agence de marketing digital spécialisée dans la stratégie, le branding et la croissance.
          </p>
        </div>
        <div>
          <h5 className="text-[#F7F2E7] text-sm font-semibold mb-3">Liens rapides</h5>
          <ul className="text-xs space-y-2">
            <li>Accueil</li>
            <li>À propos</li>
            <li>Services</li>
            <li>Réalisations</li>
            <li>Blog</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h5 className="text-[#F7F2E7] text-sm font-semibold mb-3">Nos services</h5>
          <ul className="text-xs space-y-2">
            <li>Stratégie digitale</li>
            <li>Social media marketing</li>
            <li>Branding et identité</li>
            <li>Production de contenu</li>
            <li>Publicité en ligne</li>
            <li>Analytics et optimisation</li>
          </ul>
        </div>
        <div>
          <h5 className="text-[#F7F2E7] text-sm font-semibold mb-3">Contact</h5>
          <ul className="text-xs space-y-2">
            <li>contact@lsrha-agency.tn</li>
            <li>+216 92 711 705</li>
            <li>Sfax, Tunisie</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#3a231d] pt-4 text-[10px] flex flex-wrap justify-between gap-2 text-[#a8998a]">
        <span>© 2026 LSRHA Agency. Tous droits réservés.</span>
        <span>Mentions légales · Politique de confidentialité</span>
      </div>
    </footer>
  );
}
