import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, MyForm, Error, Input } from "../../../../../components";
import { createCompanyBudgetHeader } from "../../../../../redux/actions/settings/company-budget-header";
import { getDataFromJwtToken } from "../../../../../helpers/get-data-from-jwt";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Field } from "formik";
import * as Yup from "yup";

export const CreateBudgetHeader = ({ onCloseModal, isReloadPage }) => {
  // -------- store ---------
  const { loading } = useSelector((state) => state.companyBudgetHeaderSlice);

  // -------- states -----------
  const [initialValue, setInitialValue] = useState({
    companyId: getDataFromJwtToken("CompanyId"),
    year: null,
    title: "",
  });

  // ---------- hook -----------
  const dispatch = useDispatch();

  // ---------- i18next ----------
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem("lng");

  // ---------- variable ------------
  const dataSchema = Yup.object().shape({
    title: Yup.string().required(t("error.title_required")),
    year: Yup.string().required(t("error.year_required")),
  });

  // ---------- function --------
  const onSubmit = (value) => {
    dispatch(
      createCompanyBudgetHeader(value, (status) => isReloadPage(status))
    );
  };

  // --------- render jsx ------------
  return (
    <>
      <div className="flex justify-between">
        <h4 className="text-18 font-bold dark:text-dark_custom-full-white p-3">
          {t("page_title.create_budget_header")}
        </h4>
        <div
          className="cursor-pointer dark:text-dark_custom-full-white p-3"
          onClick={onCloseModal}
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
      <hr />

      <MyForm
        initialValues={initialValue}
        validation={dataSchema}
        submit={onSubmit}
        classes={"p-3 dark:bg-transparent"}
      >
        <div className="w-full flex gap-x-5">
          <div className="flex flex-col w-1/2">
            <Field
              component={Input}
              name="title"
              label={t("input.title.label")}
              placeholder={t("input.title.placeholder")}
              complex
            />
            <Error name="title" />
          </div>
          <div className="flex flex-col w-1/2">
            <Field
              component={Input}
              name="year"
              type="number"
              label={t("input.year.label")}
              placeholder={t("input.year.placeholder")}
            />
            <Error name="year" />
          </div>
        </div>

        <div className="mt-5 w-fit ml-auto">
          <Field
            component={Button}
            type="submit"
            title={t("button.create_title")}
            loading={loading}
          />
        </div>
      </MyForm>
    </>
  );
};
