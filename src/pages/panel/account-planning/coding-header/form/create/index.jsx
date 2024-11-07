import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createFinsmartCodingHeader } from "../../../../../../redux/actions/settings/Finsmart-coding-header";
import { Field } from "formik";
import {
  Button,
  MyForm,
  Error,
  Input,
  SelectBox,
} from "../../../../../../components";
import { convertArrayToSelectOptions } from "../../../../../../helpers/convert-array-to-select-options";
import { getCompanyActivityCategories } from "../../../../../../redux/actions/settings/company-activity-category";
import * as Yup from "yup";

export const CreateAccountPlanning = ({ onCloseModal, isReloadPage }) => {
  // ---------- state ----------
  const [selectOptions, setSelectOptions] = useState([]);

  // ---------- store ----------
  const isLoading = useSelector((state) => state.loadingSlice.isLoading);
  const { info: activityCategoryData } = useSelector(
    (state) => state.companyActivityCategorySlice
  );
  const loading = useSelector(
    (state) => state.FinsmartCodingHeaderSlice.loading
  );

  // ---------- i18next ----------
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem("lng");

  // ---------- hooks ----------
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ---------- variables ----------
  const initialFormValue = {
    companyId: null,
    title: "",
    type: 0,
    companyActivityCategoryId: null,
  };
  const dataSchema = Yup.object({
    title: Yup.string().required(t("error.title_required")),
    companyActivityCategoryId: Yup.number().required(
      t("error.activity_category_required")
    ),
  });

  // ---------- lifecycle ---------
  useEffect(() => {
    dispatch(getCompanyActivityCategories({ filters: [] }));
  }, []);
  useEffect(() => {
    if (activityCategoryData.count) {
      const categories = convertArrayToSelectOptions(
        activityCategoryData.data,
        [
          "companyActivityCategoryId",
          lng === "en" ? "titleEn" : lng === "tr" ? "titleTr" : "titleEn",
        ]
      );
      setSelectOptions(categories);
    }
  }, [activityCategoryData]);

  // ---------- functions ----------
  const reloadPageHandler = (status) => {
    if (status) {
      onCloseModal();
      isReloadPage();
    }
  };
  const onSubmit = (values) => {
    dispatch(
      createFinsmartCodingHeader(values, (status) => reloadPageHandler(status))
    );
  };

  // ---------- render jsx ----------
  return (
    <>
      <div className="rounded-t-11 flex items-center justify-between p-4 border-b border-custom-gray-light dark:bg-dark_custom-average-black">
        <h4 className="text-18 font-bold dark:text-dark_custom-full-white">
          {t("page_title.create_account_planning")}
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
                placeholder={t("input.title.placeholder")}
                label={t("input.title.label")}
                name="title"
                complex
              />
              <Error name="title" />
            </div>
            <div className="w-1/2">
              <Field
                component={SelectBox}
                placeholder={t("input.type.placeholder")}
                label={t("input.type.label")}
                name="type"
              />
            </div>
          </div>
          <div className="w-1/2">
            <Field
              component={SelectBox}
              placeholder={t("input.company_activity_category.placeholder")}
              label={t("input.company_activity_category.label")}
              name="companyActivityCategoryId"
              options={selectOptions}
            />
            <Error name="companyActivityCategoryId" />
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
