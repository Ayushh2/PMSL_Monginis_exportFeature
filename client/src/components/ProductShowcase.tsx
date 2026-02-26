import { useTranslation } from 'react-i18next';
import { useEffect, useState, useRef } from 'react';
import { DownloadBrochure } from './DownloadBrochure';
//update
const products = [
  { id: 1, key: 'cookies', image: '/assets/cookies.png' },
  { id: 2, key: 'savoury_biscuit', image: '/assets/crispy_bite.png' },
  { id: 3, key: 'swiss_roll', image: '/assets/swissRoll.png' },
  { id: 4, key: 'special_cake_range', image: '/assets/plum_Cake.png' },
];

export function ProductShowcase() {
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

  const scrollToBrochure = () => {
    const el = document.getElementById('brochure');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
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

        {/* Product Grid
            mobile  → 1 column  (full width, easy to see detail)
            tablet  → 2 columns
            desktop → 4 columns
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`group flex flex-col rounded-2xl overflow-hidden border border-pink-100 shadow-sm bg-white ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              } transition-all duration-500`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Image Area — taller on mobile so product is really visible */}
              <div
                className="bg-[#FFF0F5] flex items-center justify-center p-6 sm:p-5"
                style={{ height: '240px' }}
              >
                <img
                  src={product.image}
                  alt={t(`products.${product.key}`)}
                  className="h-full w-full object-contain drop-shadow-md"
                  style={{ maxHeight: '200px' }}
                />
              </div>

              {/* Name Tag */}
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

        {/* Bridge Text + Scroll Button */}
        <div className="text-center mb-12">
          <p
            className={`text-gray-700 text-base sm:text-lg max-w-3xl mx-auto mb-6 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            {t('products.brochureBlurb')}
          </p>

          <button
            type="button"
            onClick={scrollToBrochure}
            className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-[#E91E8C] to-[#FF6BB5] text-white font-semibold rounded-full shadow-md"
          >
            {t('products.downloadBrochure')}
          </button>
        </div>

        {/* Download Brochure Section */}
        <DownloadBrochure />

      </div>
    </section>
  );
}