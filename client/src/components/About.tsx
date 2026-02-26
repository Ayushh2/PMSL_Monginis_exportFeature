import { useTranslation } from 'react-i18next';
import { useEffect, useState, useRef } from 'react';

export function About() {
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <div className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative">
              {/* Pink border accent */}
              <div className="absolute -inset-4 border-4 border-[#E91E8C] rounded-3xl transform -rotate-3"></div>
              <img
                src="/assets/store.png"
                alt="Monginis Store"
                className="relative rounded-3xl shadow-xl w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Right side - Text content */}
          <div className={`space-y-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#E91E8C]" style={{ fontFamily: 'Playfair Display, serif' }}>
              {t('about.title')}
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              {t('about.description')}
            </p>
            <button
              onClick={() => scrollToSection('quality')}
              className="px-8 py-4 border-2 border-[#E91E8C] text-[#E91E8C] font-semibold rounded-full hover:bg-gradient-to-r hover:from-[#E91E8C] hover:to-[#FF6BB5] hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              {t('about.viewDetails')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
