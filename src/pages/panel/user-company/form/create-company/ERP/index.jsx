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
import {
  nextStep,
  previousStep,
} from "../../../../../../redux/reducers/user-company";
import * as Yup from "yup";

export const ERP = () => {
  // --------- states ----------
  const [selectValue, setSelectValue] = useState({});
  const [isShowSelect, setIsShowSelect] = useState(false);
  const [initialValues, setInitialValues] = useState({
    // companyId: companyInfo.companyId,
    erpSystem: "",
  });

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

  // -------- function ----------
  const onSubmit = (value) => {
    localStorage.getItem("comp_ERP_system_") &&
      value.erpSystem &&
      localStorage.setItem("comp_ERP_system_", JSON.stringify(value));
    !localStorage.getItem("comp_ERP_system_") &&
      localStorage.setItem("comp_ERP_system_", JSON.stringify(value));

    dispatch(nextStep());
  };

  // ---------- lifecycle -----------
  useEffect(() => {
    localStorage.getItem("comp_ERP_system_") &&
      setInitialValues(JSON.parse(localStorage.getItem("comp_ERP_system_")));
  }, []);
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
      classes={
        "flex flex-col h-full relative gap-y-3 dark:bg-transparent p-4 pr-1 outline"
      }
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

      <div className="flex justify-end gap-3 absolute bottom-2 right-2">
        <div>
          <Field
            component={Button}
            title={t("button.back_title")}
            theme="light"
            onClick={() => dispatch(previousStep())}
          />
        </div>
        <div>
          <Field
            component={Button}
            title={t("button.next_title")}
            // loading={loading}
            type="submit"
            theme="dark"
          />
        </div>
      </div>
    </MyForm>
  );
};
