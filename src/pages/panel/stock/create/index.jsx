import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  MyForm,
  Error,
  Input,
  SelectBox,
} from "../../../../components";
import { getDataFromJwtToken } from "../../../../helpers/get-data-from-jwt";
import { convertArrayToSelectOptions } from "../../../../helpers/convert-array-to-select-options";
import { getDefinitions } from "../../../../redux/actions/settings/definition";
import { createStock } from "../../../../redux/actions/settings/stock";
import { clearInfo } from "../../../../redux/reducers/settings/definition";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Field } from "formik";
import * as Yup from "yup";

export const CreateStock = ({ onCloseModal, isReloadPage }) => {
  // -------- store ---------
  const { loading } = useSelector((state) => state.stockSlice);
  const { info: definitionData, getLoading: definitionLoading } = useSelector(
    (state) => state.definitionSlice
  );

  // -------- states -----------
  const [selectOption, setSelectOption] = useState();
  const [initialValue, setInitialValue] = useState({
    companyId: getDataFromJwtToken("CompanyId"),
    name: "",
    code: "",
    stockTypeId: null,
    description: "",
  });

  // ---------- hook -----------
  const dispatch = useDispatch();

  // ---------- i18next ----------
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem("lng");

  // ---------- lifeCycles ----------
  useEffect(() => {
    dispatch(
      getDefinitions({
        filters: [
          {
            property: "DefinationTypeId",
            operation: 5,
            values: ["3"],
          },
        ],
      })
    );
    return () => {
      dispatch(clearInfo())
    }
  }, []);
  useEffect(() => {
    if (definitionData.count) {
      const definitions =
        definitionData.data &&
        convertArrayToSelectOptions(definitionData.data, [
          "definationId",
          "title",
        ]);
      setSelectOption(definitions);
    }
  }, [definitionData]);

  // ---------- variable ------------
  const dataSchema = Yup.object().shape({
    name: Yup.string().required(t("error.name_required")),
    stockTypeId: Yup.number().required(t("error.stock_type_required")),
  });

  // ---------- function --------
  const onSubmit = (value) => {
    dispatch(createStock(value, (status) => isReloadPage(status)));
  };

  // --------- render jsx ------------
  return (
    <>
      <div className="flex justify-between">
        <h4 className="text-18 font-bold dark:text-dark_custom-full-white p-3">
          {t("page_title.create_stock")}
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
              component={Input}
              name="code"
              label={t("input.code.label")}
              placeholder={t("input.code.placeholder")}
              complex
            />
            <Error name="code" />
          </div>
        </div>

        <div className="w-full flex gap-x-5 mb-4">
          <div className="flex flex-col w-1/2">
            <Field
              component={SelectBox}
              name="stockTypeId"
              label={t("input.stock_type.label")}
              placeholder={t("input.stock_type.placeholder")}
              options={selectOption}
              loading={definitionLoading}
            />
            <Error name="stockTypeId" />
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
