import { useTranslation } from 'react-i18next';
import { useEffect, useState, useRef } from 'react';

const features = [
  { key: 'legacy', icon: '🏆' },
  { key: 'scale', icon: '🌍' },
  { key: 'plants', icon: '🏭' },
  { key: 'outlets', icon: '🏪' },
  { key: 'range', icon: '🎂' },
  { key: 'trust', icon: '⭐' },
  { key: 'quality', icon: '🔬' },
  { key: 'certifications', icon: '📜' },
  { key: 'locations', icon: '📍' },
  { key: 'logistics', icon: '🚚' },
];

export function WhyMonginis() {
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

  return (
    <section id="why" ref={sectionRef} className="py-20 bg-[#FFF0F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl sm:text-4xl font-bold text-[#E91E8C] mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ fontFamily: 'Playfair Display, serif' }}>
            {t('why.title')}
          </h2>
          <p className={`text-lg text-gray-600 max-w-3xl mx-auto transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {t('why.subtitle')}
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.key}
              className={`bg-white rounded-2xl shadow-lg p-6 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {t(`why.cards.${feature.key}.title`)}
              </h3>
              <p className="text-gray-600" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {t(`why.cards.${feature.key}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
