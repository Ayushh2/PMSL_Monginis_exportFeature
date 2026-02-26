import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const NAVBAR_OFFSET = 85;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top - NAVBAR_OFFSET, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden text-white">
      {/* ✅ Reference-style footer background (maroon gradient) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#7A0E3A] via-[#5B0A2C] to-[#2A0615]" />
      {/* subtle shine */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.20),transparent_50%)]" />
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_80%_80%,rgba(233,30,140,0.35),transparent_45%)]" />

      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          {/* Top row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="space-y-4">
              {/* ✅ smaller logo */}
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-white/10 border border-white/10 px-4 py-3">
                  <img
                    src="/assets/logo.svg"
                    alt="Monginis"
                    className="h-9 sm:h-10 w-auto opacity-95"
                  />
                </div>
              </div>

              <p className="text-sm text-white/75 leading-relaxed max-w-sm">
                {t(
                  "footer.tagline",
                  "Export-ready bakery products with consistent quality, trusted processes, and reliable packaging for global B2B partners."
                )}
              </p>

              {/* Social */}
              <div className="flex items-center gap-3 pt-1">
                <a
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/10 hover:bg-[#E91E8C] hover:border-[#E91E8C] transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                <a
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/10 hover:bg-[#E91E8C] hover:border-[#E91E8C] transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                <a
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/10 hover:bg-[#E91E8C] hover:border-[#E91E8C] transition-colors"
                  aria-label="X"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links (our website sections) */}
            <div>
              <h4 className="text-sm font-semibold tracking-wide text-white/90 mb-4">
                {t("footer.quickLinks", "Quick Links")}
              </h4>
              <ul className="space-y-2 text-sm text-white/75">
                <li>
                  <button
                    onClick={() => scrollToSection("about")}
                    className="hover:text-white transition-colors"
                  >
                    {t("nav.about", "About")}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("products")}
                    className="hover:text-white transition-colors"
                  >
                    {t("nav.products", "Product Category")}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("quality")}
                    className="hover:text-white transition-colors"
                  >
                    {t("nav.quality", "Quality & Certifications")}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("brochure")}
                    className="hover:text-white transition-colors"
                  >
                    {t("nav.brochure", "Brochure")}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("inquiry-top")}
                    className="hover:text-white transition-colors"
                  >
                    {t("nav.inquiry", "Inquiry")}
                  </button>
                </li>
              </ul>
            </div>

            {/* Highlights */}
            <div>
              <h4 className="text-sm font-semibold tracking-wide text-white/90 mb-4">
                {t("footer.highlights", "Highlights")}
              </h4>
              <ul className="space-y-2 text-sm text-white/75">
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[#E91E8C] flex-shrink-0" />
                  <span>{t("footer.h1", "Export-ready product range")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[#E91E8C] flex-shrink-0" />
                  <span>{t("footer.h2", "Consistent quality standards")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[#E91E8C] flex-shrink-0" />
                  <span>{t("footer.h3", "Packaging & logistics support")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[#E91E8C] flex-shrink-0" />
                  <span>{t("footer.h4", "Fast inquiry & quotation process")}</span>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-semibold tracking-wide text-white/90 mb-4">
                {t("footer.contact", "Contact")}
              </h4>

              <div className="space-y-3 text-sm text-white/75">
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4 text-white/80" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>+91 9876543210</span>
                </a>

                <a
                  href="mailto:exports@monginis.com"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4 text-white/80" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>exports@monginis.com</span>
                </a>

                <div className="flex items-center gap-2 text-white/75">
                  <svg className="w-4 h-4 text-white/80" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.05 3.05a7 7 0 019.9 0 7 7 0 010 9.9l-4.95 4.95a1 1 0 01-1.414 0L4.636 12.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{t("footer.location", "Mumbai, Maharashtra, India")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            <p className="text-xs text-white/70">
              {t("footer.copyright", "© 2025 Monginis. All Rights Reserved.")}
            </p>

            <div className="flex items-center gap-3 text-xs text-white/70">
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#E91E8C]" />
                {t("footer.trust1", "Secure communication")}
              </span>
              <span className="text-white/25">•</span>
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#E91E8C]" />
                {t("footer.trust2", "Export inquiry support")}
              </span>
              <span className="text-white/25">•</span>
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#E91E8C]" />
                {t("footer.trust3", "Quality-first process")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
