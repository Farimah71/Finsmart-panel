import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  MyForm,
  Error,
  Input,
  SelectBox,
  CustomDatePicker,
} from "../../../../components";
import { getDefinitions } from "../../../../redux/actions/settings/definition";
import { getCountries } from "../../../../redux/actions/settings/country";
import { convertArrayToSelectOptions } from "../../../../helpers/convert-array-to-select-options";
import {
  editCustomer,
  getByIdCustomer,
} from "../../../../redux/actions/settings/customer";
import { getDataFromJwtToken } from "../../../../helpers/get-data-from-jwt";
import { getCities } from "../../../../redux/actions/settings/city";
import { convertDateToString } from "../../../../helpers/convert-date-to-string";
import { clearInfo } from "../../../../redux/reducers/settings/definition";
import { Field } from "formik";
import * as Yup from "yup";

export const EditCustomer = ({ editId, onCloseModal, isReloadPage }) => {
  // ---------- store ----------
  const { editInfo, loading } = useSelector((state) => state.customerSlice);
  const { info: countryData, loading: countryLoading } = useSelector(
    (state) => state.countrySlice
  );
  const { info: cityData, loading: cityLoading } = useSelector(
    (state) => state.citySlice
  );
  const { info: definitionData, getLoading: definitionLoading } = useSelector(
    (state) => state.definitionSlice
  );

  // ---------- state ----------
  const [selectOption, setSelectOption] = useState({
    city: [],
    country: [],
    definition: [],
  });
  const [selectedOption, setSelectedOption] = useState({
    city: {},
    country: {},
    definition: {},
  });
  const [initialValue, setInitialValue] = useState({
    customerId: 0,
    companyId: 0,
    name: "",
    countryId: null,
    cityId: null,
    customerTypeId: null,
    startDate: "",
    description: "",
  });

  // ---------- hooks ----------
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // ---------- variables ----------
  const dataSchema = Yup.object().shape({
    name: Yup.string().required(t("error.name_required")),
    countryId: Yup.number().required(t("error.country_required")),
    cityId: Yup.number().required(t("error.city_required")),
    customerTypeId: Yup.number().required(t("error.customer_type_required")),
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
    dispatch(editCustomer(editId, data, (status) => reloadPageHandler(status)));
  };

  // ---------- lifeCycles ----------
  useEffect(() => {
    dispatch(getByIdCustomer(editId));
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
    dispatch(getCountries({ filters: [] }));
    return () => {
      dispatch(clearInfo());
    };
  }, []);
  useEffect(() => {
    if (Object.keys(editInfo).length > 0) {
      dispatch(
        getCities({
          filters: [
            {
              property: "CountryId",
              operation: 5,
              values: [`${editInfo.countryId}`],
            },
          ],
        })
      );
      setInitialValue({
        customerId: editId,
        companyId: getDataFromJwtToken("CompanyId"),
        name: editInfo.name,
        countryId: editInfo.countryId,
        cityId: editInfo.cityId,
        customerTypeId: editInfo.customerTypeId,
        startDate: editInfo.startDate && new Date(editInfo.startDate),
        description: editInfo.description,
      });
    }
  }, [editInfo]);
  useEffect(() => {
    if (definitionData.count) {
      const definitions =
        definitionData.data &&
        convertArrayToSelectOptions(definitionData.data, [
          "definationId",
          "title",
        ]);
      setSelectOption((prev) => ({ ...prev, definition: definitions }));
    }
  }, [definitionData]);
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
  useEffect(() => {
    if (cityData.count) {
      const cities =
        cityData.data &&
        convertArrayToSelectOptions(cityData.data, ["cityId", "title"]);
      setSelectOption((prev) => ({
        ...prev,
        city: cities,
      }));
    }
  }, [cityData]);
  useEffect(() => {
    setSelectedOption((prev) => ({
      ...prev,
      definition: selectOption.definition.find(
        (item) => item.value === editInfo.customerTypeId
      ),
      country: selectOption.country.find(
        (item) => item.value === editInfo.countryId
      ),
      city: selectOption.city.find((item) => item.value === editInfo.cityId),
    }));
  }, [selectOption]);

  // ---------- render jsx ----------
  return (
    <>
      <div className="flex items-center justify-between p-4 select-none border-b border-custom-gray-light dark:bg-dark_custom-average-black rounded-t-10">
        <h4 className="text-18 font-bold dark:text-dark_custom-full-white rounded-10">
          {t("page_title.edit_customer")}
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
                options={selectOption.definition}
                loading={definitionLoading}
                selectedOption={selectedOption.definition}
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
                options={selectOption.country}
                selectedOption={selectedOption.country}
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
                options={selectOption.city}
                selectedOption={selectedOption.city}
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
              title={t("button.save_title")}
              loading={loading}
            />
          </div>
        </MyForm>
      </div>
    </>
  );
};
