import React, { useState, useEffect } from "react";
import { lazily } from "react-lazily";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// ++++++++++ images import ++++++++++
// import Logo from "../../../assets/images/logo.png";

const { RequestLogin, LoginWithActiveCode } = lazily(() =>
  import("../../../components")
);

export const Login = () => {
  // ---------- store ----------
  const step = useSelector((state) => state.authSlice.loginStep);

  // ---------- states ----------
  const [userName, setUserName] = useState("");

  // ---------- i18next ----------
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem("lng");

  // --------- lifeCycle ----------
  useEffect(() => {
    i18n.changeLanguage(lng);
  }, [lng]);
  useEffect(() => {
    localStorage.removeItem("userType");
  }, []);
  // ---------- render jsx ----------
  return (
    <>
      <div className="w-[75%] max-w-[600px] flex z-0 shadow-md bg-white rounded-11 overflow-hidden">
        <div className="w-full px-5 md:px-20 flex flex-col gap-y-10 py-14">
          {/* render login forms */}
          {step === 1 && (
            <RequestLogin onSetUserName={(name) => setUserName(name)} />
          )}
          {step === 2 && <LoginWithActiveCode />}

          {step === 1 && (
            <div className="flex flex-col gap-y-2 mt-2">
              <p className="text-14">
                {t("login.dont_account_title")}{" "}
                <Link to="/signup" className="text-custom-blue">
                  {t("login.signup_link_title")}
                </Link>
              </p>
              <p className="text-14">
                <Link to="/forgetPassword" className="text-custom-blue">
                  {t("login.forgot_password_link_title")}
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
