Read client/src/components/Footer.tsx

Find the bottom copyright section. Replace the ENTIRE bottom section div and everything inside it with this exact code:

<div className="mt-8 pt-5 border-t border-white/10">
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
    <p className="text-xs text-white/60">
      {t("footer.copyright")}
    </p>
    <div className="flex flex-row items-center gap-3 text-xs text-white/60">
      <span className="inline-flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#E91E8C] flex-shrink-0" />
        {t("footer.trust1")}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#E91E8C] flex-shrink-0" />
        {t("footer.trust2")}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#E91E8C] flex-shrink-0" />
        {t("footer.trust3")}
      </span>
    </div>
  </div>
</div>

Do not change anything else in the file.
Keep all existing t() translation calls intact.