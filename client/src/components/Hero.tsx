import { useTranslation } from "react-i18next";
import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Sparkles, Heart, Star, Cake, Gift } from "lucide-react";

const products = [
  {
    id: 1,
    nameKey: "hero.products.sliceCakeChocolate.name",
    tagKey: "hero.products.sliceCakeChocolate.tag",
    image: "/assets/slice_cake.png",
  },
  {
    id: 2,
    nameKey: "hero.products.surtiMakhaniya.name",
    tagKey: "hero.products.surtiMakhaniya.tag",
    image: "/assets/Surti_Makhaniya.png",
  },
  {
    id: 3,
    nameKey: "hero.products.chocoBarCake.name",
    tagKey: "hero.products.chocoBarCake.tag",
    image: "/assets/chocoBar.png",
  },
  {
    id: 4,
    nameKey: "hero.products.tiffinCake.name",
    tagKey: "hero.products.tiffinCake.tag",
    image: "/assets/tiffinCake.png",
  },
  {
    id: 5,
    nameKey: "hero.products.almondDundeeCake.name",
    tagKey: "hero.products.almondDundeeCake.tag",
    image: "/assets/dhundeeee.png",
  },
];

export function Hero() {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 800);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const currentProduct = products[currentIndex];

  return (
    <section className="relative w-full min-h-[700px] lg:min-h-[750px] overflow-hidden font-sans bg-gradient-to-br from-[#FFF5F7] via-[#FFE8F0] to-[#FFD6E8]">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-80 h-80 bg-[#E91E8C] opacity-10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#FF6BB5] opacity-15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#F472B6] opacity-10 rounded-full blur-3xl" />

        {/* Floating Icons */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute text-[#E91E8C] opacity-20 animate-float"
            style={{
              left: `${5 + i * 18}%`,
              top: `${15 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            {i % 3 === 0 ? (
              <Heart className="w-8 h-8 fill-current" />
            ) : i % 3 === 1 ? (
              <Star className="w-8 h-8 fill-current" />
            ) : (
              <Cake className="w-8 h-8" />
            )}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[600px]">
          {/* LEFT SIDE - Static Content */}
          <div className="space-y-8">

            {/* Sparkle Badge — mt-4 added for mobile breathing room from navbar */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-sm border border-[#E91E8C]/20 shadow-lg mt-4 sm:mt-6 lg:mt-0">
              <Sparkles className="w-5 h-5 text-[#E91E8C]" />
              <span className="text-sm font-bold text-[#E91E8C] tracking-wide">
                {t("hero.badge")}
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight"
                style={{
                  fontFamily: "'Playfair Display', 'Georgia', serif",
                  background:
                    "linear-gradient(135deg, #E91E8C 0%, #9C27B0 50%, #E91E8C 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Monginis
              </h1>

              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight"
                style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
              >
                {t("hero.headline")}
              </h2>
            </div>

            {/* Subtitle */}
            <p
              className="text-xl text-gray-600 font-medium max-w-lg"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {t("hero.subheadingPrefix")}{" "}
              <span className="text-[#E91E8C] font-bold">{t("hero.subheadingHighlight")}</span>{" "}
              {t("hero.subheadingSuffix")}
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full border border-[#E91E8C]/10 shadow-sm">
                <Gift className="w-5 h-5 text-[#E91E8C]" />
                <span className="text-sm font-semibold text-gray-700">
                  {t("hero.trust1")}
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full border border-[#E91E8C]/10 shadow-sm">
                <Heart className="w-5 h-5 text-[#E91E8C]" />
                <span className="text-sm font-semibold text-gray-700">
                  {t("hero.trust2")}
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => scrollToSection("products")}
                className="group px-8 py-4 bg-gradient-to-r from-[#E91E8C] to-[#FF6BB5] text-white font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                {t("hero.cta1")}
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => scrollToSection("inquiry-bottom")}
                className="px-8 py-4 border-2 border-[#E91E8C] text-[#E91E8C] font-bold rounded-full hover:bg-[#E91E8C] hover:text-white transition-all duration-300 transform hover:scale-105 bg-white shadow-lg"
              >
                {t("hero.cta2")}
              </button>
            </div>
          </div>

          {/* RIGHT SIDE - Product Showcase Box */}
          <div className="relative flex justify-center items-center">
            {/* Decorative Ring */}
            <div className="absolute w-[450px] h-[450px] border-2 border-dashed border-[#E91E8C]/20 rounded-full animate-spin-slow" />
            <div className="absolute w-[380px] h-[380px] border border-[#E91E8C]/10 rounded-full" />

            {/* Main Product Card */}
            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-[#E91E8C]/10 p-8 w-full max-w-md">
              {/* Pink Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#E91E8C] to-[#FF6BB5] rounded-3xl blur-xl opacity-20" />

              <div className="relative">
                {/* Tag Badge */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-[#E91E8C] to-[#FF6BB5] text-white text-xs font-bold rounded-full shadow-lg z-10">
                  {t(currentProduct.tagKey)}
                </div>

                {/* Product Image Container */}
                <div className="relative h-[280px] flex items-center justify-center bg-gradient-to-b from-[#FFF5F7] to-white rounded-2xl mb-6 overflow-hidden">
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-4 left-4 w-8 h-8 bg-[#E91E8C]/20 rounded-full" />
                    <div className="absolute bottom-4 right-4 w-12 h-12 bg-[#FF6BB5]/20 rounded-full" />
                    <div className="absolute top-1/2 right-8 w-6 h-6 bg-[#E91E8C]/10 rounded-full" />
                  </div>

                  <div className="relative w-full h-full flex items-center justify-center p-6">
                    {products.map((product, index) => (
                      <div
                        key={product.id}
                        className={`absolute inset-0 flex items-center justify-center transition-all duration-600 ease-out ${
                          index === currentIndex
                            ? "opacity-100 scale-100 translate-y-0"
                            : "opacity-0 scale-90 translate-y-4"
                        }`}
                      >
                        <img
                          src={product.image}
                          alt={t(product.nameKey)}
                          className="max-w-full max-h-full w-auto h-auto object-contain drop-shadow-xl"
                          style={{
                            filter: "drop-shadow(0 20px 40px rgba(233, 30, 140, 0.2))",
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="absolute top-4 right-4 px-3 py-1 bg-[#E91E8C] text-white text-xs font-bold rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {t("hero.newBadge")}
                  </div>
                </div>

                {/* Product Name */}
                <div className="text-center space-y-2">
                  <h3
                    className="text-2xl font-bold text-gray-800"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {t(currentProduct.nameKey)}
                  </h3>
                  <div className="flex items-center justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#FFB800] fill-current" />
                    ))}
                    <span className="text-sm text-gray-500 ml-2">
                      {t("hero.reviews")}
                    </span>
                  </div>
                </div>

                {/* Navigation Dots */}
                <div className="flex justify-center gap-2 mt-6">
                  {products.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? "bg-[#E91E8C] w-8"
                          : "bg-[#E91E8C]/30 hover:bg-[#E91E8C]/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Side Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute -left-4 lg:-left-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-xl border border-[#E91E8C]/20 flex items-center justify-center text-[#E91E8C] hover:bg-[#E91E8C] hover:text-white transition-all duration-300 hover:scale-110 z-20"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute -right-4 lg:-right-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-xl border border-[#E91E8C]/20 flex items-center justify-center text-[#E91E8C] hover:bg-[#E91E8C] hover:text-white transition-all duration-300 hover:scale-110 z-20"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#E91E8C]/10">
        <div
          className="h-full transition-all duration-500 ease-out rounded-full"
          style={{
            width: `${((currentIndex + 1) / products.length) * 100}%`,
            background: "linear-gradient(90deg, #E91E8C 0%, #FF6BB5 100%)",
          }}
        />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;500;700&display=swap');

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-float {
          animation: float 5s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
}