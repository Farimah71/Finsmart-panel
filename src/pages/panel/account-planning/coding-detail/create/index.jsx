import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Field } from "formik";
import {
  Button,
  MyForm,
  Error,
  Input,
  SelectBox,
} from "../../../../../components";
import { createFinsmartCoding } from "../../../../../redux/actions/settings/Finsmart-coding";
import * as Yup from "yup";

export const CreateCoding = ({
  headerId,
  parentId,
  parentCode,
  onCloseModal,
  isReloadPage,
}) => {
  // ---------- store ----------
  const loading = useSelector((state) => state.FinsmartCodingSlice.loading);

  // ---------- i18next ----------
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem("lng");

  // ---------- hooks ----------
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ---------- variables ----------
  const initialFormValue = {
    finsmartCodingHeaderId: headerId,
    parentId: parentId,
    accountCode: "",
    accountName: "",
    budgetType: null,
  };
  const budgetTypeOptions = [
    { value: 1, label: "None" },
    { value: 2, label: "Personnel detailed" },
    { value: 3, label: "Stock detailed" },
    { value: 4, label: "Not detailed" },
  ];
  const dataSchema = Yup.object({
    accountCode: Yup.string().required(t("error.account_code_required")),
    accountName: Yup.string().required(t("error.account_name_required")),
    budgetType: Yup.number().required(t("error.budget_type_required")),
  });

  // ---------- functions ----------
  const reloadPageHandler = (status) => {
    if (status) {
      onCloseModal();
      isReloadPage();
    }
  };
  const onSubmit = (values) => {
    const clone = { ...values };
    const data = {
      ...clone,
      accountCode: `${parentCode}.${clone.accountCode}`,
    };
    dispatch(
      createFinsmartCoding(parentCode ? data : values, (status) =>
        reloadPageHandler(status)
      )
    );
  };

  // ---------- render jsx ----------
  return (
    <>
      <div className="flex items-center justify-between p-4 border-b rounded-t-11 border-custom-gray-light dark:bg-dark_custom-average-black">
        <h4 className="text-18 font-bold dark:text-dark_custom-full-white">
          {t("page_title.create_coding")}
        </h4>
        <div
          className="cursor-pointer dark:text-dark_custom-full-white"
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
      <MyForm
        initialValues={initialFormValue}
        validation={dataSchema}
        submit={onSubmit}
        classes="flex flex-col gap-y-10 p-4 rounded-b-11"
      >
        <div className="flex flex-col gap-y-4 dark:bg-dark_custom-average-black">
          <div className="w-full flex gap-x-4">
            <div className="w-1/2 flex">
              {parentId && (
                <span className="pt-[41px] text-gray-500 dark:text-custom-gray-medium px-1 text-14">
                  {parentCode}.
                </span>
              )}
              <div className="w-full">
                <Field
                  component={Input}
                  type="number"
                  placeholder={t("input.account_code.placeholder")}
                  label={t("input.account_code.label")}
                  name="accountCode"
                />
                <Error name="accountCode" />
              </div>
            </div>
            <div className="w-1/2">
              <Field
                component={Input}
                placeholder={t("input.account_name.placeholder")}
                label={t("input.account_name.label")}
                name="accountName"
                complex
              />
              <Error name="accountName" />
            </div>
          </div>
          <div className="w-1/2">
            <Field
              component={SelectBox}
              placeholder={t("input.budget_type.placeholder")}
              label={t("input.budget_type.label")}
              name="budgetType"
              options={budgetTypeOptions}
            />
            <Error name="budgetType" />
          </div>
        </div>
        <div className="w-full flex gap-x-2 items-center justify-end">
          <Field
            component={Button}
            title={t("button.create_title")}
            loading={loading}
            type="submit"
          />
        </div>
      </MyForm>
    </>
  );
};
