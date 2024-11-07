import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  MyForm,
  Error,
  Input,
  SelectBox,
} from "../../../../components";
import {
  editStock,
  getByIdStock,
} from "../../../../redux/actions/settings/stock";
import { getDefinitions } from "../../../../redux/actions/settings/definition";
import { convertArrayToSelectOptions } from "../../../../helpers/convert-array-to-select-options";
import { clearInfo } from "../../../../redux/reducers/settings/definition";
import { Field } from "formik";
import * as Yup from "yup";

export const EditStock = ({ editId, onCloseModal, isReloadPage }) => {
  // ---------- store ----------
  const { editInfo, loading } = useSelector((state) => state.stockSlice);
  const { info: definitionData, getLoading: definitionLoading } = useSelector(
    (state) => state.definitionSlice
  );

  // ---------- state ----------
  const [selectOption, setSelectOption] = useState();
  const [selectedOption, setSelectedOption] = useState();
  const [initialValue, setInitialValue] = useState({
    stockId: 0,
    companyId: 0,
    name: "",
    stockTypeId: null,
    description: "",
  });

  // ---------- hooks ----------
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // ---------- variables ----------
  const dataSchema = Yup.object().shape({
    name: Yup.string().required(t("error.name_required")),
    stockTypeId: Yup.number().required(t("error.stock_type_required")),
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
  const onSubmit = (value) => {
    dispatch(editStock(editId, value, (status) => reloadPageHandler(status)));
  };

  // ---------- lifeCycles ----------
  useEffect(() => {
    dispatch(getByIdStock(editId));
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
      dispatch(clearInfo());
    };
  }, []);
  useEffect(() => {
    if (Object.keys(editInfo).length > 0) {
      setInitialValue({
        stockId: editId,
        companyId: editInfo.companyId,
        name: editInfo.name,
        code: editInfo.code,
        stockTypeId: editInfo.stockTypeId,
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
      setSelectOption(definitions);
    }
  }, [definitionData]);
  useEffect(() => {
    const stockType = selectOption?.find(
      (i) => i.value === editInfo.stockTypeId
    );
    setSelectedOption(stockType);
  }, [selectOption]);

  // ---------- render jsx ----------
  return (
    <>
      <div className="flex items-center justify-between p-4 select-none border-b border-custom-gray-light dark:bg-dark_custom-average-black rounded-t-10">
        <h4 className="text-18 font-bold dark:text-dark_custom-full-white rounded-10">
          {t("page_title.edit_stock")}
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
                selectedOption={selectedOption}
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
              title={t("button.save_title")}
              loading={loading}
            />
          </div>
        </MyForm>
      </div>
    </>
  );
};
