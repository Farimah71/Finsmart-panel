import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, MyForm, UploadFile, Error } from "../../../../components";
import { Field } from "formik";
import { useDispatch } from "react-redux";
import { createCompanyFile } from "../../../../redux/actions/settings/company-file";
import { useSelector } from "react-redux";
import * as Yup from "yup";

export const UploadCompanyFile = ({ onCloseModal, isReloadPage }) => {
  // -------- store ---------
  const { loading } = useSelector((state) => state.companyFileSlice);

  // -------- states -----------
  const [progress, setProgress] = useState(0);
  const [initialValue, setInitialValue] = useState({
    file: "",
  });

  // ---------- hook -----------
  const dispatch = useDispatch();

  // ---------- i18next ----------
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem("lng");

  // ---------- variable ------------
  const dataSchema = Yup.object().shape({
    file: Yup.string().required(t("error.file_required")),
  });

  // ---------- function --------
  const fileHandler = (file) => {
    setInitialValue({ file: file.get("file") });
  };
  const onSubmit = (value) => {
    dispatch(
      createCompanyFile(
        value,
        (status) => isReloadPage(status),
        (progress) => setProgress(progress)
      )
    );
  };

  // --------- render jsx ------------
  return (
    <>
      <div className="flex justify-between">
        <h4 className="text-18 font-bold dark:text-dark_custom-full-white p-3">
          {t("page_title.upload_company_file")}
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
        classes={
          "flex flex-col gap-y-5 justify-between p-10 h-full dark:bg-transparent"
        }
      >
        <div className="flex flex-col gap-y-4 border-2 border-dashed w-1/2 p-5 mb-5 mx-auto rounded text-center">
          <span className="text-gray-400">{t("text.click_to_upload")}</span>
          <div className="flex flex-col w-fit mx-auto items-center">
            <Field
              component={UploadFile}
              name="file"
              label={t("input.select_new_file")}
              formData
              fileHandler={fileHandler}
              accept="excel"
            />
            <Error name={"file"} />
          </div>
          {progress > 0 && progress < 100 && (
            <div className="flex flex-col gap-y-1 items-center">
              <progress value={progress} max={100}></progress>
              <span className="text-center">{progress}%</span>
            </div>
          )}
          {progress == 100 && (
            <span className="rounded bg-blue-100 p-2">
              {t("text.please_wait")}
            </span>
          )}
        </div>
        <div className="min-w-fit mx-auto text-center">
          <Field
            component={Button}
            type="submit"
            title={t("button.upload_file")}
            loading={loading}
            classes="mx-auto"
          />
        </div>
      </MyForm>
    </>
  );
};
