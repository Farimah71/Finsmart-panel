import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  RequestForgetPassword,
  ForgetPasswordNewPass,
  ForgetPasswordVerify,
} from "../../../components";

export const ForgetPassword = () => {
  // ---------- states ----------
  const [activeIndex, setActiveIndex] = useState(1);
  const [username, setUsername] = useState("");
  const [activeCode, setActiveCode] = useState("");

  // ---------- i18next ----------
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem("lng");

  // --------- lifeCycle ----------
  useEffect(() => {
    i18n.changeLanguage(lng);
  }, [lng]);

  // ---------- render jsx ----------
  return (
    <>
      <div className="w-[75%] max-w-[600px] px-5 md:px-20 py-16 bg-white rounded-11 flex flex-col gap-y-10 z-50 shadow-md">
        <div className="flex flex-col items-center gap-y-4">
          <h2 className="text-custom-dark text-base md:text-19 font-bold">
            {t("forget_password.forget_password_title")}
          </h2>
          <p className="text-custom-dark text-sm md:text-base">
            {activeIndex === 1
              ? t("forget_password.enter_information")
              : activeIndex === 2
              ? t("forget_password.enter_active_code")
              : t("forget_password.new_password")}
          </p>
        </div>
        {activeIndex === 1 ? (
          <RequestForgetPassword
            setActiveIndex={setActiveIndex}
            setUsername={setUsername}
          />
        ) : activeIndex === 2 ? (
          <ForgetPasswordVerify
            username={username}
            setActiveCode={setActiveCode}
            setActiveIndex={setActiveIndex}
          />
        ) : (
          <ForgetPasswordNewPass
            username={username}
            activeCode={activeCode}
            setActiveIndex={setActiveIndex}
          />
        )}

        <span>
          <Link to={"/"} className="text-14 text-custom-blue">
            {t("login.back_to_login_link")}
          </Link>
        </span>
      </div>
    </>
  );
};
