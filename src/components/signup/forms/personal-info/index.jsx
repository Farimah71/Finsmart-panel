import { useState, useEffect } from "react";
import { Field } from "formik";
import { useTranslation } from "react-i18next";
import { setUserInfo } from "../../../../redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../../../../redux/actions/settings/country";
import { omit } from "lodash";
import {
  MyForm,
  Input,
  Button,
  Error,
  UploadFile,
  Modal,
  PhoneNumberInput,
} from "../../..";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
// ++++++++++++++ image import ++++++++++++++++
import warnIcon from "../../../../assets/icons/warning.gif";

export const PersonalInfo = () => {
  // ---------- states ----------
  const [isSHowModal, setIsShowModal] = useState(false);
  const [warning, setWarning] = useState("");
  const [statusSubmit, setStatusSubmit] = useState(false);
  const [readOnlyInput, setReadOnlyInput] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    repeatPassword: "",
    email: "",
    mobileNo: "",
    nationalCode: "",
    avatar: "",
    activationCode: "",
    isActive: true,
    isLock: false,
    fromTime: null,
    toTime: null,
    fromDate: null,
    toDate: null,
  });

  // ---------- store ----------
  const isLoading = useSelector((state) => state.authSlice.loading);
  const { data: countries } = useSelector((state) => state.countrySlice.info);

  // ---------- hooks ----------
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ---------- lifecycle ----------
  useEffect(() => {
    dispatch(getCountries({ filters: [] }));
  }, []);

  // ---------- variables ----------
  const personalInfoSchema = Yup.object().shape({
    firstName: Yup.string().required(t("error.first_name_required")),
    lastName: Yup.string().required(t("error.last_name_required")),

    password: Yup.string()
      .min(8, t("error.min_pass_required"))
      .max(16, t("error.max_pass_required"))
      .required(t("error.password_required"))
      .matches(
        /^(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        t("error.password_invalid")
      ),

    repeatPassword: Yup.string()
      .required(t("error.repeat_password_required"))
      .oneOf([Yup.ref("password")], t("error.password_match_not")),

    email: Yup.string()
      .required(t("error.email_required"))
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        t("error.email_invalid")
      ),

    mobileNo: Yup.string()
      .min(7, t("error.mobileNo_invalid"))
      .required(t("error.mobileNo_required")),
  });

  // ---------- functions ----------
  const closeModalHandler = () => {
    setIsShowModal(false);
  };
  const modalOpener = (status) => {
    if (status) {
      setIsShowModal(true);
      setWarning(status);
    }
  };
  const onSubmit = (data) => {
    const dataSend = omit(data, "repeatPassword");
    let cloneSend = { ...dataSend };
    cloneSend = { ...cloneSend, userName: dataSend.email };

    // const dataCache = omit(data, "password", "repeatPassword");
    dispatch(
      setUserInfo(
        cloneSend,
        (status) => setStatusSubmit(status),
        navigate,
        (status) => modalOpener(status)
      )
    );
  };

  // ---------- render jsx ----------
  return (
    <>
      <Modal state={isSHowModal} onCloseModal={closeModalHandler} small>
        <div className="flex flex-col rounded bg-white p-5">
          <div className="cursor-pointer ml-auto" onClick={closeModalHandler}>
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
          <img src={warnIcon} alt="warning" className="w-[30%] mx-auto" />
          <p className="my-10 text-center">{warning}</p>
        </div>
      </Modal>
      <section className="w-full flex flex-col gap-y-20">
        <MyForm
          initialValues={personalInfo}
          validation={personalInfoSchema}
          submit={onSubmit}
          classes="w-full mx-auto bg-white rounded-11 px-5 md:px-20 py-10 shadow-md"
        >
          <div className="mt-6 flex flex-col items-center">
            <h4 className="text-custom-dark text-xl font-semibold md:text-4xl md:font-normal">
              {t("page_title.signUp")}
            </h4>
            <p className="text-custom-dark text-base md:text-19 mt-3">
              {t("signup.personal_info_title")}
            </p>
          </div>
          <div className="flex flex-col gap-y-6 mt-10">
            <div className="w-full flex flex-col gap-y-2">
              <Field
                name="avatar"
                component={UploadFile}
                label={t("input.upload_avatar_title")}
                fileFormats=".png, .jpg, .jpeg files"
                size="2MB"
              />
            </div>
            <div className="w-full flex flex-col gap-y-2">
              <Field
                component={Input}
                name="firstName"
                placeholder={t("input.first_name_title.placeholder")}
                label={t("input.first_name_title.label")}
                disabled={readOnlyInput}
              />
              <Error name="firstName" />
            </div>
            <div className="w-full flex flex-col gap-y-2">
              <Field
                component={Input}
                name="lastName"
                placeholder={t("input.last_name_title.placeholder")}
                label={t("input.last_name_title.label")}
                disabled={readOnlyInput}
              />
              <Error name="lastName" />
            </div>
            <div className="w-full flex flex-col gap-y-2">
              <Field
                component={Input}
                name="email"
                placeholder={t("input.email_title.placeholder")}
                label={t("input.email_title.label")}
                disabled={readOnlyInput}
                complex
              />
              <Error name="email" />
            </div>
            <div className="w-full flex flex-col gap-y-2">
              <Field
                component={Input}
                name="password"
                type="password"
                placeholder={t("input.password_title.placeholder")}
                label={t("input.password_title.label")}
                disabled={readOnlyInput}
                complex
              />
              <Error name="password" />
            </div>
            <div className="w-full flex flex-col gap-y-2">
              <Field
                component={Input}
                name="repeatPassword"
                type="password"
                placeholder={t("input.repeat_password_title.placeholder")}
                label={t("input.repeat_password_title.label")}
                disabled={readOnlyInput}
                complex
              />
              <Error name="repeatPassword" />
            </div>

            <div className="w-full flex flex-col gap-y-2">
              {countries && (
                <Field
                  component={PhoneNumberInput}
                  // countries={
                  //   countries && countries.map((country) => country.countryCode)
                  // }
                  type="number"
                  name="mobileNo"
                  placeholder={t("input.phone_number_title.placeholder")}
                  label={t("input.phone_number_title.label")}
                  disabled={readOnlyInput}
                />
              )}
              <Error name="mobileNo" />
            </div>
            {/* <div className="w-full">
            <Field
              component={Input}
              type="number"
              name="nationalCode"
              placeholder={t("input.national_code_title.placeholder")}
              label={t("input.national_code_title.label")}
              disabled={readOnlyInput}
            />
            <Error name="nationalCode" />
          </div> */}
            <div className="w-full flex items-center gap-x-4 mt-4">
              <Field
                component={Button}
                type={readOnlyInput ? "button" : "submit"}
                theme="dark"
                title={t("button.submit_title")}
                loading={isLoading}
                classes="w-full uppercase"
                onClick={() => stepFormHandler("next")}
              />
            </div>
          </div>
        </MyForm>
      </section>
    </>
  );
};
