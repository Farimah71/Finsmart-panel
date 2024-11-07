import React, { useEffect, useState } from "react";
import {
  MyForm,
  Input,
  Button,
  Error,
  SelectBox,
} from "../../../../../../components";
import { Field } from "formik";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getDataFromLocalStorage } from "../../../../../../helpers/get-data-from-local";
import { getCountries } from "../../../../../../redux/actions/settings/country";
import { getCities } from "../../../../../../redux/actions/settings/city";
import { getCompanyActivityCategories } from "../../../../../../redux/actions/settings/company-activity-category";
import { convertArrayToSelectOptions } from "../../../../../../helpers/convert-array-to-select-options";
import { nextStep } from "../../../../../../redux/reducers/user-company";
import { getSectors } from "../../../../../../redux/actions/settings/sector";
import { getIncomeBudgetTypes } from "../../../../../../redux/actions/settings/income-budget-type";
import { getCurrencies } from "../../../../../../redux/actions/settings/currency";
import * as Yup from "yup";

export const CompanyInformation = () => {
  // ----------states----------
  const [selectOptions, setSelectOptions] = useState({
    country: [],
    city: [],
    activityCategory: [],
    sector: [],
    incomeBudget: [],
    currency: [],
  });
  const [initialValues, setInitialValues] = useState({
    companyId: 0,
    userId: getDataFromLocalStorage("userInfoId"),
    isActiveForUser: true,
    companyActivityCategoryId: null,
    countryId: null,
    currencyId: null,
    languageId: null,
    cityId: null,
    title: "",
    logo: "",
    inviteKey: "",
    isDemo: false,
    bio: "",
    description: "",
    openForCFO: false,
    openForInvestor: false,
    needInvestFrom: 0,
    needInvestTo: 0,
    establishmentYear: null,
    investPrice: 0,
    suggestedInvestPrice: 0,
    isActive: false,
    hasDebit: false,
    isMain: false,
    companyPhase: null,
    targetGroup: "",
    numberOfEmployees: 0,
    incomeBudgetTypeId: null,
    sectorId: null,
    address: "",
  });
  const [selectedCountry, setSelectedCountry] = useState();

  // ----------store----------
  const isLoading = useSelector((state) => state.companySlice.loading);
  const { info: countryData, loading: countryLoading } = useSelector(
    (state) => state.countrySlice
  );
  const { info: cityData, loading: cityLoading } = useSelector(
    (state) => state.citySlice
  );
  const { info: activityCategoryData, loading: activityCategoryLoading } =
    useSelector((state) => state.companyActivityCategorySlice);
  const { info: sectorData, loading: sectorLoading } = useSelector(
    (state) => state.sectorSlice
  );
  const { info: budgetTypeData, loading: budgetTypeLoading } = useSelector(
    (state) => state.incomeBudgetTypeSlice
  );
  const { info: currencyData, loading: currencyLoading } = useSelector(
    (state) => state.currencySlice
  );

  // ---------- i18next ----------
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem("lng");

  // ---------- hooks ------------
  const dispatch = useDispatch();

  // ----------variables----------
  const companyInfoSchema = Yup.object().shape({
    title: Yup.string().required(t("error.title_required")),
    countryId: Yup.number().required(t("error.country_required")),
    cityId: Yup.number().required(t("error.city_required")),
    companyActivityCategoryId: Yup.number().required(
      t("error.activity_category_required")
    ),
    establishmentYear: Yup.string().required(
      t("error.establishment_year_required")
    ),
  });
  const option = {
    filters: [],
  };
  const companyPhaseOptions = [
    { value: 1, label: "Pre-seed" },
    { value: 2, label: "Seed" },
    { value: 3, label: "Series A" },
    { value: 4, label: "Series B" },
    { value: 5, label: "Mature" },
  ];

  // ---------- lifecycles ---------
  useEffect(() => {
    if (localStorage.getItem("creating_comp_")) {
      let data = JSON.parse(localStorage.getItem("creating_comp_"));
      setInitialValues(data);
    }
    dispatch(getCountries(option));
    dispatch(getCompanyActivityCategories(option));
    dispatch(getSectors(option));
    dispatch(getIncomeBudgetTypes(option));
    dispatch(getCurrencies(option));
  }, []);
  useEffect(() => {
    if (countryData.count) {
      const countries = convertArrayToSelectOptions(countryData.data, [
        "countryId",
        "title",
      ]);
      setSelectOptions((options) => ({ ...options, country: countries }));
    }
    if (activityCategoryData.count) {
      const categories = convertArrayToSelectOptions(
        activityCategoryData.data,
        [
          "companyActivityCategoryId",
          lng === "en" ? "titleEn" : lng === "tr" ? "titleTr" : "titleEn",
        ]
      );
      setSelectOptions((options) => ({
        ...options,
        activityCategory: categories,
      }));
    }
    if (sectorData.count) {
      const sectors = convertArrayToSelectOptions(sectorData.data, [
        "sectorId",
        "title",
      ]);
      setSelectOptions((options) => ({ ...options, sector: sectors }));
    }
    if (budgetTypeData.count) {
      const budgetTypes = convertArrayToSelectOptions(budgetTypeData.data, [
        "incomeBudgetTypeId",
        "title",
      ]);
      setSelectOptions((options) => ({
        ...options,
        incomeBudget: budgetTypes,
      }));
    }
    if (currencyData.count) {
      const currencies = convertArrayToSelectOptions(currencyData.data, [
        "currencyId",
        "title",
      ]);
      setSelectOptions((options) => ({
        ...options,
        currency: currencies,
      }));
    }
  }, [
    countryData,
    activityCategoryData,
    sectorData,
    budgetTypeData,
    currencyData,
  ]);
  useEffect(() => {
    if (cityData.count) {
      const cities = convertArrayToSelectOptions(cityData.data, [
        "cityId",
        "title",
      ]);
      setSelectOptions((options) => ({ ...options, city: cities }));
    }
  }, [cityData]);
  useEffect(() => {
    if (selectedCountry?.value) {
      dispatch(
        getCities({
          filters: [
            {
              property: "CountryId",
              operation: 5,
              values: [`${selectedCountry.value}`],
            },
          ],
        })
      );
    }
  }, [selectedCountry]);

  // ----------- function -----------
  const onSubmit = (value) => {
    localStorage.creating_comp_ = JSON.stringify(value);
    localStorage.comp_country_ = JSON.stringify(
      selectOptions.country.filter((item) => item.value === value.countryId)
    );
    localStorage.comp_activity_category_ = JSON.stringify(
      selectOptions.activityCategory.filter(
        (item) => item.value === value.companyActivityCategoryId
      )
    );
    localStorage.comp_phase_ = JSON.stringify(
      companyPhaseOptions.filter((item) => item.value === value.companyPhase)
    );
    dispatch(nextStep());
  };

  //   ----------render jsx----------
  return (
    <MyForm
      initialValues={initialValues}
      validation={companyInfoSchema}
      submit={onSubmit}
      classes={"dark:bg-transparent pr-1 p-4"}
    >
      <div className="w-full grid grid-cols-2 gap-6">
        <div className="w-full flex flex-col gap-y-2">
          <Field
            component={Input}
            name="title"
            placeholder={t("input.companyTitle.placeholder")}
            label={t("input.companyTitle.label")}
            complex
          />
          <Error name="title" />
        </div>
        <div className="w-full flex flex-col gap-y-2">
          <Field
            component={SelectBox}
            name="companyActivityCategoryId"
            placeholder={t("input.company_activity_category.placeholder")}
            label={t("input.company_activity_category.label")}
            options={selectOptions.activityCategory}
            loading={activityCategoryLoading}
          />
          <Error name="companyActivityCategoryId" />
        </div>
      </div>
      <div className="w-full grid grid-cols-2 gap-6 mt-4">
        <div className="w-full flex flex-col gap-y-2">
          <Field
            component={Input}
            type="number"
            name="investPrice"
            placeholder={t("input.investment_so_far.placeholder")}
            label={t("input.investment_so_far.label")}
          />
        </div>
        <Field
          component={SelectBox}
          name="companyPhase"
          placeholder={t("input.company_phase.placeholder")}
          label={t("input.company_phase.label")}
          options={companyPhaseOptions}
        />
      </div>
      <div className="w-full grid grid-cols-2 gap-6 mt-4">
        <div className="w-full flex flex-col gap-y-2">
          <Field
            component={SelectBox}
            name="currencyId"
            placeholder={t("input.currency.placeholder")}
            label={t("input.currency.label")}
            loading={currencyLoading}
            options={selectOptions.currency}
          />
        </div>
        <Field
          component={Input}
          name="targetGroup"
          placeholder={t("input.target_group.placeholder")}
          label={t("input.target_group.label")}
          complex
        />
      </div>

      <div className="w-full grid grid-cols-2 gap-6 mt-4">
        <div className="w-full flex flex-col gap-y-2">
          <Field
            component={SelectBox}
            name="incomeBudgetTypeId"
            placeholder={t("input.income_budget_type.placeholder")}
            label={t("input.income_budget_type.label")}
            loading={budgetTypeLoading}
            options={selectOptions.incomeBudget}
          />
        </div>
        <div className="w-full flex flex-col gap-y-2">
          <Field
            component={SelectBox}
            name="sectorId"
            placeholder={t("input.sector.placeholder")}
            label={t("input.sector.label")}
            loading={sectorLoading}
            options={selectOptions.sector}
          />
        </div>
      </div>
      <div className="w-full grid grid-cols-2 gap-6 mt-4">
        <div className="w-full flex flex-col gap-y-2">
          <Field
            component={Input}
            type="number"
            name="numberOfEmployees"
            placeholder={t("input.number_of_employees.placeholder")}
            label={t("input.number_of_employees.label")}
          />
        </div>
        <div className="w-full flex flex-col gap-y-2">
          <Field
            component={SelectBox}
            name="countryId"
            placeholder={t("input.country.placeholder")}
            label={t("input.country.label")}
            loading={countryLoading}
            options={selectOptions.country}
            onChangeHandler={(value) => setSelectedCountry(value)}
          />
          <Error name="countryId" />
        </div>
      </div>
      <div className="w-full grid grid-cols-2 gap-6 mt-4">
        <div className="w-full flex flex-col gap-y-2">
          <Field
            component={SelectBox}
            name="cityId"
            placeholder={cityData.count ? t("input.city.placeholder") : ""}
            label={t("input.city.label")}
            options={selectOptions.city}
            loading={cityLoading}
          />
          <Error name="cityId" />
        </div>
        <div className="w-full flex flex-col gap-y-2">
          <Field
            component={Input}
            name="address"
            placeholder={t("input.address.placeholder")}
            label={t("input.address.label")}
            complex
          />
        </div>

        <div>
          <Field
            component={Input}
            type="textarea"
            name="bio"
            placeholder={t("input.companyBio.placeholder")}
            label={t("input.companyBio.label")}
            complex
          />
        </div>
        <div className="w-full flex flex-col gap-y-2">
          <Field
            component={Input}
            type="number"
            name="establishmentYear"
            placeholder={t("input.establishment_year.placeholder")}
            label={t("input.establishment_year.label")}
          />
          <Error name="establishmentYear" />
        </div>
      </div>

      <div className="w-full flex justify-end">
        <div>
          <Field
            component={Button}
            title={t("button.next_title")}
            loading={isLoading}
            type="submit"
            theme="dark"
          />
        </div>
      </div>
    </MyForm>
  );
};
