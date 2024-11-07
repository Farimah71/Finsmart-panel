import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Field } from "formik";
import {
  Button,
  MyForm,
  Error,
  Input,
  SelectBox,
} from "../../../../../../components";
import {
  editFinsmartCodingHeader,
  getByIdFinsmartCodingHeader,
} from "../../../../../../redux/actions/settings/Finsmart-coding-header";
import { getCompanyActivityCategories } from "../../../../../../redux/actions/settings/company-activity-category";
import { convertArrayToSelectOptions } from "../../../../../../helpers/convert-array-to-select-options";
import * as Yup from "yup";

export const EditAccountPlanning = ({ onCloseModal, isReloadPage, editId }) => {
  // ---------- state ----------
  const [initialValue, setInitialValue] = useState({
    id: editId,
    companyId: null,
    title: "",
    type: 0,
    companyActivityCategoryId: null,
  });
  const [selectOptions, setSelectOptions] = useState([]);
  const [activityCategoryItem, setActivityCategoryItem] = useState();

  // ---------- store ----------
  const isLoading = useSelector((state) => state.loadingSlice.isLoading);
  const { info: activityCategoryData } = useSelector(
    (state) => state.companyActivityCategorySlice
  );
  const { editInfo, loading } = useSelector(
    (state) => state.FinsmartCodingHeaderSlice
  );

  // ---------- i18next ----------
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem("lng");

  // ---------- hooks ----------
  const dispatch = useDispatch();

  // ---------- variables ----------
  const dataSchema = Yup.object({
    title: Yup.string().required(t("error.title_required")),
  });

  // ---------- functions ----------
  const reloadPageHandler = (status) => {
    if (status) {
      onCloseModal();
      isReloadPage();
    }
  };
  const onSubmit = (values) => {
    dispatch(
      editFinsmartCodingHeader(editId, values, (status) =>
        reloadPageHandler(status)
      )
    );
  };

  // ---------- lifeCycle ----------
  useEffect(() => {
    dispatch(getByIdFinsmartCodingHeader(editId, "CompanyActivityCategory"));
    dispatch(getCompanyActivityCategories({ filters: [] }));
  }, []);
  useEffect(() => {
    if (editInfo) {
      setInitialValue({
        id: editId,
        title: editInfo.title,
        type: editInfo.type,
        companyActivityCategoryId:
          editInfo.companyActivityCategory?.companyActivityCategoryId,
      });
      setActivityCategoryItem({
        value: editInfo.companyActivityCategory?.companyActivityCategoryId,
        label:
          lng === "tr"
            ? editInfo.companyActivityCategory?.titleTr
            : editInfo.companyActivityCategory?.titleEn,
      });
    }
  }, [editInfo]);
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

  // ---------- render jsx ----------
  return (
    <div>
      <div className="flex items-center justify-between p-4 border-b border-custom-gray-light rounded-t-11">
        <h4 className="text-18 font-bold dark:text-white">
          {t("page_title.edit_account_planning")}
        </h4>
        <div
          className="cursor-pointer dark:text-dark_custom-full-white"
          onClick={onCloseModal}
        >
          <svg
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
        initialValues={initialValue}
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
              selectedOption={activityCategoryItem}
            />
            <Error name="companyActivityCategoryId" />
          </div>
          <div className="w-full flex gap-x-4"></div>
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
    </div>
  );
};
