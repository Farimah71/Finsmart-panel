import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  MyForm,
  Error,
  Input,
  SelectBox,
  CustomDatePicker,
} from "../../../../components";
import { getDataFromJwtToken } from "../../../../helpers/get-data-from-jwt";
import { createCustomer } from "../../../../redux/actions/settings/customer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getCountries } from "../../../../redux/actions/settings/country";
import { getCities } from "../../../../redux/actions/settings/city";
import { getDefinitions } from "../../../../redux/actions/settings/definition";
import { convertArrayToSelectOptions } from "../../../../helpers/convert-array-to-select-options";
import { convertDateToString } from "../../../../helpers/convert-date-to-string";
import { clearInfo } from "../../../../redux/reducers/settings/city";
import { clearInfo as defClearInfo } from "../../../../redux/reducers/settings/definition";
import { Field } from "formik";
import * as Yup from "yup";

export const CreateCustomer = ({ onCloseModal, isReloadPage }) => {
  // -------- store ---------
  const { loading } = useSelector((state) => state.customerSlice);
  const { info: cityData, loading: cityLoading } = useSelector(
    (state) => state.citySlice
  );
  const { info: countryData, loading: countryLoading } = useSelector(
    (state) => state.countrySlice
  );
  const { info: definitionData, getLoading: definitionLoading } = useSelector(
    (state) => state.definitionSlice
  );

  // -------- states -----------
  const [selectOptions, setSelectOptions] = useState({
    city: [],
    country: [],
    definition: [],
  });
  const [initialValue, setInitialValue] = useState({
    companyId: getDataFromJwtToken("CompanyId"),
    name: "",
    countryId: null,
    cityId: null,
    customerTypeId: null,
    startDate: "",
    description: "",
  });

  // ---------- hook -----------
  const dispatch = useDispatch();

  // ---------- i18next ----------
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem("lng");

  // ---------- lifeCycles ----------
  useEffect(() => {
    dispatch(getCountries({ filters: [] }));
    dispatch(
      getDefinitions({
        filters: [
          {
            property: "DefinationTypeId",
            operation: 5,
            values: ["2"],
          },
        ],
      })
    );
    return () => {
      dispatch(clearInfo());
      dispatch(defClearInfo());
    };
  }, []);
  useEffect(() => {
    if (cityData.count) {
      const cities =
        cityData.data &&
        convertArrayToSelectOptions(cityData.data, ["cityId", "title"]);
      setSelectOptions((prev) => ({
        ...prev,
        city: cities,
      }));
    }
  }, [cityData]);
  useEffect(() => {
    if (countryData.count) {
      const countries =
        countryData.data &&
        convertArrayToSelectOptions(countryData.data, ["countryId", "title"]);
      setSelectOptions((prev) => ({
        ...prev,
        country: countries,
      }));
    }
  }, [countryData]);
  useEffect(() => {
    if (definitionData.count) {
      const definitions =
        definitionData.data &&
        convertArrayToSelectOptions(definitionData.data, [
          "definationId",
          "title",
        ]);
      setSelectOptions((prev) => ({
        ...prev,
        definition: definitions,
      }));
    }
  }, [definitionData]);

  // ---------- variable ------------
  const dataSchema = Yup.object().shape({
    name: Yup.string().required(t("error.name_required")),
    countryId: Yup.number().required(t("error.country_required")),
    cityId: Yup.number().required(t("error.city_required")),
    customerTypeId: Yup.number().required(t("error.customer_type_required")),
    startDate: Yup.string().required(t("error.start_date_required")),
  });

  // ---------- function --------
  const countryChangeHandler = (country) => {
    dispatch(
      getCities({
        filters: [
          {
            property: "CountryId",
            operation: 5,
            values: [`${country.value}`],
          },
        ],
      })
    );
  };
  const onSubmit = (value) => {
    const data = { ...value, startDate: convertDateToString(value.startDate) };
    dispatch(createCustomer(data, (status) => isReloadPage(status)));
  };

  // --------- render jsx ------------
  return (
    <>
      <div className="flex justify-between">
        <h4 className="text-18 font-bold dark:text-dark_custom-full-white p-3">
          {t("page_title.create_customer")}
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
        <div className="w-full flex gap-x-5 mb-4">
          <div className="flex flex-col w-1/2">
            <Field
              component={Input}
              name="name"
              label={t("input.name.label")}
              placeholder={t("input.name.placeholder")}
              complex
            />
            <Error name="name" />
          </div>
          <div className="flex flex-col w-1/2">
            <Field
              component={SelectBox}
              name="customerTypeId"
              label={t("input.customer_type.label")}
              placeholder={t("input.customer_type.placeholder")}
              options={selectOptions.definition}
              loading={definitionLoading}
            />
            <Error name="customerTypeId" />
          </div>
        </div>

        <div className="w-full flex gap-x-5 mb-4">
          <div className="flex flex-col w-1/2">
            <Field
              component={SelectBox}
              name="countryId"
              label={t("input.country.label")}
              placeholder={t("input.country.placeholder")}
              options={selectOptions.country}
              loading={countryLoading}
              onChangeHandler={(country) => countryChangeHandler(country)}
            />
            <Error name="countryId" />
          </div>
          <div className="flex flex-col w-1/2">
            <Field
              component={SelectBox}
              name="cityId"
              label={t("input.city.label")}
              placeholder={t("input.city.placeholder")}
              options={selectOptions.city}
              loading={cityLoading}
            />
            <Error name="cityId" />
          </div>
        </div>

        <div className="w-full flex gap-x-5">
          <div className="flex flex-col w-1/2">
            <Field
              component={CustomDatePicker}
              name="startDate"
              label={t("input.start_date.label")}
              placeholder={t("input.start_date.placeholder")}
            />
            <Error name="startDate" />
          </div>
          <div className="flex flex-col w-1/2">
            <Field
              component={Input}
              type="textarea"
              name="description"
              label={t("input.description.label")}
              placeholder={t("input.description.placeholder")}
            />
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
