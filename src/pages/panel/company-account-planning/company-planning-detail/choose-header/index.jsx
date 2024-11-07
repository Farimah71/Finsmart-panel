import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Error, MyForm, SelectBox } from "../../../../../components";
import { convertArrayToSelectOptions } from "../../../../../helpers/convert-array-to-select-options";
import { Field } from "formik";
import { useDispatch } from "react-redux";
import { copyCompanyFinsmartCodingHeader } from "../../../../../redux/actions/settings/company-Finsmart-coding-header";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import * as Yup from "yup";

export const ChooseHeader = ({ state, isReloadPage, onCloseModal }) => {
  // ---------- state -----------
  const [selectOptions, setSelectOptions] = useState({});

  // ---------- store -----------
  const { loading } = useSelector(
    (state) => state.companyFinsmartCodingHeaderSlice
  );

  // ---------- i18next ----------
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem("lng");

  // ---------- hooks -----------
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // --------- lifecycle-----------
  useEffect(() => {
    if (state.count) {
      const options = convertArrayToSelectOptions(state.data, [
        "finsmartCodingHeaderId",
        "title",
      ]);
      setSelectOptions(options);
    }
  }, []);

  // ------------ variables -----------
  const initialValue = { id: null };
  const dataSchema = Yup.object().shape({
    id: Yup.number().required(t("error.header_required")),
  });

  // ------- function ----------
  const onSubmit = (value) => {
    dispatch(
      copyCompanyFinsmartCodingHeader(value.id, (status) => {
        isReloadPage(status);
        onCloseModal();
      })
    );
  };

  // ---------- render jsx ----------
  return (
    <div className="dark:bg-dark_custom-light-black rounded-10">
      <div
        className="cursor-pointer dark:text-dark_custom-full-white flex justify-between p-3"
        onClick={onCloseModal}
      >
        <div className="flex flex-col gap-y-1">
          <h4 className="text-19 text-custom-dark font-bold dark:text-dark_custom-full-white">
            {t("page_title.choose_header")}
          </h4>
        </div>
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

      <hr />
      <div className="flex flex-col gap-y-8 w-full p-6 pb-2 bg-white dark:bg-dark_custom-light-black rounded-b-11">
        <MyForm
          initialValues={initialValue}
          validation={dataSchema}
          submit={onSubmit}
          classes={"dark:bg-transparent"}
        >
          <div className="w-1/2 mx-auto pb-10">
            <Field
              component={SelectBox}
              name="id"
              options={selectOptions}
              label={t("input.choose_header.label")}
              placeholder={t("input.choose_header.placeholder")}
            />
            <Error name="id" />

            <Button
              title={t("button.select_title")}
              classes="px-4 mx-auto mt-20"
              type="submit"
              loading={loading}
            />
          </div>
        </MyForm>
      </div>
    </div>
  );
};
