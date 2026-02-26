import { useTranslation } from 'react-i18next';
import { useEffect, useState, useRef } from 'react';

export function Quality() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const certifications = [
    { name: 'FSSAI', image: '/assets/fssai.png' },
    { name: 'FSSC 22000', image: '/assets/fssc.svg' },
    { name: 'HALAL', image: '/assets/halal.png' },
  ];

  const highlights = [
    {
      icon: '🏅',
      title: t('quality.highlight1Title'),
      description: t('quality.highlight1Desc'),
    },
    {
      icon: '🔬',
      title: t('quality.highlight2Title'),
      description: t('quality.highlight2Desc'),
    },
    {
      icon: '💡',
      title: t('quality.highlight3Title'),
      description: t('quality.highlight3Desc'),
    },
  ];

  const manufacturingImages = [
    { src: '/assets/man1.jpg', alt: t('quality.facility1'), label: t('quality.facility1') },
    { src: '/assets/man2.jpg', alt: t('quality.facility2'), label: t('quality.facility2') },
    { src: '/assets/man3.jpg', alt: t('quality.facility3'), label: t('quality.facility3') },
    { src: '/assets/man4.jpg', alt: t('quality.facility4'), label: t('quality.facility4') },
  ];

  return (
    <section id="quality" ref={sectionRef} className="py-20 bg-white overflow-hidden">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .highlight-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(233,30,140,0.12) !important;
        }
        .cert-badge:hover {
          transform: scale(1.1);
          box-shadow: 0 20px 40px rgba(212,160,23,0.25) !important;
        }
        .mfg-img-wrap:hover img {
          transform: scale(1.07);
        }
        .mfg-img-wrap:hover .img-overlay {
          opacity: 1 !important;
        }
        .mfg-img-wrap:hover .img-label {
          transform: translateY(0) !important;
          opacity: 1 !important;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── 1. HEADING ── */}
        <div className="text-center mb-16">
          <h2
            className={`text-3xl sm:text-4xl font-bold text-[#E91E8C] mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {t('quality.title')}
          </h2>
          <p
            className={`text-lg text-gray-600 max-w-3xl mx-auto transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            {t('quality.subtitle')}
          </p>
        </div>

        {/* ── 2. HIGHLIGHT CARDS ── */}
        <div className="flex items-center gap-4 mb-10">
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, #fbcfe8)' }} />
          <span
            style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#E91E8C',
              fontFamily: 'DM Sans, sans-serif',
              padding: '0.3rem 1.1rem',
              borderRadius: '999px',
              background: '#fce7f3',
              border: '1px solid #fbcfe8',
              whiteSpace: 'nowrap',
            }}
          >
            {t('quality.whyChooseUs')}
          </span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, #fbcfe8)' }} />
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
          style={{ animation: isVisible ? 'fadeUp 0.6s ease 0.2s both' : 'none' }}
        >
          {highlights.map((item, i) => (
            <div
              key={i}
              className="highlight-card"
              style={{
                background: 'linear-gradient(160deg, #fff0f6 0%, #fff8fc 100%)',
                borderRadius: '1.25rem',
                border: '1px solid #fce7f3',
                padding: '2rem 1.75rem',
                boxShadow: '0 4px 20px rgba(233,30,140,0.07)',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                animation: isVisible ? `fadeUp 0.55s ease ${0.25 + i * 0.1}s both` : 'none',
              }}
            >
              <div
                style={{
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.3rem',
                  marginBottom: '1.1rem',
                  boxShadow: '0 6px 18px rgba(233,30,140,0.28)',
                }}
              >
                {item.icon}
              </div>
              <h3
                style={{
                  margin: '0 0 0.6rem',
                  fontFamily: 'Playfair Display, serif',
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  color: '#9d174d',
                  lineHeight: 1.35,
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '1rem',
                  color: '#7a5060',
                  lineHeight: 1.75,
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* ── 3. CERTIFICATION BADGES ── */}
        <div className="flex items-center gap-4 mb-10">
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, #fbcfe8)' }} />
          <span
            style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#E91E8C',
              fontFamily: 'DM Sans, sans-serif',
              padding: '0.3rem 1.1rem',
              borderRadius: '999px',
              background: '#fce7f3',
              border: '1px solid #fbcfe8',
              whiteSpace: 'nowrap',
            }}
          >
            {t('quality.certificationsTitle')}
          </span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, #fbcfe8)' }} />
        </div>

        <div
          className="flex flex-wrap justify-center gap-8 mb-20"
          style={{ animation: isVisible ? 'fadeUp 0.6s ease 0.4s both' : 'none' }}
        >
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="cert-badge bg-white rounded-full p-6 shadow-lg border-4 border-[#D4A017] transition-all duration-300"
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center">
                <img src={cert.image} alt={cert.name} className="w-full h-full object-contain" />
              </div>
            </div>
          ))}
        </div>

        {/* ── 4. MANUFACTURING IMAGES — 2x2 grid ── */}
        <div style={{ animation: isVisible ? 'fadeUp 0.6s ease 0.6s both' : 'none' }}>
          <div className="flex items-center gap-4 mb-8">
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, #fbcfe8)' }} />
            <span
              style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#E91E8C',
                fontFamily: 'DM Sans, sans-serif',
                padding: '0.3rem 1.1rem',
                borderRadius: '999px',
                background: '#fce7f3',
                border: '1px solid #fbcfe8',
                whiteSpace: 'nowrap',
              }}
            >
              {t('quality.facilitiesTitle')}
            </span>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, #fbcfe8)' }} />
          </div>

          {/* 2x2 grid — always 2 columns on both mobile and desktop */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.75rem',
              maxWidth: '700px',
              margin: '0 auto',
            }}
          >
            {manufacturingImages.map((img, i) => (
              <div
                key={i}
                className="mfg-img-wrap"
                style={{
                  borderRadius:
                    i === 0
                      ? '1.25rem 0.75rem 0.75rem 0.75rem'
                      : i === 1
                      ? '0.75rem 1.25rem 0.75rem 0.75rem'
                      : i === 2
                      ? '0.75rem 0.75rem 0.75rem 1.25rem'
                      : '0.75rem 0.75rem 1.25rem 0.75rem',
                  overflow: 'hidden',
                  position: 'relative',
                  aspectRatio: '16 / 9',
                  boxShadow: '0 6px 22px rgba(233,30,140,0.1)',
                  border: '1px solid #fce7f3',
                  cursor: 'pointer',
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                    display: 'block',
                  }}
                />

                {/* Always-visible bottom gradient */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(157,23,77,0.55) 0%, rgba(157,23,77,0.05) 45%, transparent 70%)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Hover overlay */}
                <div
                  className="img-overlay"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(157,23,77,0.12)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: 'none',
                  }}
                />

                {/* Label */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '0.6rem 0.8rem',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                  }}
                >
                  <span
                    className="img-label"
                    style={{
                      color: '#fff',
                      fontFamily: 'Playfair Display, serif',
                      fontWeight: 700,
                      fontSize: 'clamp(0.65rem, 1.8vw, 0.82rem)',
                      lineHeight: 1.3,
                      textShadow: '0 1px 4px rgba(0,0,0,0.3)',
                      transform: 'translateY(3px)',
                      opacity: 0.9,
                      transition: 'transform 0.3s ease, opacity 0.3s ease',
                    }}
                  >
                    {img.label}
                  </span>
                  <span
                    style={{
                      width: '1.4rem',
                      height: '1.4rem',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(4px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.65rem',
                      color: '#fff',
                      flexShrink: 0,
                    }}
                  >
                    ↗
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}