import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", flag: "🇬🇧", name: "EN" },
  { code: "fr", flag: "🇫🇷", name: "FR" },
  { code: "ar", flag: "🇸🇦", name: "AR" },
];

export function Navbar() {
  const { t, i18n } = useTranslation();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const NAVBAR_OFFSET = 85;
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementTop - NAVBAR_OFFSET, behavior: "smooth" });
    }
    setIsMenuOpen(false);
    setIsLangOpen(false);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
    setIsLangOpen(false);
  };

  const currentCode = (i18n.language || "en").split("-")[0];
  const currentLang = languages.find((l) => l.code === currentCode) || languages[0];

  const navLinks = [
    { id: "about", label: t("nav.about") },
    {
      id: "products",
      label: `${t("nav.productsLine1")}\n${t("nav.productsLine2")}`,
      twoLine: true,
    },
    {
      id: "quality",
      label: `${t("nav.qualityLine1")}\n${t("nav.qualityLine2")}`,
      twoLine: true,
    },
    { id: "brochure", label: t("nav.downloadBrochure") },
    { id: "inquiry-top", label: t("nav.inquiry") },
  ];

  return (
    <>
      <style>{`
        .navbar-root {
          font-family: 'DM Sans', sans-serif;
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 50;
          background: #ffffff;
          transition: box-shadow 0.3s ease;
        }
        .navbar-root.scrolled {
          box-shadow: 0 6px 18px rgba(0,0,0,0.08);
        }
        .navbar-root::before {
          content: '';
          display: block;
          height: 2px;
          background: linear-gradient(90deg, #E91E8C, #ff6eb4);
        }

        /* ✅ cleaner inner layout */
        .navbar-inner {
          max-width: 1060px;
          margin: 0 auto;
          padding: 0 1rem;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          height: 64px;
          gap: 1rem;
        }

        /* ✅ Logo smaller and more compatible */
        .navbar-logo {
          display: flex;
          align-items: center;
          min-width: 120px;
        }
        .navbar-logo img {
          height: 40px;   /* smaller than before */
          width: auto;
          display: block;
          object-fit: contain;
        }

        .navbar-links {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
        }

        .nav-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.35rem 0.6rem;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          color: #444;
          border-radius: 6px;
          transition: color 0.2s, background 0.2s;
          white-space: nowrap;
          line-height: 1.05;
          text-align: center;
        }
        .nav-btn:hover {
          color: #E91E8C;
          background: #fff0f7;
        }
        .two-line {
          white-space: pre-line;
          min-width: 92px;
        }

        .navbar-right {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          flex-shrink: 0;
          justify-content: flex-end;
        }

        .contact-group {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          background: #fafafa;
          border: 1px solid #efefef;
          border-radius: 40px;
          padding: 0.28rem 0.65rem;
        }
        .contact-link {
          font-size: 0.70rem;
          font-weight: 500;
          color: #555;
          text-decoration: none;
          white-space: nowrap;
        }
        .contact-link:hover { color: #E91E8C; }
        .contact-sep {
          width: 1px;
          height: 10px;
          background: #ddd;
        }

        .lang-wrapper { position: relative; }
        .lang-btn {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          background: none;
          border: 1px solid #e8e8e8;
          border-radius: 8px;
          padding: 0.28rem 0.5rem;
          cursor: pointer;
          font-size: 0.72rem;
          font-weight: 700;
          color: #444;
        }
        .lang-btn:hover {
          border-color: #E91E8C;
          color: #E91E8C;
          background: #fff0f7;
        }
        .lang-dropdown {
          position: absolute;
          right: 0;
          top: calc(100% + 6px);
          background: #fff;
          border: 1px solid #f0f0f0;
          border-radius: 10px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
          overflow: hidden;
          min-width: 120px;
          z-index: 100;
        }
        .lang-option {
          width: 100%;
          background: none;
          border: none;
          padding: 0.6rem 0.9rem;
          font-size: 0.8rem;
          text-align: left;
          cursor: pointer;
          color: #444;
        }
        .lang-option:hover {
          background: #fff0f7;
          color: #E91E8C;
        }

        /* ✅ Burger */
        .burger {
          display: none;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 10px;
          border: 1px solid #e8e8e8;
          background: #fff;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
        }
        .burger:hover {
          border-color: #E91E8C;
          background: #fff0f7;
        }
        .burger-lines {
          width: 18px;
          height: 12px;
          display: grid;
          gap: 3px;
        }
        .burger-lines span {
          height: 2px;
          background: #444;
          border-radius: 99px;
          display: block;
        }

        /* ✅ Mobile */
        @media (max-width: 900px) {
          .navbar-inner {
            padding: 0 0.75rem;
            gap: 0.6rem;
          }

          /* keep logo left, burger right */
          .navbar-logo { min-width: auto; }
          .navbar-logo img { height: 34px; }  /* smaller mobile */

          .navbar-links { display: none; }
          .contact-group { display: none; }

          .burger { display: flex; }
          .navbar-right { gap: 0.5rem; }
        }

        /* Mobile menu */
        .mobile-menu {
          position: fixed;
          top: 66px;
          left: 0;
          right: 0;
          z-index: 60;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid #f0f0f0;
          box-shadow: 0 12px 30px rgba(0,0,0,0.08);
        }
        .mobile-inner {
          max-width: 1060px;
          margin: 0 auto;
          padding: 0.9rem 1rem 1.1rem;
          display: grid;
          gap: 0.75rem;
        }
        .mobile-links {
          display: grid;
          gap: 0.4rem;
        }
        .mobile-link {
          width: 100%;
          text-align: left;
          background: #fff;
          border: 1px solid #f0f0f0;
          border-radius: 12px;
          padding: 0.8rem 0.9rem;
          font-size: 0.95rem;
          font-weight: 700;
          color: #222;
          cursor: pointer;
        }
        .mobile-link small {
          display: block;
          margin-top: 2px;
          font-size: 0.78rem;
          font-weight: 500;
          color: #666;
        }
        .mobile-link:hover {
          border-color: #ffd0e6;
          background: #fff0f7;
          color: #E91E8C;
        }
        .mobile-contact {
          display: grid;
          gap: 0.4rem;
        }
        .mobile-contact a {
          display: block;
          text-decoration: none;
          background: #fff;
          border: 1px solid #f0f0f0;
          border-radius: 12px;
          padding: 0.75rem 0.9rem;
          color: #444;
          font-weight: 600;
          font-size: 0.92rem;
          word-break: break-word;
        }
        .mobile-contact a:hover {
          border-color: #ffd0e6;
          color: #E91E8C;
          background: #fff0f7;
        }

        .backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.18);
          z-index: 55;
        }
      `}</style>

      <nav className={`navbar-root${isScrolled ? " scrolled" : ""}`}>
        <div className="navbar-inner">
          {/* Logo (CLICKABLE - ONLY CHANGE) */}
          <div
            className="navbar-logo"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setIsMenuOpen(false);
              setIsLangOpen(false);
            }}
            style={{ cursor: "pointer" }}
          >
            <img src="/assets/logo.svg" alt="Monginis" />
          </div>

          {/* Center Nav (desktop only) */}
          <div className="navbar-links">
            {navLinks.map((link) => (
              <button
                key={link.id}
                className={`nav-btn${link.twoLine ? " two-line" : ""}`}
                onClick={() => scrollToSection(link.id)}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="navbar-right">
            {/* language stays visible (all sizes) */}
            <div className="lang-wrapper">
              <button className="lang-btn" onClick={() => setIsLangOpen(!isLangOpen)}>
                {currentLang.flag} {currentLang.name}
              </button>

              {isLangOpen && (
                <div className="lang-dropdown">
                  {languages.map((lang) => (
                    <button key={lang.code} className="lang-option" onClick={() => changeLanguage(lang.code)}>
                      {lang.flag} {lang.code === "en" ? "English" : lang.code === "fr" ? "Français" : "العربية"}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* burger appears only on mobile & stays at far right */}
            <button
              className="burger"
              aria-label="Open menu"
              onClick={() => {
                setIsMenuOpen((v) => !v);
                setIsLangOpen(false);
              }}
            >
              <span className="burger-lines" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>

            {/* desktop contact pill */}
            <div className="contact-group">
              <a href="tel:+919876543210" className="contact-link">
                +91 9876543210
              </a>
              <span className="contact-sep" />
              <a href="mailto:exports@monginis.com" className="contact-link">
                exports@monginis.com
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <>
          <div className="backdrop" onClick={() => setIsMenuOpen(false)} />
          <div className="mobile-menu">
            <div className="mobile-inner">
              <div className="mobile-links">
                {navLinks.map((link) => (
                  <button key={link.id} className="mobile-link" onClick={() => scrollToSection(link.id)}>
                    {link.label.replace("\n", " ")}
                    {link.id === "products" && <small>Cookies, Crispy Bite, Biscuits, Muffins & more</small>}
                    {link.id === "quality" && <small>FSSAI • FSSC 22000 • HALAL</small>}
                    {link.id === "brochure" && <small>Download the export brochure (PDF)</small>}
                  </button>
                ))}
              </div>

              <div className="mobile-contact">
                <a href="tel:+919876543210">Call: +91 9876543210</a>
                <a href="mailto:exports@monginis.com">Email: exports@monginis.com</a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}