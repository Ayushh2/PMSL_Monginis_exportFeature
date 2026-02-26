import { useEffect, useRef, useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { COUNTRIES } from "../utils/countries";

export function DownloadBrochure() {
  const { t, i18n } = useTranslation();

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    countryCode: "",
    phone: "",
    country: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const validatePhone10 = (v: string) => /^\d{10}$/.test(v);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const openBrochure = () => {
    const brochureHref = "/assets/monginis-brochure.pdf";
    const a = document.createElement("a");
    a.href = brochureHref;
    a.download = "monginis-brochure.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10);
    setForm((p) => ({ ...p, phone: digitsOnly }));
    if (phoneError) setPhoneError("");
    if (error) setError("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setPhoneError("");

    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const country = form.country.trim();

    if (!name || !email || !phone || !country) {
      setError(t("brochure.formError"));
      return;
    }

    if (!validatePhone10(phone)) {
      setPhoneError(t("brochure.phoneValidation"));
      return;
    }

    try {
      setSubmitting(true);
      const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

      const fullPhone = form.countryCode
        ? `${form.countryCode}${phone}`
        : phone;

      const resp = await axios.post(`${API}/api/brochure-leads`, {
        name,
        email,
        phone: fullPhone,
        country,
        language: i18n.language,
      });

      if (!resp?.data?.success) {
        setError(t("brochure.errorGeneric"));
        setSubmitting(false);
        return;
      }

      setForm({ name: "", email: "", countryCode: "", phone: "", country: "" });
      setOpen(false);
      openBrochure();
    } catch (err) {
      console.error(err);
      setError(t("brochure.errorGeneric"));
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E91E8C] focus:border-transparent outline-none bg-gray-50 focus:bg-white text-gray-800 placeholder-gray-400 text-sm";

  const labelClass =
    "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5";

  return (
    <section
      id="brochure"
      ref={sectionRef}
      className="py-16 sm:py-20 bg-[#FFF0F5]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-10 sm:mb-12">
          <h2
            className={`text-3xl sm:text-4xl font-bold text-[#E91E8C] mb-3 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            {t("brochure.sectionTitle")}
          </h2>
          <p
            className={`text-base sm:text-lg text-gray-600 max-w-3xl mx-auto transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            {t("brochure.sectionSubtitle")}
          </p>
        </div>

        {/* Card */}
        <div
          className={`transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl border border-pink-100 overflow-hidden">

              {/* Pink accent bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-[#E91E8C] to-[#FF6BB5]" />

              <div className="p-8 sm:p-10 text-center">
                {/* Icon + title row */}
                <div className="flex items-center justify-center gap-4 mb-5">
                  <div className="h-14 w-14 rounded-2xl bg-[#FFF0F5] flex items-center justify-center text-3xl shadow-sm">
                    📄
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {t("brochure.badge")}
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      {t("brochure.companyBrochure")}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100 mb-5" />

                <p className="text-gray-500 text-sm sm:text-base mb-7 max-w-lg mx-auto">
                  {t("brochure.description")}
                </p>

                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-10 py-3.5 bg-gradient-to-r from-[#E91E8C] to-[#FF6BB5] text-white font-semibold rounded-full shadow-md text-sm tracking-wide"
                >
                  <span>⬇</span>
                  {t("brochure.downloadButton")}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Popup Modal */}
        {open && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Modal Card */}
            <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-pink-100 overflow-hidden">

              {/* Pink accent bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-[#E91E8C] to-[#FF6BB5]" />

              <div className="p-6 sm:p-8">
                {/* Modal header */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <h3
                      className="text-xl sm:text-2xl font-bold text-gray-900"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      {t("brochure.popupTitle")}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {t("brochure.popupSubtitle")}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="h-9 w-9 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-400 text-sm flex-shrink-0"
                    aria-label={t("brochure.close")}
                  >
                    ✕
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">

                  {/* Name */}
                  <div>
                    <label className={labelClass}>{t("brochure.placeholderName")}</label>
                    <input
                      placeholder={t("brochure.placeholderName")}
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      className={inputClass}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className={labelClass}>{t("brochure.placeholderEmail")}</label>
                    <input
                      type="email"
                      placeholder={t("brochure.placeholderEmail")}
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      className={inputClass}
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <label className={labelClass}>{t("brochure.placeholderCountry")}</label>
                    <input
                      placeholder={t("brochure.placeholderCountry")}
                      value={form.country}
                      onChange={(e) => setForm((p) => ({ ...p, country: e.target.value }))}
                      list="brochure-countries-list"
                      className={inputClass}
                    />
                    <datalist id="brochure-countries-list">
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c} />
                      ))}
                    </datalist>
                  </div>

                  {/* Phone with compact code selector */}
                  <div>
                    <label className={labelClass}>{t("brochure.placeholderPhoneNumber")}</label>
                    <div className="flex gap-2 items-start">
                      <div className="flex flex-col" style={{ minWidth: "80px", maxWidth: "80px" }}>
                        <select
                          value={form.countryCode}
                          onChange={(e) => setForm((p) => ({ ...p, countryCode: e.target.value }))}
                          className="w-full px-2 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E91E8C] focus:border-transparent outline-none bg-gray-50 focus:bg-white text-gray-800 text-xs text-center"
                        >
                          <option value="">Code</option>
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+33">🇫🇷 +33</option>
                          <option value="+971">🇦🇪 +971</option>
                          <option value="+966">🇸🇦 +966</option>
                          <option value="+61">🇦🇺 +61</option>
                          <option value="+49">🇩🇪 +49</option>
                          <option value="+39">🇮🇹 +39</option>
                          <option value="+34">🇪🇸 +34</option>
                        </select>
                        <span className="text-[10px] text-gray-300 mt-1 pl-1">(optional)</span>
                      </div>
                      <input
                        placeholder={t("brochure.placeholderPhoneNumber")}
                        value={form.phone}
                        onChange={handlePhoneChange}
                        maxLength={10}
                        inputMode="numeric"
                        className={`${inputClass} flex-1 min-w-0`}
                      />
                    </div>
                    {phoneError && (
                      <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                        <span>⚠</span> {phoneError}
                      </p>
                    )}
                  </div>

                  {error && (
                    <div className="text-xs text-red-600 py-2.5 px-4 bg-red-50 rounded-xl border border-red-100 flex items-center gap-2">
                      <span>⚠️</span> {error}
                    </div>
                  )}

                  {/* Divider */}
                  <div className="border-t border-gray-100 pt-1" />

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 bg-gradient-to-r from-[#E91E8C] to-[#FF6BB5] text-white rounded-full font-semibold shadow-md text-sm tracking-wide disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        {t("brochure.submitting")}
                      </span>
                    ) : (
                      t("brochure.download")
                    )}
                  </button>

                  <p className="text-xs text-gray-400 text-center">
                    {t("brochure.noSpam")}
                  </p>

                </form>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}