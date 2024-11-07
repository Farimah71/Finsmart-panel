import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  MyForm,
  Error,
  Input,
  SelectBox,
} from "../../../../../components";
import { convertArrayToSelectOptions } from "../../../../../helpers/convert-array-to-select-options";
import { createCompanyBudgetDetail } from "../../../../../redux/actions/settings/company-budget-detail";
import { getDataFromJwtToken } from "../../../../../helpers/get-data-from-jwt";
import { getCurrencies } from "../../../../../redux/actions/settings/currency";
import { getPersonnels } from "../../../../../redux/actions/settings/personnel";
import { getCustomers } from "../../../../../redux/actions/settings/customer";
import { getStocks } from "../../../../../redux/actions/settings/stock";
import { MdOutlineCopyAll } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Field } from "formik";
import * as Yup from "yup";

export const CreateBudgetDetail = ({
  companyBudgetId,
  budgetType,
  onCloseModal,
  isReloadPage,
}) => {
  // -------- store ---------
  const { loading } = useSelector((state) => state.companyBudgetDetailSlice);
  const { info: stockData, loading: stockLoading } = useSelector(
    (state) => state.stockSlice
  );
  const { info: customerData, loading: customerLoading } = useSelector(
    (state) => state.customerSlice
  );
  const { info: currencyData, loading: currencyLoading } = useSelector(
    (state) => state.currencySlice
  );
  const { info: personnelData, loading: personnelLoading } = useSelector(
    (state) => state.personnelSlice
  );

  // -------- states -----------
  const [shouldCopy, setShouldCopy] = useState(false);
  const [copyValue, setCopyValue] = useState();
  const [selectOptions, setSelectOptions] = useState({
    customer: [],
    stock: [],
    personnel: [],
    currency: [],
  });
  const [selectedOptions, setSelectedOptions] = useState({
    customer: {},
    stock: {},
    personnel: {},
    currency: {},
  });
  const [initialValue, setInitialValue] = useState({
    companyBudgetId: companyBudgetId,
    customerId: null,
    stockId: null,
    personelId: null,
    currencyId: null,
    janAmount: 0,
    febAmount: 0,
    marAmount: 0,
    aprAmount: 0,
    mayAmount: 0,
    junAmount: 0,
    julAmount: 0,
    augAmount: 0,
    sepAmount: 0,
    octAmount: 0,
    novAmount: 0,
    decAmount: 0,
  });

  // ---------- hook -----------
  const dispatch = useDispatch();

  // ---------- i18next ----------
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem("lng");

  // ---------- lifeCycles ----------
  useEffect(() => {
    dispatch(getCurrencies({ filters: [] }));
    budgetType === 2 &&
      dispatch(
        getPersonnels({
          filters: [
            {
              property: "CompanyId",
              operation: 5,
              values: [`${getDataFromJwtToken("CompanyId")}`],
            },
          ],
        })
      );
    if (budgetType === 3) {
      dispatch(
        getStocks({
          filters: [
            {
              property: "CompanyId",
              operation: 5,
              values: [`${getDataFromJwtToken("CompanyId")}`],
            },
          ],
        })
      );
      dispatch(
        getCustomers({
          filters: [
            {
              property: "CompanyId",
              operation: 5,
              values: [`${getDataFromJwtToken("CompanyId")}`],
            },
          ],
        })
      );
    }
    // return () => {
    //   dispatch(clearInfo());
    // };
  }, []);
  useEffect(() => {
    if (currencyData.count) {
      const currencies =
        currencyData.data &&
        convertArrayToSelectOptions(currencyData.data, ["currencyId", "title"]);
      setSelectOptions((prev) => ({ ...prev, currency: currencies }));
    }
  }, [currencyData]);
  useEffect(() => {
    if (customerData.count) {
      const customers =
        customerData.data &&
        convertArrayToSelectOptions(customerData.data, ["customerId", "name"]);
      setSelectOptions((prev) => ({ ...prev, customer: customers }));
    }
  }, [customerData]);
  useEffect(() => {
    if (stockData.count) {
      const stocks =
        stockData.data &&
        convertArrayToSelectOptions(stockData.data, ["stockId", "name"]);
      setSelectOptions((prev) => ({ ...prev, stock: stocks }));
    }
  }, [stockData]);
  useEffect(() => {
    if (personnelData.count) {
      const personnels =
        personnelData.data &&
        convertArrayToSelectOptions(personnelData.data, [
          "personelId",
          "firstname",
        ]);
      setSelectOptions((prev) => ({ ...prev, personnel: personnels }));
    }
  }, [personnelData]);
  useEffect(() => {
    setShouldCopy(false);
  }, [copyValue]);

  // ---------- variable ------------
  const dataSchema = Yup.object().shape({
    customerId:
      budgetType === 3 && Yup.number().required(t("error.customer_required")),
    stockId:
      budgetType === 3 && Yup.number().required(t("error.stock_required")),
    personelId:
      budgetType === 2 && Yup.number().required(t("error.personnel_required")),
  });

  // ---------- function --------
  const inputCopyHandler = () => {
    copyValue > 0 ? setShouldCopy(true) : alert("No values entered!");

    setInitialValue((prev) => {
      const months = [
        "jan",
        "feb",
        "mar",
        "apr",
        "may",
        "jun",
        "jul",
        "aug",
        "sep",
        "oct",
        "nov",
        "dec",
      ];
      let updated = {
        ...prev,
        currencyId: selectedOptions.currency?.value ?? null,
        personelId: selectedOptions.personnel?.value ?? null,
        stockId: selectedOptions.stock?.value ?? null,
        customerId: selectedOptions.customer?.value ?? null,
      };
      for (let month of months) {
        updated[month + "Amount"] = copyValue;
      }
      return updated;
    });
  };
  const onSubmit = (value) => {
    dispatch(
      createCompanyBudgetDetail(value, (status) => isReloadPage(status))
    );
  };

  // --------- render jsx ------------
  return (
    <>
      <div className="flex justify-between">
        <h4 className="text-18 font-bold dark:text-dark_custom-full-white p-3">
          {t("page_title.create_budget_detail")}
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
        classes={"p-3 dark:bg-transparent overflow-y-scroll"}
      >
        {budgetType === 3 && (
          <div className="w-full flex gap-x-5 mb-4">
            <div className="flex flex-col w-1/2">
              <Field
                component={SelectBox}
                name="customerId"
                label={t("input.customer.label")}
                placeholder={t("input.customer.placeholder")}
                options={selectOptions.customer}
                loading={customerLoading}
                onChangeHandler={(option) =>
                  setSelectedOptions((prev) => ({ ...prev, customer: option }))
                }
              />
              <Error name="customerId" />
            </div>
            <div className="flex flex-col w-1/2">
              <Field
                component={SelectBox}
                name="stockId"
                label={t("input.stock.label")}
                placeholder={t("input.stock.placeholder")}
                options={selectOptions.stock}
                loading={stockLoading}
                onChangeHandler={(option) =>
                  setSelectedOptions((prev) => ({ ...prev, stock: option }))
                }
              />
              <Error name="stockId" />
            </div>
          </div>
        )}

        <div className="w-full flex gap-x-5 mb-4">
          {budgetType === 2 && (
            <div className="flex flex-col w-1/2">
              <Field
                component={SelectBox}
                name="personelId"
                label={t("input.personnel.label")}
                placeholder={t("input.personnel.placeholder")}
                options={selectOptions.personnel}
                loading={personnelLoading}
                onChangeHandler={(option) =>
                  setSelectedOptions((prev) => ({ ...prev, personnel: option }))
                }
              />
              <Error name="personelId" />
            </div>
          )}
          <div className="flex flex-col w-1/2">
            <Field
              component={SelectBox}
              name="currencyId"
              label={t("input.currency.label")}
              placeholder={t("input.currency.placeholder")}
              options={selectOptions.currency}
              loading={currencyLoading}
              onChangeHandler={(option) =>
                setSelectedOptions((prev) => ({ ...prev, currency: option }))
              }
            />
          </div>
        </div>
        <div className="w-full flex gap-x-5 mb-4">
          <div className="flex flex-col w-1/2">
            <Field
              component={Input}
              type="number"
              name="janAmount"
              label={t("input.jan_amount.label")}
              placeholder={t("input.jan_amount.placeholder")}
              onChange={(e) => setCopyValue(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/2">
            <Field
              component={Input}
              type="number"
              name="febAmount"
              label={t("input.feb_amount.label")}
              placeholder={t("input.feb_amount.placeholder")}
              onChange={(e) => setCopyValue(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full flex gap-x-5 mb-4">
          <div className="flex flex-col w-1/2">
            <Field
              component={Input}
              type="number"
              name="marAmount"
              label={t("input.mar_amount.label")}
              placeholder={t("input.mar_amount.placeholder")}
              onChange={(e) => setCopyValue(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/2">
            <Field
              component={Input}
              type="number"
              name="aprAmount"
              label={t("input.apr_amount.label")}
              placeholder={t("input.apr_amount.placeholder")}
              onChange={(e) => setCopyValue(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full flex gap-x-5 mb-4">
          <div className="flex flex-col w-1/2">
            <Field
              component={Input}
              type="number"
              name="mayAmount"
              label={t("input.may_amount.label")}
              placeholder={t("input.may_amount.placeholder")}
              onChange={(e) => setCopyValue(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/2">
            <Field
              component={Input}
              type="number"
              name="junAmount"
              label={t("input.jun_amount.label")}
              placeholder={t("input.jun_amount.placeholder")}
              onChange={(e) => setCopyValue(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full flex gap-x-5 mb-4">
          <div className="flex flex-col w-1/2">
            <Field
              component={Input}
              type="number"
              name="julAmount"
              label={t("input.jul_amount.label")}
              placeholder={t("input.jul_amount.placeholder")}
              onChange={(e) => setCopyValue(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/2">
            <Field
              component={Input}
              type="number"
              name="augAmount"
              label={t("input.aug_amount.label")}
              placeholder={t("input.aug_amount.placeholder")}
              onChange={(e) => setCopyValue(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full flex gap-x-5 mb-4">
          <div className="flex flex-col w-1/2">
            <Field
              component={Input}
              type="number"
              name="sepAmount"
              label={t("input.sep_amount.label")}
              placeholder={t("input.sep_amount.placeholder")}
              onChange={(e) => setCopyValue(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/2">
            <Field
              component={Input}
              type="number"
              name="octAmount"
              label={t("input.oct_amount.label")}
              placeholder={t("input.oct_amount.placeholder")}
              onChange={(e) => setCopyValue(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full flex gap-x-5 mb-4">
          <div className="flex flex-col w-1/2">
            <Field
              component={Input}
              type="number"
              name="novAmount"
              label={t("input.nov_amount.label")}
              placeholder={t("input.nov_amount.placeholder")}
              onChange={(e) => setCopyValue(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/2">
            <Field
              component={Input}
              type="number"
              name="decAmount"
              label={t("input.dec_amount.label")}
              placeholder={t("input.dec_amount.placeholder")}
              onChange={(e) => setCopyValue(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-between mt-5 ml-auto">
          <Button
            classes={`bg-transparent border ${
              shouldCopy
                ? "border-green-500 !text-green-500"
                : "border-blue-500 text-blue-500"
            }`}
            icon={<MdOutlineCopyAll size={20} />}
            title={
              shouldCopy ? t("button.values_copied") : t("button.copy_values")
            }
            onClick={inputCopyHandler}
          />
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
