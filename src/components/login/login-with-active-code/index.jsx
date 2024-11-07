import { useState, useEffect } from "react";
import { Field } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { loginWithActiveCode, setStepForm } from "../../../redux/actions/auth";
import { MyForm, Button, Error, OTP, Modal } from "../..";
import { TbArrowBackUp } from "react-icons/tb";
import * as Yup from "yup";
// ++++++++++++++ image import ++++++++++++++++
import warnIcon from "../../../assets/icons/warning.gif";

export const LoginWithActiveCode = () => {
  // ---------- store ----------
  const isLoading = useSelector((state) => state.loadingSlice.isLoading);

  // ---------- states ----------
  const [isSHowModal, setIsShowModal] = useState(false);
  const [warning, setWarning] = useState("");
  const [initialValues, setInitialValues] = useState({
    companyId: null,
    activeCode: "",
    token: localStorage.login_Token,
  });

  // ---------- hooks ----------
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ---------- variables ----------
  const loginSchema = Yup.object({
    activeCode: Yup.string().required(t("error.active_code_required")),
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
  const stepHandler = () => {
    dispatch(setStepForm(1));
  };

  // ----------lifecycle----------
  useEffect(() => {
    initialValues.activeCode && onSubmit();
  }, [initialValues]);

  // ----------function----------
  const onSubmit = (value) => {
    dispatch(
      loginWithActiveCode(initialValues, navigate, (status) =>
        modalOpener(status)
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
      <section className="w-full flex flex-col items-center">
        <div className="flex flex-col items-center mb-8 gap-y-4">
          <h2 className="text-custom-dark text-base md:text-19 font-bold">
            {t("login.activation_code")}
          </h2>
          <p className="text-custom-dark text-sm md:text-base">
            {t("page_title.enter_active_code")}
          </p>
        </div>

        <MyForm
          initialValues={initialValues}
          validation={loginSchema}
          submit={onSubmit}
        >
          <div className="w-full flex flex-col items-center">
            <Field
              component={OTP}
              name="activeCode"
              inputType="number"
              autoFocus
              charCount={5}
              shouldSubmit={(value) => {
                setInitialValues((prev) => ({ ...prev, activeCode: value }));
              }}
            />
            <Error name={"activeCode"} />
          </div>
          <div className="w-full flex flex-col gap-y-4">
            <div className="flex gap-x-4 mt-4">
              <Field
                component={Button}
                type="button"
                theme="light"
                classes="!w-auto px-6"
                onClick={stepHandler}
                componentIcon={<TbArrowBackUp className="w-5 h-5" />}
              />
              <Field
                component={Button}
                type="submit"
                theme="dark"
                classes="w-full"
                title={t("button.submit_title")}
                loading={isLoading}
              />
            </div>
          </div>
        </MyForm>
      </section>
    </>
  );
};
