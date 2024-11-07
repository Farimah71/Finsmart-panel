import { useSelector, useDispatch } from "react-redux";
import { Button } from "../../../../../../components";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import {
  previousStep,
  resetStep,
} from "../../../../../../redux/reducers/user-company";
import {
  createCompany,
  updateCompanyERP,
} from "../../../../../../redux/actions/settings/company";
import { createCompanyPacket } from "../../../../../../redux/actions/settings/company-packet";
// +++++++++++++ image imports +++++++++++++++
import logo from "../../../../../../assets/images/company-2.png";

export const Confirm = ({ closeModal, isReload }) => {
  // -------- state --------
  const [info, setInfo] = useState("");

  // -------- store --------
  const loading = useSelector((state) => state.companySlice.loading);

  // ---------- i18next ----------
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem("lng");

  // ----------- hook ------------
  const dispatch = useDispatch();

  // ----------- lifecycle ------------
  useEffect(() => {
    localStorage.creating_comp_ &&
      setInfo({
        title: companyInfo.title,
        companyActivityCategory: activityCategoryInfo.label,
        country: countryInfo.label,
        establishmentYear: companyInfo.establishmentYear,
        bio: companyInfo.bio,
        numOfEmployees: companyInfo.numberOfEmployees,
        companyPhase: companyPhaseInfo.label,
        logo: companyInfo.logo,
      });
  }, []);

  // ---------- variables -------------
  const companyInfo = JSON.parse(localStorage.creating_comp_);
  const countryInfo = JSON.parse(localStorage.comp_country_)[0];
  const companyPhaseInfo = JSON.parse(localStorage.comp_phase_)[0];
  const activityCategoryInfo = JSON.parse(
    localStorage.comp_activity_category_
  )[0];

  // ------- functions --------
  const handleSubmit = (status) => {
    if (status) {
      const companyId = JSON.parse(localStorage.company_id_);
      let companyPacket = JSON.parse(localStorage.comp_packet_);
      let companyERPSystem = JSON.parse(localStorage.comp_ERP_system_);
      const compERPToSend = { ...companyERPSystem, companyId: companyId };
      const compPacketToSend = { ...companyPacket, companyId: companyId };
      dispatch(
        createCompanyPacket(compPacketToSend, (status) =>
          ((s) => {
            if (s) {
              dispatch(
                updateCompanyERP(compERPToSend, (status) =>
                  reloadPageHandler(status)
                )
              );
            }
          })(status)
        )
      );
    }
  };
  const reloadPageHandler = (status) => {
    if (status) {
      closeModal();
      dispatch(resetStep());
      isReload();
      localStorage.removeItem("creating_comp_");
      localStorage.removeItem("comp_packet_");
      localStorage.removeItem("comp_country_");
      localStorage.removeItem("comp_ERP_system_");
      localStorage.removeItem("comp_activity_category_");
      localStorage.removeItem("company_id_");
      localStorage.removeItem("comp_phase_");
      localStorage.removeItem("num_of_employees_");
    }
  };

  // ----------- render jsx ------------
  return (
    <>
      <div className="border-2 rounded-11 flex flex-col p-4 dark:text-custom-gray-light m-3">
        <div className="flex justify-between">
          <span className="flex flex-col gap-y-3 mb-3 justify-between">
            <span className="flex gap-x-3">
              {t("text.title")}:
              <p className="capitalize font-semibold">{info.title}</p>
            </span>
            <span className="flex gap-x-3">
              {t("text.field")}:
              <p className="capitalize font-semibold">
                {info.companyActivityCategory}
              </p>
            </span>
            <span className="flex gap-x-3">
              {t("text.founded")}:
              <p className="capitalize font-semibold">
                {info.establishmentYear}
              </p>
            </span>
            <span className="flex gap-x-3">
              {t("text.location")}:
              <p className="capitalize font-semibold">{info.country}</p>
            </span>
            <span className="flex gap-x-3">
              {t("text.phase")}:
              <p className="capitalize font-semibold">{info.companyPhase}</p>
            </span>
            <span className="flex gap-x-3">
              {t("text.size")}:
              <p className="capitalize font-semibold">{info.numOfEmployees}</p>
            </span>
          </span>
          <img
            src={`data:image/jpeg;base64,${info.logo}`}
            alt="logo"
            className="w-16 h-16 aspect-square border-2 rounded-full border-blue-600"
          />
        </div>
        <span className="flex gap-x-3">
          {t("text.bio")}:
          <p className="capitalize font-semibold h-12 line-clamp-2 text-ellipsis">
            {info.bio}
          </p>
        </span>
      </div>
      <div className="mt-14 mb-2 mr-1 flex justify-end gap-x-2">
        <Button
          title={t("button.back_title")}
          theme={"light"}
          onClick={() => dispatch(previousStep())}
        />
        <Button
          title={t("button.create_title")}
          loading={loading}
          onClick={() =>
            dispatch(
              createCompany(companyInfo, (status) => handleSubmit(status))
            )
          }
        />
      </div>
    </>
  );
};
