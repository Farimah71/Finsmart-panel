import { useDispatch } from "react-redux";
import {
  MyForm,
  Input,
  Error,
  CustomDatePicker,
  Checkbox,
  Button,
} from "../../../../../../components";
import { getDataFromJwtToken } from "../../../../../../helpers/get-data-from-jwt";
import { useTranslation } from "react-i18next";
import { Field } from "formik";
import { useSelector } from "react-redux";
import { convertDateToString } from "./../../../../../../helpers/convert-date-to-string";
import { createCompanyInvest } from "../../../../../../redux/actions/settings/company-invest";
import * as Yup from "yup";

export const CompanyInvest = ({ onCloseModal, isReload }) => {
  // ---------- store ------------
  const { loading } = useSelector((state) => state.companyInvestSlice);

  // --------- hook -----------
  const dispatch = useDispatch();

  // ---------- i18next ----------
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem("lng");

  // ---------- variables ----------
  const formValues = {
    companyId: +getDataFromJwtToken("CompanyId"),
    investorId: null,
    investorName: "",
    investorCompanyId: null,
    amount: 0,
    investDate: "",
    isSuggest: false,
  };
  const dataSchema = Yup.object().shape({
    investorName: Yup.string().required(t("error.investor_name_required")),
  });

  // ----------- functions ----------
  const reloadPageHandler = (status) => {
    if (status) {
      onCloseModal();
      isReload();
    }
  };
  const onSubmit = (values) => {
    const data = {
      ...values,
      amount: +values.amount,
      investDate: convertDateToString(values.investDate),
    };
    dispatch(createCompanyInvest(data, (status) => reloadPageHandler(status)));
  };

  // ---------- render jsx ----------
  return (
    <MyForm
      initialValues={formValues}
      validation={dataSchema}
      submit={onSubmit}
      classes={"flex flex-col p-5 dark:bg-transparent"}
    >
      <div className="flex pb-2">
        <p className="text-xl dark:text-custom-gray-light">
          {t("page_title.create_investor")}
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
      <hr />

      <div className="w-full grid grid-cols-2 gap-x-6 mt-3">
        <div className="w-full flex flex-col">
          <Field
            component={Input}
            name="investorName"
            placeholder={t("input.investor_name.placeholder")}
            label={t("input.investor_name.label")}
            complex
          />
          <Error name="investorName" />
        </div>
        <div className="w-full flex flex-col">
          <Field
            component={Input}
            type="number"
            name="amount"
            placeholder={t("input.amount.placeholder")}
            label={t("input.amount.label")}
          />
          <Error name="amount" />
        </div>
      </div>
      <div className="w-full grid grid-cols-2 gap-x-6 mt-4">
        <div className="w-full flex flex-col">
          <Field
            component={CustomDatePicker}
            name="investDate"
            placeholder={t("input.invest_date.placeholder")}
            label={t("input.invest_date.label")}
          />
        </div>
        <div className="mt-10">
          <Field
            component={Checkbox}
            name="isSuggest"
            placeholder={t("input.is_suggest.placeholder")}
            label={t("input.is_suggest.label")}
          />
        </div>
      </div>
      <Button
        title={t("button.create_title")}
        classes={"ml-auto"}
        type="submit"
        loading={loading}
      />
    </MyForm>
  );
};
