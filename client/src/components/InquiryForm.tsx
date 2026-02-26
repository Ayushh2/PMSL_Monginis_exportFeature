import { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { COUNTRIES } from "../utils/countries";

interface InquiryFormProps {
  formId: string;
}

export function InquiryForm({ formId }: InquiryFormProps) {
  const { t, i18n } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "",
    phone: "",
    inform: "exporter",
    country: "",
    businessDetails: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [phoneError, setPhoneError] = useState("");

  const validatePhone10 = (v: string) => /^\d{10}$/.test(v);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setPhoneError("");

    if (!validatePhone10(formData.phone)) {
      setPhoneError("Phone number must be exactly 10 digits.");
      setIsSubmitting(false);
      return;
    }

    try {
      const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const fullPhone = formData.countryCode
        ? `${formData.countryCode}${formData.phone}`
        : formData.phone;

      const response = await axios.post(`${API}/api/inquiries`, {
        ...formData,
        phone: fullPhone,
        language: i18n.language,
      });

      if (response.data.success) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          countryCode: "",
          phone: "",
          inform: "exporter",
          country: "",
          businessDetails: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10);
    setFormData((p) => ({ ...p, phone: digitsOnly }));
    if (phoneError) setPhoneError("");
  };

  const inputClass =
    "w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E91E8C] focus:border-transparent outline-none bg-gray-50 focus:bg-white text-gray-800 placeholder-gray-400 text-sm";

  const labelClass = "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5";

  return (
    <section id={formId} className="py-20 bg-[#FFF8F0]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10">
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#E91E8C] mb-3"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            {t("inquiry.title")}
          </h2>
          <p className="text-base text-gray-500" style={{ fontFamily: "Cormorant Garamond, serif" }}>
            {t("inquiry.subtitle")}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-pink-50 overflow-hidden">

          {/* Pink top accent bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#E91E8C] to-[#FF6BB5]" />

          <div className="p-6 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Row 1: Name + Email */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor={`${formId}-name`} className={labelClass}>
                    {t("inquiry.name")}
                  </label>
                  <input
                    type="text"
                    id={`${formId}-name`}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    placeholder={t("inquiry.name")}
                  />
                </div>
                <div>
                  <label htmlFor={`${formId}-email`} className={labelClass}>
                    {t("inquiry.email")}
                  </label>
                  <input
                    type="email"
                    id={`${formId}-email`}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    placeholder={t("inquiry.email")}
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label htmlFor={`${formId}-phone`} className={labelClass}>
                  {t("inquiry.phone")}
                </label>
                <div className="flex gap-2 items-start">

                  {/* Compact country code block */}
                  <div className="flex flex-col" style={{ minWidth: '80px', maxWidth: '80px' }}>
                    <select
                      id={`${formId}-countryCode`}
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
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

                  {/* Phone input fills remaining space */}
                  <input
                    type="tel"
                    id={`${formId}-phone`}
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    required
                    inputMode="numeric"
                    pattern="\d{10}"
                    maxLength={10}
                    className={`${inputClass} flex-1 min-w-0`}
                    placeholder="10-digit number"
                  />
                </div>
                {phoneError && (
                  <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                    <span>⚠</span> {phoneError}
                  </p>
                )}
              </div>

              {/* Row 2: Inform + Country */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor={`${formId}-inform`} className={labelClass}>
                    {t("inquiry.inform")}
                  </label>
                  <select
                    id={`${formId}-inform`}
                    name="inform"
                    value={formData.inform}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    <option value="exporter">{t("inquiry.informOptions.exporter")}</option>
                    <option value="retailer">{t("inquiry.informOptions.retailer")}</option>
                    <option value="trader">{t("inquiry.informOptions.trader")}</option>
                  </select>
                </div>
                <div>
                  <label htmlFor={`${formId}-country`} className={labelClass}>
                    {t("inquiry.country")}
                  </label>
                  <input
                    type="text"
                    id={`${formId}-country`}
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    list={`${formId}-countries-list`}
                    className={inputClass}
                    placeholder={t("inquiry.country")}
                  />
                  <datalist id={`${formId}-countries-list`}>
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </div>
              </div>

              {/* Business Details */}
              <div>
                <label htmlFor={`${formId}-businessDetails`} className={labelClass}>
                  {t("inquiry.businessDetails")}
                </label>
                <textarea
                  id={`${formId}-businessDetails`}
                  name="businessDetails"
                  value={formData.businessDetails}
                  onChange={handleChange}
                  required
                  rows={4}
                  className={`${inputClass} resize-none`}
                  placeholder={t("inquiry.businessDetails")}
                />
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 pt-2" />

              {/* Submit */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-14 py-3.5 bg-gradient-to-r from-[#E91E8C] to-[#FF6BB5] text-white font-semibold rounded-full shadow-md text-sm tracking-wide min-w-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
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
                      Submitting...
                    </span>
                  ) : (
                    t("inquiry.submit")
                  )}
                </button>
              </div>

              {submitStatus === "success" && (
                <div className="text-center text-green-700 font-medium py-3 bg-green-50 rounded-xl border border-green-100 text-sm flex items-center justify-center gap-2">
                  <span>✅</span> {t("inquiry.success")}
                </div>
              )}
              {submitStatus === "error" && (
                <div className="text-center text-red-600 font-medium py-3 bg-red-50 rounded-xl border border-red-100 text-sm flex items-center justify-center gap-2">
                  <span>⚠️</span> {t("inquiry.error")}
                </div>
              )}

            </form>
          </div>
        </div>

      </div>
    </section>
  );
}