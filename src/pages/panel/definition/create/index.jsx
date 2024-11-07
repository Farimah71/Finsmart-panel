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
} from "../../../../components";
import { getDataFromJwtToken } from "../../../../helpers/get-data-from-jwt";
import { createDefinition } from "../../../../redux/actions/settings/definition";
import { getDefinitionTypes } from "../../../../redux/actions/settings/definition-type";
import { getCountries } from "../../../../redux/actions/settings/country";
import { convertArrayToSelectOptions } from "../../../../helpers/convert-array-to-select-options";
import * as Yup from "yup";

export const CreateDefinition = ({ onCloseModal, isReloadPage }) => {
  // ---------- store ----------
  const { loading } = useSelector((state) => state.definitionSlice);
  const { info: countryData, loading: countryLoading } = useSelector(
    (state) => state.countrySlice
  );
  const { info: definitionTypeData, loading: definitionTypeLoading } =
    useSelector((state) => state.definitionTypeSlice);

  // ---------- states ----------
  const [selectOption, setSelectOption] = useState({
    definitionType: [],
    country: [],
  });
  const [formValue, setFormValue] = useState({
    definationTypeId: null,
    countryId: null,
    companyId: +getDataFromJwtToken("CompanyId"),
    title: "",
    description: "",
  });

  // ---------- hooks ----------
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // ---------- variables ----------
  const dataSchema = Yup.object({
    title: Yup.string().required(t("error.title_required")),
    definationTypeId: Yup.number().required(
      t("error.definition_type_required")
    ),
    countryId: Yup.number().required(
      t("error.country_required")
    ),
  });

  // ---------- functions ----------
  const reloadPageHandler = (status) => {
    if (status) {
      onCloseModal();
      isReloadPage();
    }
  };
  const closeHandler = () => {
    onCloseModal();
  };
  const onSubmit = (values) => {
    dispatch(createDefinition(values, (status) => reloadPageHandler(status)));
  };

  // ---------- lifeCycles ----------
  useEffect(() => {
    dispatch(getDefinitionTypes({ filters: [] }));
    dispatch(getCountries({ filters: [] }));
  }, []);
  useEffect(() => {
    if (definitionTypeData.count) {
      const definitionTypes =
        definitionTypeData.data &&
        convertArrayToSelectOptions(definitionTypeData.data, [
          "definationTypeId",
          "title",
        ]);
      setSelectOption((prev) => ({ ...prev, definitionType: definitionTypes }));
    }
  }, [definitionTypeData]);
  useEffect(() => {
    if (countryData.count) {
      const countries =
        countryData.data &&
        convertArrayToSelectOptions(countryData.data, ["countryId", "title"]);
      setSelectOption((prev) => ({
        ...prev,
        country: countries,
      }));
    }
  }, [countryData]);

  // ---------- render jsx ----------
  return (
    <>
      <div className="flex items-center justify-between p-4 select-none border-b border-custom-gray-light dark:bg-dark_custom-average-black rounded-t-10">
        <h4 className="text-18 font-bold dark:text-dark_custom-full-white rounded-10">
          {t("page_title.create_definition")}
        </h4>
        <div
          className="cursor-pointer dark:text-dark_custom-full-white"
          onClick={closeHandler}
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
      <div className="flex-grow overflow-y-auto rounded-b-10">
        <MyForm
          initialValues={formValue}
          validation={dataSchema}
          submit={onSubmit}
          classes="flex flex-col gap-y-10 p-4 select-none"
        >
          <div className="flex flex-col gap-y-4">
            <div className="w-full flex gap-4">
              <div className="w-1/2 dark:bg-dark_custom-average-black">
                <Field
                  component={Input}
                  label={t("input.title.label")}
                  placeholder={t("input.title.placeholder")}
                  name="title"
                  complex
                />
                <Error name="title" />
              </div>
              <div className="w-1/2 dark:bg-dark_custom-average-black">
                <Field
                  component={SelectBox}
                  label={t("input.definition_type.label")}
                  placeholder={t("input.definition_type.placeholder")}
                  name="definationTypeId"
                  options={selectOption.definitionType}
                  loading={definitionTypeLoading}
                />
                <Error name="definationTypeId" />
              </div>
            </div>

            <div className="w-full flex gap-4">
              <div className="w-1/2">
                <Field
                  component={SelectBox}
                  type="textarea"
                  placeholder={t("input.country.placeholder")}
                  label={t("input.country.label")}
                  name="countryId"
                  options={selectOption.country}
                  loading={countryLoading}
                />
                <Error name="countryId" />
              </div>
              <div className="w-1/2">
                <Field
                  component={Input}
                  type="textarea"
                  placeholder={t("input.description.placeholder")}
                  label={t("input.description.label")}
                  name="description"
                />
              </div>
            </div>
          </div>

          <div className="w-full flex gap-x-2 items-center justify-end">
            <div className="flex items-center gap-x-2">
              <Field
                component={Button}
                title={t("button.create_title")}
                loading={loading}
                type="submit"
              />
            </div>
          </div>
        </MyForm>
      </div>
    </>
  );
};
