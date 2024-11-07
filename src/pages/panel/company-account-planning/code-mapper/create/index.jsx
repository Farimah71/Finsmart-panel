import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Field } from "formik";
import { Button, MyForm, Error, Input } from "../../../../../components";
import { createCodeMapper } from "../../../../../redux/actions/settings/code-mapper";
import * as Yup from "yup";

export const CreateCodeMapper = ({ id, onCloseModal, isReloadPage }) => {
  // ---------- store ----------
  const loading = useSelector((state) => state.codeMapperSlice.loading);

  // ---------- i18next ----------
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem("lng");

  // ---------- hooks ----------
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ---------- variables ----------
  const initialFormValue = {
    companyId: null,
    finsmartCodingId: id,
    accountCode: "",
    accountName: "",
    searchItem: "",
  };
  const dataSchema = Yup.object({
    accountCode: Yup.string().required(t("error.account_code_required")),
  });

  // ---------- functions ----------
  const reloadPageHandler = (status) => {
    if (status) {
      onCloseModal();
      isReloadPage();
    }
  };
  const onSubmit = (values) => {
    dispatch(createCodeMapper(values, (status) => reloadPageHandler(status)));
  };

  // ---------- render jsx ----------
  return (
    <>
      <div className="flex items-center justify-between p-4 border-b border-custom-gray-light dark:bg-dark_custom-average-black">
        <h4 className="text-18 font-bold dark:text-dark_custom-full-white">
          {t("page_title.create_code_mapper")}
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
            <div className="w-1/2">
              <Field
                component={Input}
                placeholder={t("input.account_code.placeholder")}
                label={t("input.account_code.label")}
                name="accountCode"
                complex
              />
              <Error name="accountCode" />
            </div>

            <div className="w-1/2">
              <Field
                component={Input}
                placeholder={t("input.search_item.placeholder")}
                label={t("input.search_item.label")}
                name="searchItem"
                complex
              />
              <Error name="searchItem" />
            </div>
          </div>
        </div>
        <div className="w-full flex gap-x-2 items-center justify-end">
          <Field
            component={Button}
            title={t("button.save_title")}
            loading={loading}
            type="submit"
          />
        </div>
      </MyForm>
    </>
  );
};
