import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { CompanyInformation } from "./company-information";
import { CompanyLogo } from "./company-logo";
import { Packet } from "./packet";
import { ERP } from "./ERP";
import { Confirm } from "./confirm";
// import { lazily } from "react-lazily";

// const { CompanyInformation } = lazily(() => import("./company-information"));
// const { CompanyLogo } = lazily(() => import("./company-logo"));
// const { Packet } = lazily(() => import("./packet"));
// const { ERP } = lazily(() => import("./ERP"));
// const { Confirm } = lazily(() => import("./confirm"));

export const CreateCompany = ({ onCloseModal, isReload }) => {
  // ---------- store ---------
  const step = useSelector((state) => state.userCompanySlice.step);

  // ---------- i18next ----------
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem("lng");

  // ----------render jsx----------
  return (
    <>
      <div className="w-full px-4 py-3 flex justify-between items-center border-b border-gray-200">
        <p className="text-xl dark:text-custom-gray-light">
          {t("page_title.create_company")}
        </p>
        <div
          className="cursor-pointer dark:text-dark_custom-full-white ml-auto mr-2"
          onClick={() => onCloseModal()}
        >
          <svg
            className="dark:text-dark_custom-full-white"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              opacity="0.5"
              x="6"
              y="17.3137"
              width="16"
              height="2"
              rx="1"
              transform="rotate(-45 6 17.3137)"
              fill="currentColor"
            />
            <rect
              x="7.41422"
              y="6"
              width="16"
              height="2"
              rx="1"
              transform="rotate(45 7.41422 6)"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
      <div className="w-full grid grid-cols-3 pl-2 overflow-hidden">
        <div className="w-full flex flex-col gap-6 col-span-1 border-r p-4 pb-6">
          <div
            className={`flex items-center gap-2 ${
              step == 0
                ? "text-black dark:text-dark_custom-full-white font-semibold"
                : "text-gray-400"
            }`}
          >
            <div
              className={`py-2 aspect-square ${
                step == 0
                  ? "bg-custom-blue-dark text-white p-5 pt-3 w-12"
                  : "border-2 border-dashed border-custom-gray-dark dark:border-custom-gray-light p-4 pt-2 dark:text-custom-gray-light-2 text-custom-gray-dark dark:text-custom-gray-light"
              } rounded-full`}
            >
              1
            </div>
            <div className="text-lg capitalize">
              {t("text.companyInformation")}
            </div>
          </div>

          <div
            className={`flex items-center gap-2 ${
              step == 1
                ? "dark:text-dark_custom-full-white text-black font-semibold"
                : "text-gray-400"
            }`}
          >
            <div
              className={`py-2 aspect-square ${
                step == 1
                  ? "bg-custom-blue-dark text-white p-5 pt-3 w-12"
                  : "border-2 border-dashed border-custom-gray-dark dark:border-custom-gray-light p-4 pt-2 text-custom-gray-dark dark:text-custom-gray-light"
              } rounded-full`}
            >
              2
            </div>
            <div className="text-lg capitalize">{t("text.logo")}</div>
          </div>

          <div
            className={`flex items-center gap-2 ${
              step == 2
                ? "dark:text-dark_custom-full-white text-black font-semibold"
                : "text-gray-400"
            }`}
          >
            <div
              className={`py-2 aspect-square ${
                step == 2
                  ? "bg-custom-blue-dark text-white p-5 pt-3 w-12"
                  : "border-2 border-dashed border-custom-gray-dark dark:border-custom-gray-light p-4 pt-2 text-custom-gray-dark dark:text-custom-gray-light"
              } rounded-full`}
            >
              3
            </div>
            <div className="text-lg capitalize">{t("text.selectPackage")}</div>
          </div>

          <div
            className={`flex items-center gap-2 ${
              step == 3
                ? "dark:text-dark_custom-full-white text-black font-semibold"
                : "text-gray-400"
            }`}
          >
            <div
              className={`py-2 aspect-square ${
                step == 3
                  ? "bg-custom-blue-dark text-white p-5 pt-3 w-12"
                  : "border-2 border-dashed border-custom-gray-dark dark:border-custom-gray-light p-4 pt-2 text-custom-gray-dark dark:text-custom-gray-light"
              } rounded-full`}
            >
              4
            </div>
            <div className="text-lg capitalize">{t("text.erpSystem")}</div>
          </div>

          <div
            className={`flex items-center gap-2 ${
              step == 4
                ? "dark:text-dark_custom-full-white text-black font-semibold"
                : "text-gray-400"
            }`}
          >
            <div
              className={`py-2 aspect-square ${
                step == 4
                  ? "bg-custom-blue-dark text-white p-5 pt-3 w-12"
                  : "border-2 border-dashed border-custom-gray-dark dark:border-custom-gray-light p-4 pt-2 text-custom-gray-dark dark:text-custom-gray-light"
              } rounded-full`}
            >
              5
            </div>
            <div className="text-lg capitalize">{t("text.confirm")}</div>
          </div>
        </div>
        <div className="w-full col-span-2 overflow-y-scroll">
          {step == 0 && <CompanyInformation />}
          {step == 1 && <CompanyLogo />}
          {step == 2 && <Packet />}
          {step == 3 && <ERP />}
          {step == 4 && (
            <Confirm closeModal={onCloseModal} isReload={isReload} />
          )}
        </div>
      </div>
    </>
  );
};
