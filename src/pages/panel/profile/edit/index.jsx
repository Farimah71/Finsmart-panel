import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { CompanyInformation } from "../edit/form/company-information";
import { ERP } from "../edit/form/ERP";

export const EditCompany = ({ onCloseModal, isReload }) => {
  // ---------- states --------
  const [step, setStep] = useState(0);

  // ---------- store ---------
  const { editInfo } = useSelector((state) => state.companySlice);

  // ---------- i18next ----------
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem("lng");

  // ----------render jsx----------
  return (
    <>
      <div className="w-full px-4 py-3 flex justify-between items-center border-b border-gray-200">
        <p className="text-xl dark:text-custom-gray-light">
          {t("page_title.edit_company")}
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
      <div className={`w-full flex ${step == 0 && "h-[80vh]"}`}>
        <div className="w-2/5 flex flex-col gap-6 col-span-1 border-r p-4 pb-6">
          <div
            className={`flex items-center cursor-pointer gap-2 ${
              step == 0
                ? "text-black dark:text-dark_custom-full-white font-semibold"
                : "text-gray-400"
            }`}
            onClick={() => step == 1 && setStep(0)}
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
            className={`flex items-center gap-2 cursor-pointer ${
              step == 1
                ? "dark:text-dark_custom-full-white text-black font-semibold"
                : "text-gray-400"
            }`}
            onClick={() => step == 0 && setStep(1)}
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
            <div className="text-lg capitalize">{t("text.erpSystem")}</div>
          </div>
        </div>
        <div className="w-full col-span-2 p-4 h-full">
          {step == 0 && (
            <CompanyInformation
              editInfo={editInfo.data[0]}
              setStep={() => setStep(1)}
              // isReload={isReload}
            />
          )}
          {step == 1 && (
            <ERP
              editInfo={editInfo.data[0]}
              setStep={() => setStep(0)}
              isReload={isReload}
              onCloseModal={onCloseModal}
            />
          )}
        </div>
      </div>
    </>
  );
};
