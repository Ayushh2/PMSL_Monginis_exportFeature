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

  return (
    <section id="quality" ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl sm:text-4xl font-bold text-[#E91E8C] mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ fontFamily: 'Playfair Display, serif' }}>
            {t('quality.title')}
          </h2>
          <p className={`text-lg text-gray-600 max-w-3xl mx-auto transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {t('quality.subtitle')}
          </p>
        </div>

        {/* Certification Badges */}
        <div className={`flex flex-wrap justify-center gap-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="group bg-white rounded-full p-6 shadow-lg border-4 border-[#D4A017] transition-all duration-300 hover:shadow-2xl hover:scale-110"
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center">
                <img
                  src={cert.image}
                  alt={cert.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
