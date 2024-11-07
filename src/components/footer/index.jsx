import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { LanguageBox, ThemeBox } from "..";

export const Footer = () => {
  // ---------- hooks ----------
  const { t } = useTranslation();

  // ---------- render jsx ----------
  return (
    <div className="w-full text-xs md:text-base flex gap-x-2 items-center justify-center">
      <Link
        to="/terms&condition"
        className="text-custom-blue px-3 border-r-2 border-r-custom-dark border-opacity-30"
      >
        {t("link.terms_condition_title")}
      </Link>
      <Link
        to="/terms&condition"
        className="text-custom-blue px-3 border-r-2 border-r-custom-dark border-opacity-30"
      >
        {t("link.privacy_policy_title")}
      </Link>
      <LanguageBox classes="border-r-custom-dark border-opacity-30" />
      {/* <ThemeBox /> */}
    </div>
  );
};
