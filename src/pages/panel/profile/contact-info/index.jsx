import { useState } from "react";
import {
  Button,
  Input,
  MyForm,
  SelectBox,
  Error,
  PhoneNumberInput,
} from "../../../../components";
import { Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getDataFromLocalStorage } from "../../../../helpers/get-data-from-local";
import { TbWorld, TbBrandTelegram } from "react-icons/tb";
import { FaLinkedinIn } from "react-icons/fa";
import { MdWhatsapp } from "react-icons/md";
import { createCompanyContact } from "../../../../redux/actions/settings/company-contact";
import { getDataFromJwtToken } from "../../../../helpers/get-data-from-jwt";
import { omit } from "lodash";
import * as Yup from "yup";

export const ContactInfo = ({ onCloseModal, isReload }) => {
  //  -------- states --------
  const [contactType, setContactType] = useState();
  const [logo, setLogo] = useState();
  const [formValues, setFormValues] = useState({
    companyId: getDataFromJwtToken("CompanyId"),
    userInfoId: +getDataFromLocalStorage("userInfoId"),
    contactType: null,
    urlValue: "",
    phoneValue: "",
    logoTitle: "",
  });

  // --------- store -----------
  const { loading } = useSelector((state) => state.companyContactSlice);

  // ---------- i18next ----------
  const { t, i18n } = useTranslation();

  // ---------- hooks ---------
  const dispatch = useDispatch();

  // --------- variables ----------
  const dataSchema = Yup.object().shape({
    contactType: Yup.string().required(t("error.contact_type_required")),
    urlValue:
      contactType !== 2 &&
      Yup.string()
        .required(t("error.url_required"))
        .matches(/^https?:\/\/.*$/, t("error.url_bad_format")),
    phoneValue:
      contactType === 2 && Yup.string().required(t("error.mobileNo_required")),
  });
  const selectOptions = [
    { value: 1, label: "URL" },
    { value: 2, label: "Phone" },
  ];

  // ---------- function --------
  const onSubmit = (values) => {
    !logo && alert("Please choose a logo!");
    const clone = {
      ...values,
      logoTitle: logo,
    };
    const data = omit(clone, contactType === 1 ? "phoneValue" : "urlValue");
    const dataToSend = {
      companyId: getDataFromJwtToken("CompanyId"),
      userInfoId: +getDataFromLocalStorage("userInfoId"),
      contactType: data.contactType,
      value: data.phoneValue ? data.phoneValue : data.urlValue,
      logoTitle: data.logoTitle,
    };
    logo &&
      dispatch(
        createCompanyContact(dataToSend, (status) => {
          isReload(status);
          onCloseModal(status);
        })
      );
  };

  // -------- render jsx ---------
  return (
    <MyForm
      initialValues={formValues}
      validation={dataSchema}
      doNotInitialize
      submit={onSubmit}
      classes={"flex flex-col gap-y-3 p-5 dark:bg-transparent"}
    >
      <div className="flex">
        <p className="text-xl dark:text-custom-gray-light">
          {t("page_title.contact_info")}
        </p>
        <div
          className="cursor-pointer dark:text-dark_custom-full-white ml-auto mr-2"
          onClick={() => onCloseModal()}
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
      <div className="w-full flex gap-3 mt-3">
        <div className="w-1/2">
          <Field
            component={SelectBox}
            name={"contactType"}
            label={t("input.contact_type.label")}
            placeholder={t("input.contact_type.placeholder")}
            options={selectOptions}
            onChangeHandler={(value) => setContactType(value.value)}
          />
          <Error name={"contactType"} />
        </div>

        {contactType && contactType !== 2 && (
          <div className="w-1/2">
            <Field
              component={Input}
              name={"urlValue"}
              label={t("input.link.label")}
              placeholder="https://www.example.com"
              complex
            />
            <Error name={"urlValue"} />
          </div>
        )}
        {contactType && contactType === 2 && (
          <div className="w-1/2 flex flex-col gap-y-2">
            <Field
              component={PhoneNumberInput}
              name={"phoneValue"}
              label={t("input.phone_number_title.label")}
              placeholder={t("input.phone_number_title.label")}
            />
            <Error name={"phoneValue"} />
          </div>
        )}
      </div>

      <div className="flex justify-between mt-3">
        <div className="flex gap-x-2">
          {contactType === 1 && (
            <TbWorld
              size={20}
              className={`cursor-pointer ${
                logo === "Website"
                  ? "text-custom-blue"
                  : "text-custom-gray-dark hover:text-custom-gray-muted"
              }`}
              onClick={() => setLogo("Website")}
            />
          )}
          {contactType === 1 && (
            <FaLinkedinIn
              size={20}
              className={`cursor-pointer ${
                logo === "LinkedIn"
                  ? "text-custom-blue"
                  : "text-custom-gray-dark hover:text-custom-gray-muted"
              }`}
              onClick={() => setLogo("LinkedIn")}
            />
          )}
          {contactType && (
            <MdWhatsapp
              size={20}
              className={`cursor-pointer ${
                logo === "WhatsApp"
                  ? "text-custom-blue"
                  : "text-custom-gray-dark hover:text-custom-gray-muted"
              }`}
              onClick={() => setLogo("WhatsApp")}
            />
          )}
          {contactType && (
            <TbBrandTelegram
              size={20}
              className={`cursor-pointer ${
                logo === "Telegram"
                  ? "text-custom-blue"
                  : "text-custom-gray-dark hover:text-custom-gray-muted"
              }`}
              onClick={() => setLogo("Telegram")}
            />
          )}
        </div>
        <Button
          title={t("button.save_title")}
          loading={loading}
          type="submit"
          theme="dark"
        />
      </div>
    </MyForm>
  );
};
