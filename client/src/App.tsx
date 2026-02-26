import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InquiryForm } from './components/InquiryForm';
import { ProductShowcase } from './components/ProductShowcase';
import { About } from './components/About';
import { WhyMonginis } from './components/WhyMonginis';
import { Quality } from './components/Quality';
import { Footer } from './components/Footer';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = (i18n.language || 'en').split('-')[0];
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      <Navbar />
      <main className="w-full overflow-x-hidden">
        <Hero />
        <InquiryForm formId="inquiry-top" />
        <ProductShowcase />
        <About />
        <WhyMonginis />
        <Quality />
        <InquiryForm formId="inquiry-bottom" />
      </main>
      <Footer />
    </div>
  );
}
