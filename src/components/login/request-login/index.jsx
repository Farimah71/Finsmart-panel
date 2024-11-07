import { useEffect, useState } from "react";
import { Field } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { requestLogin } from "../../../redux/actions/auth";
import { MyForm, Input, Button, Error, Modal } from "../..";
import * as Yup from "yup";
// ++++++++++++++ image import ++++++++++++++++
import warnIcon from "../../../assets/icons/warning.gif";

export const RequestLogin = ({ onSetUserName }) => {
  // ---------- store ----------
  const isLoading = useSelector((state) => state.loadingSlice.isLoading);

  // ---------- states ----------
  const [isSHowModal, setIsShowModal] = useState(false);
  const [warning, setWarning] = useState("");
  const [userInfo, setUserInfo] = useState({
    identityKey: "",
    password: "",
  });

  // ---------- hooks ----------
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const lng = localStorage.getItem("lng");

  // --------- lifeCycle ----------
  useEffect(() => {
    i18n.changeLanguage(lng);
  }, [lng]);

  // ---------- variables ----------
  const requestLoginSchema = Yup.object({
    identityKey: Yup.string().required(t("error.userInfo_required")),
    password: Yup.string().required(t("error.enter_password_required")),
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
    onSetUserName(data.userInfo);
    dispatch(requestLogin(data, (status) => modalOpener(status)));
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
      <section className="w-full flex flex-col items-center">
        <div className="flex flex-col items-center mb-8 gap-y-4">
          <h2 className="text-custom-dark text-base md:text-19 font-bold">
            {t("login.welcome_title")}
          </h2>
          <p className="text-custom-dark text-sm md:text-base">
            {t("login.sub_title")}
          </p>
        </div>
        <MyForm
          initialValues={userInfo}
          validation={requestLoginSchema}
          submit={onSubmit}
        >
          <div className="w-full flex flex-col gap-y-8">
            <div className="flex flex-col gap-y-4">
              <div>
                <Field
                  component={Input}
                  placeholder={t("input.login_title.placeholder")}
                  type="text"
                  name="identityKey"
                  complex
                />
                <Error name="identityKey" />
              </div>
              <div>
                <Field
                  component={Input}
                  placeholder={t("input.enter_password_title.placeholder")}
                  type="password"
                  name="password"
                  complex
                />
                <Error name="password" />
              </div>
            </div>

            <Field
              component={Button}
              type="submit"
              theme="dark"
              classes="w-full uppercase"
              title={t("button.submit_title")}
              loading={isLoading}
            />
          </div>
        </MyForm>
      </section>
    </>
  );
};
