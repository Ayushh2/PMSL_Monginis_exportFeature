import { useTranslation } from 'react-i18next';
import { useEffect, useState, useRef } from 'react';
import { DownloadBrochure } from './DownloadBrochure';

const products = [
  { id: 1, key: 'cookies', image: '/assets/cookies.png' },
  { id: 2, key: 'savoury_biscuit', image: '/assets/crispy_bite.png' },
  { id: 3, key: 'swiss_roll', image: '/assets/swissRoll.png' },
  { id: 4, key: 'special_cake_range', image: '/assets/plum_Cake.png' },
];

const allProducts = [
  { id: 1, key: 'cookies', image: '/assets/cookies.png' },
  { id: 2, key: 'khari', image: '/assets/khari.png' },
  { id: 3, key: 'twisted_khari', image: '/assets/twisted_khari.png' },
  { id: 4, key: 'rusk', image: '/assets/elaichi_rusk.png' },
  { id: 5, key: 'savoury_biscuit', image: '/assets/crispy_bite.png' },
  { id: 6, key: 'bar_cake', image: '/assets/chocoBar.png' },
  { id: 7, key: 'muffins', image: '/assets/mufffins.png' },
  { id: 8, key: 'swiss_roll', image: '/assets/swissRoll.png' },
  { id: 9, key: 'tiffin_cake', image: '/assets/tiffinCake.png' },
  { id: 10, key: 'slice_cake', image: '/assets/slice_cake.png' },
  { id: 11, key: 'special_cakes_range', image: '/assets/dhundeeee.png' },
];

export function ProductShowcase() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
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

  useEffect(() => {
    document.body.style.overflow = showModal ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [showModal]);

  const scrollToBrochure = () => {
    setShowModal(false);
    setTimeout(() => {
      const el = document.getElementById('brochure');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  return (
    <>
      {/* ── GLOBAL STYLES for hover ── */}
      <style>{`
        .product-card { transition: transform 0.25s ease, box-shadow 0.25s ease; cursor: default; }
        .product-card:hover { transform: translateY(-6px); box-shadow: 0 16px 40px rgba(233,30,140,0.14) !important; }
        .product-card:hover .product-img { transform: scale(1.06); }
        .product-img { transition: transform 0.3s ease; }

        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.94) translateY(24px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes cardPop {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .pc-card { transition: transform 0.22s ease, box-shadow 0.22s ease; }
        .pc-card:hover { transform: translateY(-5px); box-shadow: 0 12px 32px rgba(233,30,140,0.15) !important; }
        .pc-card:hover .pc-img { transform: scale(1.07); }
        .pc-img { transition: transform 0.28s ease; }
        .pc-close:hover { background: #be185d !important; transform: rotate(90deg); }
      `}</style>

      {/* ── MODAL ── */}
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(100, 20, 60, 0.55)',
            backdropFilter: 'blur(7px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
        >
          {/* Modal Box */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(160deg, #fff0f6 0%, #fff8fc 100%)',
              borderRadius: '1.5rem',
              width: '100%',
              maxWidth: '960px',
              maxHeight: '88vh',
              overflowY: 'auto',
              boxShadow: '0 28px 70px rgba(180,30,80,0.25), 0 0 0 1px #fce7f3',
              padding: '2.25rem 2rem 2rem',
              position: 'relative',
              animation: 'modalIn 0.32s cubic-bezier(0.34,1.5,0.64,1) both',
            }}
          >
            {/* Close */}
            <button
              className="pc-close"
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: '1.1rem',
                right: '1.1rem',
                width: '2.25rem',
                height: '2.25rem',
                borderRadius: '50%',
                background: '#E91E8C',
                color: '#fff',
                border: 'none',
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 3px 10px rgba(233,30,140,0.4)',
                transition: 'background 0.2s, transform 0.3s',
              }}
            >
              ✕
            </button>

            {/* Modal Header */}
            <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
              <span
                style={{
                  display: 'inline-block',
                  background: '#fce7f3',
                  color: '#E91E8C',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  padding: '0.28rem 1rem',
                  borderRadius: '999px',
                  border: '1px solid #fbcfe8',
                  marginBottom: '0.65rem',
                }}
              >
                {t('products.fullRange')}
              </span>

              <h2
                style={{
                  margin: '0 0 0.35rem',
                  fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                  fontWeight: 800,
                  color: '#9d174d',
                  fontFamily: 'Playfair Display, serif',
                }}
              >
                {t('products.allCategoriesTitle')}
              </h2>

              <p style={{ color: '#b07090', fontSize: '0.85rem', margin: 0, fontFamily: 'DM Sans, sans-serif' }}>
                {t('products.allCategoriesSubtitle')}
              </p>
            </div>

            {/* Products Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(148px, 1fr))',
                gap: '1rem',
              }}
            >
              {allProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="pc-card"
                  style={{
                    background: '#fff',
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    border: '1px solid #fce7f3',
                    boxShadow: '0 3px 12px rgba(200,60,100,0.07)',
                    animation: `cardPop 0.35s ease ${index * 0.04}s both`,
                  }}
                >
                  <div
                    style={{
                      background: '#FFF0F5',
                      height: '125px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0.75rem',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      className="pc-img"
                      src={product.image}
                      alt={t(`products.${product.key}`)}
                      style={{
                        maxHeight: '105px',
                        maxWidth: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  </div>

                  <div
                    style={{
                      padding: '0.55rem 0.7rem 0.7rem',
                      textAlign: 'center',
                      borderTop: '1px solid #fce7f3',
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontWeight: 700,
                        fontSize: '0.78rem',
                        color: '#9d174d',
                        lineHeight: 1.3,
                        fontFamily: 'DM Sans, sans-serif',
                      }}
                    >
                      {t(`products.${product.key}`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Modal Footer ── */}
            <div
              style={{
                marginTop: '2rem',
                padding: '2rem',
                borderRadius: '1.25rem',
                background: 'linear-gradient(135deg, #fff0f6, #fce7f3)',
                border: '1px solid #fbcfe8',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '1.25rem',
              }}
            >
              <div
                style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 6px 18px rgba(233,30,140,0.3)',
                  fontSize: '1.1rem',
                }}
              >
                📋
              </div>

              <div>
                <p
                  style={{
                    margin: '0 0 0.4rem',
                    fontWeight: 800,
                    fontSize: '1.05rem',
                    color: '#9d174d',
                    fontFamily: 'Playfair Display, serif',
                    letterSpacing: '0.01em',
                  }}
                >
                  {t('products.modalTitle')}
                </p>

                <p
                  style={{
                    margin: 0,
                    color: '#b07090',
                    fontSize: '0.88rem',
                    fontFamily: 'Cormorant Garamond, serif',
                    lineHeight: 1.7,
                    maxWidth: '480px',
                  }}
                >
                  {t('products.brochureBlurb')}
                </p>
              </div>

              <button
                type="button"
                onClick={scrollToBrochure}
                className="group inline-flex items-center gap-2.5 text-white font-semibold rounded-full transition-all duration-300 hover:-translate-y-1"
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.9rem',
                  padding: '0.8rem 2.25rem',
                  background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)',
                  boxShadow: '0 8px 28px rgba(233,30,140,0.35)',
                  letterSpacing: '0.03em',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 12px 36px rgba(233,30,140,0.48)')}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 8px 28px rgba(233,30,140,0.35)')}
              >
                {t('products.downloadBrochure')}
                <span
                  className="inline-flex items-center justify-center w-5 h-5 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.25)', fontSize: '0.75rem' }}
                >
                  ↓
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MAIN PAGE ── */}
      <section id="products" ref={sectionRef} className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Heading */}
          <div className="text-center mb-10">
            <h2
              className={`text-3xl sm:text-4xl font-bold text-[#E91E8C] mb-3 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {t('products.title')}
            </h2>
            <p
              className={`text-lg text-gray-600 max-w-3xl mx-auto transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              {t('products.subtitle')}
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
            {products.map((product, index) => (
              <div
                key={product.id}
                className={`product-card group flex flex-col rounded-2xl overflow-hidden border border-pink-100 shadow-sm bg-white ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                } transition-all duration-500`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="bg-[#FFF0F5] flex items-center justify-center p-6 sm:p-5" style={{ height: '240px' }}>
                  <img
                    src={product.image}
                    alt={t(`products.${product.key}`)}
                    className="product-img h-full w-full object-contain drop-shadow-md"
                    style={{ maxHeight: '200px' }}
                  />
                </div>

                <div
                  className="flex items-center justify-center px-4 py-3 bg-white border-t border-pink-100"
                  style={{ minHeight: '52px' }}
                >
                  <h3
                    className="text-base sm:text-[15px] font-semibold text-gray-800 text-center leading-tight tracking-wide"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {t(`products.${product.key}`)}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* ── Explore All Categories — centered, premium ── */}
          <div className="flex flex-col items-center gap-3 mb-12 mt-2">
            <div className="flex items-center gap-2">
              <div style={{ height: '1px', width: '1rem', flexShrink: 0, background: 'linear-gradient(to right, transparent, #f9a8d4)' }} />
              <p
                className="font-semibold text-[#E91E8C] whitespace-nowrap"
                style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}
              >
                {t('products.signatureCollections')}
              </p>
              <div style={{ height: '1px', width: '1rem', flexShrink: 0, background: 'linear-gradient(to left, transparent, #f9a8d4)' }} />
            </div>

            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="group inline-flex items-center gap-2.5 text-white font-semibold rounded-full transition-all duration-300 hover:-translate-y-1"
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.95rem',
                padding: '0.85rem 2.5rem',
                background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)',
                boxShadow: '0 8px 30px rgba(233,30,140,0.35), 0 2px 8px rgba(233,30,140,0.2)',
                letterSpacing: '0.03em',
                border: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 14px 40px rgba(233,30,140,0.45), 0 4px 12px rgba(233,30,140,0.25)')}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 8px 30px rgba(233,30,140,0.35), 0 2px 8px rgba(233,30,140,0.2)')}
            >
              {t('products.exploreAll')}
              <span
                className="inline-flex items-center justify-center w-6 h-6 rounded-full"
                style={{ background: 'rgba(255,255,255,0.25)', fontSize: '0.85rem' }}
              >
                ↗
              </span>
            </button>

            <p className="text-pink-300 tracking-wide" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '0.82rem' }}>
              {t('products.categoryList')}
            </p>
          </div>

          {/* Download Brochure Section */}
          <div id="brochure">
            <DownloadBrochure />
          </div>

        </div>
      </section>
    </>
  );
}