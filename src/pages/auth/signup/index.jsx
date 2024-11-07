import React from "react";
import { lazily } from "react-lazily";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const { PersonalInfo } = lazily(() => import("../../../components"));

export const Signup = () => {
  // ---------- states ----------

  // ---------- hooks ----------
  const { t } = useTranslation();

  // ---------- functions ----------

  // ---------- render jsx ----------
  return (
    <div className="z-50 mt-24 flex flex-col items-center gap-y-8 w-full no-scroll">
      <div className="flex flex-col justify-center items-center w-full">
        {/* form render */}
        <div className="w-[75%] max-w-[600px] flex justify-center">
          <PersonalInfo />
        </div>

        <p className="text-14 text-left mt-6 mb-12">
          {t("login.dont_account_title")}{" "}
          <Link to="/login" className="text-custom-blue">
            {t("signup.login_link_title")}
          </Link>
        </p>
      </div>
    </div>
  );
};
