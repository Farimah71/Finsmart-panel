import { useEffect, useState } from "react";
import { Field } from "formik";
import {
  MyForm,
  Button,
  Error,
  SelectBox,
  Input,
} from "../../../../../../components";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateCompanyERP } from "../../../../../../redux/actions/settings/company";
import * as Yup from "yup";

export const ERP = ({ editInfo, setStep, onCloseModal, isReload }) => {
  // --------- states ----------
  const [selectValue, setSelectValue] = useState({});
  const [isShowSelect, setIsShowSelect] = useState(false);
  const [initialValues, setInitialValues] = useState({
    companyId: editInfo?.companyId,
    erpSystem: "",
  });
  
  // --------- store -----------
  const { loading } = useSelector((state) => state.companySlice);

  // ---------- i18next ----------
  const { t, i18n } = useTranslation();

  // ---------- hooks ---------
  const dispatch = useDispatch();

  // -------- variables ----------
  const selectOptions = [
    { value: "Logo", label: "Logo" },
    { value: "Luka", label: "Luka" },
    { value: "Micro", label: "Micro" },
    { value: "", label: "Other..." },
  ];
  const dataSchema = Yup.object().shape({
    erpSystem: Yup.string().required(t("error.erp_system_required")),
  });

  // -------- functions ----------
  const ReloadPageHandler = (status) => {
    if (status) {
      setStep();
      onCloseModal();
      // isReload();
    }
  };
  const onSubmit = (value) => {
    dispatch(updateCompanyERP(value, (status) => ReloadPageHandler(status)));
  };

  // ---------- lifecycle -----------
  useEffect(() => {
    if (selectValue) {
      selectValue.value === "" ? setIsShowSelect(true) : setIsShowSelect(false);
    }
  }, [selectValue]);

  // --------- render jsx ----------
  return (
    <MyForm
      initialValues={initialValues}
      validation={dataSchema}
      submit={onSubmit}
      classes={"flex flex-col h-full relative gap-y-10 dark:bg-transparent"}
    >
      <div className="w-1/2">
        <Field
          component={SelectBox}
          name={"erpSystem"}
          label={t("input.erp_system_title.label")}
          placeholder={t("input.erp_system_title.placeholder")}
          options={selectOptions}
          onChangeHandler={(value) => setSelectValue(value)}
        />
        {!isShowSelect && <Error name={"erpSystem"} />}
      </div>
      {isShowSelect && (
        <div className="w-1/2">
          <Field
            component={Input}
            name={"erpSystem"}
            label={t("input.title.label")}
            placeholder={t("input.title.placeholder")}
          />
          {<Error name={"erpSystem"} />}
        </div>
      )}

      <div className="w-full flex justify-end gap-2 lg:gap-6 mt-10">
        <div>
          <Field
            component={Button}
            title={t("button.back_title")}
            theme="light"
            onClick={() => {
              setStep();
              // isReload();
            }}
          />
        </div>
        <div>
          <Field
            component={Button}
            title={t("button.save_title")}
            loading={loading}
            type="submit"
            theme="dark"
          />
        </div>
      </div>
    </MyForm>
  );
};
