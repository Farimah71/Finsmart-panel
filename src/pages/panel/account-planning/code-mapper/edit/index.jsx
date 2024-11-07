import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Field } from "formik";
import {
  Button,
  MyForm,
  Error,
  Input,
  Spinner,
} from "../../../../../components";
import {
  editCodeMapper,
  getByIdCodeMapper,
} from "../../../../../redux/actions/settings/code-mapper";
import * as Yup from "yup";

export const EditCodeMapper = ({ onCloseModal, isReloadPage, editId }) => {
  // ---------- state ----------
  const [initialValue, setInitialValue] = useState({
    codeMapperId: editId,
    companyId: null,
    finsmartCodingId: 0,
    accountCode: "",
    accountName: "",
    searchItem: "",
  });

  // ---------- store ----------
  const { editInfo, loading } = useSelector((state) => state.codeMapperSlice);

  // ---------- i18next ----------
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem("lng");

  // ---------- hooks ----------
  const dispatch = useDispatch();

  // ---------- variables ----------
  const dataSchema = Yup.object({
    accountCode: Yup.string().required(t("error.account_code_required")),
    // accountName: Yup.string().required(t("error.account_name_required")),
    // searchItem: Yup.string().required(t("error.search_item_required")),
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
      editCodeMapper(editId, values, (status) => reloadPageHandler(status))
    );
  };

  // ---------- lifeCycle ----------
  useEffect(() => {
    dispatch(getByIdCodeMapper(editId));
  }, [editId]);
  useEffect(() => {
    if (editInfo) {
      setInitialValue({
        codeMapperId: editId,
        companyId: null,
        finsmartCodingId: editInfo.finsmartCodingId,
        accountCode: editInfo.accountCode,
        accountName: editInfo.accountName,
        searchItem: editInfo.searchItem,
      });
    }
  }, [editInfo]);

  // ---------- render jsx ----------
  return (
    <>
      <div className="flex items-center justify-between p-4 border-b border-custom-gray-light dark:bg-dark_custom-average-black">
        <h4 className="text-18 font-bold dark:text-custom-gray-light">
          {t("page_title.edit_code_mapper")}
        </h4>
        <div
          className="cursor-pointer dark:text-custom-gray-light"
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
                type="number"
                placeholder={t("input.account_code.placeholder")}
                label={t("input.account_code.label")}
                name="accountCode"
              />
              <Error name="accountCode" />
            </div>
            {/* <div className="w-1/2">
              <Field
                component={Input}
                placeholder={t("input.account_name.placeholder")}
                label={t("input.account_name.label")}
                name="accountName"
                complex
              />
              <Error name="accountName" />
            </div> */}
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
