import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import activationSucces from "../../assets/images/mail.png";
import bgImg from "../../assets/images/new.png";

export const VerifiedEmail = () => {
  // ---------- hooks -------------
  const navigate = useNavigate();

  // ---------- i18next ----------
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem("lng");

  // ---------- lifecycle -----------
  useEffect(() => {
    i18n.changeLanguage(lng);
  }, [lng]);

  // ---------- render jsx ------------
  return (
    <div className="mt-32 flex flex-col items-center gap-y-10">
      <span className="text-xl font-bold">
        {t("text.verification_email_sent")}
      </span>
      <img
        src={activationSucces}
        alt="Activation successful"
        className="w-[10%]"
      />
      <img
        src={bgImg}
        alt=""
        className="rotate-180 w-full fixed bottom-0 -z-10"
      />
    </div>
  );
};
