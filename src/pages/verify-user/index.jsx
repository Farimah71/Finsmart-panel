import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../components";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { verifyUser } from "../../redux/actions/auth";
import activationSucces from "../../assets/images/registration.png";
import bgImg from "../../assets/images/new.png";

export const VerifyUser = () => {
  // ---------- hooks -------------
  const navigate = useNavigate();
  const url = useLocation();
  const dispatch = useDispatch();

  // ----------- variables --------
  const path = url.pathname.split("/");
  const GUID = path[path.length - 1];

  // ---------- i18next ----------
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem("lng");

  // --------- lifecycles ------------
  useEffect(() => {
    i18n.changeLanguage(lng);
  }, [lng]);
  
  useEffect(() => {
    dispatch(verifyUser({ activeToken: GUID }));
  }, []);

  // ---------- render jsx ------------
  return (
    <div className="mt-32 flex flex-col items-center gap-y-10">
      <p className="text-xl font-extrabold">{t("text.welcome_title")}</p>
      <span className="text-green-600 text-21">
        {t("text.activation_successful")}
      </span>
      <p>{t("text.invite_to_login")}</p>
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
      <Button
        title={t("button.login_title")}
        onClick={() => navigate("/")}
      />
    </div>
  );
};
