import { useEffect } from "react";
import { Field } from "formik";
import {
  MyForm,
  UploadFile,
  Button,
  Error,
} from "../../../../../../components";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";
import {
  nextStep,
  previousStep,
} from "../../../../../../redux/reducers/user-company";
import * as Yup from "yup";

export const CompanyLogo = () => {
  // --------- state -----------
  const [values, setValues] = useState();

  // --------- store -----------
  const { loading } = useSelector((state) => state.companySlice);

  // ---------- i18next ----------
  const { t, i18n } = useTranslation();

  // ---------- hook ---------
  const dispatch = useDispatch();

  // -------- lifecycle ---------
  useEffect(() => {
    if (localStorage.getItem("creating_comp_")) {
      let data = JSON.parse(localStorage.getItem("creating_comp_"));
      setValues(data);
    }
  }, []);

  // -------- variable ----------
  const logoSchema = Yup.object().shape({
    logo: Yup.string().required(t("error.logo_required")),
  });

  // -------- function ----------
  const onSubmit = (values) => {
    localStorage.creating_comp_ = JSON.stringify(values);
    dispatch(nextStep());
  };

  // --------- render jsx ----------
  return (
    <MyForm
      initialValues={values}
      validation={logoSchema}
      submit={onSubmit}
      classes={
        "flex flex-col justify-between h-full dark:bg-transparent pr-1 p-4"
      }
    >
      <div>
        <Field
          component={UploadFile}
          name="logo"
          label={t("input.upload_logo_title")}
          maxSize={300000}
        />
        <Error name={"logo"} />
      </div>

      <div className="w-full flex justify-end gap-3">
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
            loading={loading}
            type="submit"
            theme="dark"
          />
        </div>
      </div>
    </MyForm>
  );
};
