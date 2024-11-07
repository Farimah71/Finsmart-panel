import React, { useState, useEffect } from "react";
import { Error, Modal, MyForm, OTP } from "../..";
import { Field } from "formik";
import { Button } from "../../index";
import { useTranslation } from "react-i18next";
import { TbArrowBackUp } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { verifyForgetPassword } from "../../../redux/actions/auth";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
// ++++++++++++++ image import ++++++++++++++++
import warnIcon from "../../../assets/icons/warning.gif";

export const ForgetPasswordVerify = ({
  setActiveIndex,
  username,
  setActiveCode,
}) => {
  // ---------- store ----------
  const isLoading = useSelector((state) => state.loadingSlice.isLoading);

  // ---------- states ----------
  const [isSHowModal, setIsShowModal] = useState(false);
  const [warning, setWarning] = useState("");
  const [initialValue, setInitialValue] = useState({
    identityKey: username,
    activeCode: "",
    password: "",
  });

  // ---------- hooks ----------
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ---------- i18next ----------
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem("lng");

  // ---------- variable ----------
  const validation = Yup.object().shape({
    activeCode: Yup.string().required(t("error.enter_active_code")),
  });

  // ---------- lifecycle ----------
  useEffect(() => {
    initialValue.activeCode && onSubmit();
  }, [initialValue]);

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
  const onSubmit = (value) => {
    setActiveCode(initialValue.activeCode);
    dispatch(
      verifyForgetPassword(initialValue, setActiveIndex, (status) =>
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
        doNotInitialize
        submit={onSubmit}
        initialValues={initialValue}
        validation={validation}
        classes={"w-full flex flex-col gap-y-4 justify-center items-center"}
      >
        <div className="mt-6">
          <Field
            component={OTP}
            name="activeCode"
            inputType="number"
            charCount={5}
            autoFocus
            shouldSubmit={(value) => {
              setInitialValue((values) => ({ ...values, activeCode: value }));
            }}
          />
          <Error name={"activeCode"} />
        </div>
        <div>
          <div className="flex flex-row gap-2 mt-6">
            <Field
              component={Button}
              type="button"
              theme="light"
              classes="!w-auto px-6"
              onClick={() => setActiveIndex(1)}
              componentIcon={<TbArrowBackUp className="w-5 h-5" />}
            />
            <Field
              component={Button}
              type="submit"
              theme="dark"
              classes="w-full uppercase"
              title={t("button.submit_title")}
              loading={isLoading}
            />
          </div>
        </div>
      </MyForm>
    </>
  );
};
