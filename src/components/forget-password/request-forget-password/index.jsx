import React, { useState } from "react";
import { MyForm } from "../../common/form";
import { Field } from "formik";
import { Error } from "../../ui/error";
import { Button } from "../../button";
import { useTranslation } from "react-i18next";
import { Input } from "../../common/input";
import { useDispatch, useSelector } from "react-redux";
import { requestForgetPassword } from "../../../redux/actions/auth";
import { Modal } from "../../modal";
import * as Yup from "yup";
// ++++++++++++++ image import ++++++++++++++++
import warnIcon from "../../../assets/icons/warning.gif";

export const RequestForgetPassword = ({ setActiveIndex, setUsername }) => {
  // ---------- states ----------
  const [isSHowModal, setIsShowModal] = useState(false);
  const [warning, setWarning] = useState("");

  // ---------- store ----------
  const isLoading = useSelector((state) => state.loadingSlice.isLoading);

  // ---------- i18next ----------
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem("lng");

  //   ----------hooks----------
  const dispatch = useDispatch();

  // ----------variables----------
  const initialValue = {
    identityKey: "",
  };

  const validation = Yup.object().shape({
    identityKey: Yup.string().required(
      t("error.forget_password_userinfo_required")
    ),
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
  const onSubmit = (values) => {
    setUsername(values.identityKey);
    dispatch(
      requestForgetPassword(values, setActiveIndex, (status) =>
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
      <MyForm
        initialValues={initialValue}
        validation={validation}
        submit={onSubmit}
      >
        <div>
          <Field
            component={Input}
            name="identityKey"
            placeholder={t("input.forget_password.placeholder")}
            type="text"
            complex
          />
          <Error name="identityKey" />
        </div>
        <div className="mt-6">
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
    </>
  );
};
