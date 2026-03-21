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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
          {/* Top row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 sm:gap-6">
            {/* Brand - col 1 on mobile, spans 1 on desktop */}
            <div className="space-y-3 sm:col-span-2 lg:col-span-1">
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
                {t("footer.tagline")}
              </p>

              {/* Social */}
              <p className="text-xs text-white/40 uppercase tracking-widest font-semibold mt-2 mb-1">{t("footer.followUs")}</p>
              <div className="flex items-center gap-3 pt-1 justify-start">
                <a
                  href="https://www.instagram.com/monginiscelebrations/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white/15 border border-white/25 hover:bg-[#E91E8C] hover:border-[#E91E8C] hover:scale-110 transition-all duration-300 shadow-lg"
                  aria-label="Instagram"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                <a
                  href="https://www.facebook.com/monginis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white/15 border border-white/25 hover:bg-[#E91E8C] hover:border-[#E91E8C] hover:scale-110 transition-all duration-300 shadow-lg"
                  aria-label="Facebook"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Contact - col 2 on mobile, spans 1 on desktop */}
            <div>
              <h4 className="text-sm font-semibold tracking-wide text-white/90 mb-2">
                {t("footer.contact")}
              </h4>

              <div className="space-y-2.5 text-sm text-white/75 min-w-0">
                <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-white transition-colors">
                  <svg className="w-4 h-4 text-white/80" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>+91 9876543210</span>
                </a>

                <a href="mailto:exports@monginis.net" className="flex items-center gap-2 hover:text-white transition-colors break-all">
                  <svg className="w-4 h-4 text-white/80" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>exports@monginis.net</span>
                </a>

                <div className="flex items-center gap-2 text-white/75">
                  <svg className="w-4 h-4 text-white/80" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.05 3.05a7 7 0 019.9 0 7 7 0 010 9.9l-4.95 4.95a1 1 0 01-1.414 0L4.636 12.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{t("footer.location")}</span>
                </div>
              </div>
            </div>

            {/* Quick Links (our website sections) - col 3 on mobile, spans 1 on desktop */}
            <div>
              <h4 className="text-sm font-semibold tracking-wide text-white/90 mb-2">
                {t("footer.quickLinks")}
              </h4>
              <ul className="space-y-2 text-sm text-white/75">
                <li>
                  <button onClick={() => scrollToSection("about")} className="hover:text-white transition-colors">
                    {t("nav.about")}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("products")} className="hover:text-white transition-colors">
                    {t("nav.products")}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("quality")} className="hover:text-white transition-colors">
                    {t("nav.quality")}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("brochure")} className="hover:text-white transition-colors">
                    {t("nav.downloadBrochure")}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("inquiry-bottom")} className="hover:text-white transition-colors">
                    {t("nav.inquiry")}
                  </button>
                </li>
              </ul>
            </div>

            {/* Highlights - col 4 on mobile, spans 1 on desktop */}
            <div>
              <h4 className="text-sm font-semibold tracking-wide text-white/90 mb-2">
                {t("footer.highlights")}
              </h4>
              <ul className="space-y-2 text-sm text-white/75">
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[#E91E8C] flex-shrink-0" />
                  <span>{t("footer.h1")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[#E91E8C] flex-shrink-0" />
                  <span>{t("footer.h2")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[#E91E8C] flex-shrink-0" />
                  <span>{t("footer.h3")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[#E91E8C] flex-shrink-0" />
                  <span>{t("footer.h4")}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            <p className="text-xs text-white/70">
              {t("footer.copyright")}
            </p>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-white/70">
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#E91E8C]" />
                {t("footer.trust1")}
              </span>
              <span className="text-white/25">•</span>
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#E91E8C]" />
                {t("footer.trust2")}
              </span>
              <span className="text-white/25">•</span>
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#E91E8C]" />
                {t("footer.trust3")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}