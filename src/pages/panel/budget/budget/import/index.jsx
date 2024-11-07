import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  MyForm,
  Error,
  RadioButton,
  SelectBox,
} from "../../../../../components";
import { getCompanyBudgetHeaders } from "../../../../../redux/actions/settings/company-budget-header";
import { convertArrayToSelectOptions } from "../../../../../helpers/convert-array-to-select-options";
import { getDataFromJwtToken } from "../../../../../helpers/get-data-from-jwt";
import { useDispatch, useSelector } from "react-redux";
import { GrSelect } from "react-icons/gr";
import { Field } from "formik";
import * as Yup from "yup";

export const ImportBudgetFile = ({ onCloseModal, importTypeHandler }) => {
  // -------- store ---------
  // const { info: budgetHeaderData } = useSelector(
  //   (state) => state.companyBudgetHeaderSlice
  // );

  // -------- states -----------
  // const [isShowCombo, setIsShowCombo] = useState(false);
  // const [selectOption, setSelectOption] = useState();

  // ---------- hook -----------
  const dispatch = useDispatch();

  // ---------- i18next ----------
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem("lng");

  // ----------- lifeCycles ------------
  // useEffect(() => {
  //   if (budgetHeaderData.count) {
  //     const headers = convertArrayToSelectOptions(budgetHeaderData.data, [
  //       "companyBudgetHeaderId",
  //       "title",
  //     ]);
  //     setSelectOption(headers);
  //   }
  // }, [budgetHeaderData]);

  // ---------- variable ------------
  const dataSchema = Yup.object().shape({
    type: Yup.string().required(t("error.type_required")),
  });

  // ---------- function --------
  // const radioChangeHandler = (value) => {
  //   if (value === "update") {
  //     !Object.keys(budgetHeaderData).length &&
  //       dispatch(
  //         getCompanyBudgetHeaders({
  //           filters: [
  //             {
  //               property: "CompanyId",
  //               operation: 5,
  //               values: [`${getDataFromJwtToken("CompanyId")}`],
  //             },
  //           ],
  //         })
  //       );
  //     setIsShowCombo(true);
  //   } else setIsShowCombo(false);
  // };
  const onSubmit = (value) => {
    importTypeHandler(value.type);
    // dispatch(
    //   createCompanyBudgetFile(
    //     value,
    //     (status) => isReloadPage(status),
    //     (progress) => setProgress(progress)
    //   )
    // );
  };

  // --------- render jsx ------------
  return (
    <>
      <div className="flex justify-between">
        <h4 className="text-18 font-bold dark:text-dark_custom-full-white p-3">
          {t("page_title.import_type")}
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

      <div className="flex gap-x-1 mt-5 pl-3 items-center">
        <GrSelect size={18} />
        <span className=" font-extralight">
          {t("text.choose_import_type")}:
        </span>
      </div>
      <MyForm
        initialValues={{ type: null }}
        validation={dataSchema}
        submit={onSubmit}
        classes={"flex flex-col gap-y-10 p-5 dark:bg-transparent"}
      >
        <div className="flex flex-col w-1/2 mx-auto">
          <Field
            component={RadioButton}
            name="type"
            radioList={[
              { id: "new", value: t("input.from_file.label") },
              { id: "update", value: t("input.other_budget.label") },
            ]}
          />
          <Error name="type" />
        </div>
        {/*{isShowCombo && (
          <div className="flex flex-col">
            <Field component={SelectBox} options={selectOption} />
             <Error /> 
          </div>
        )}*/}

        <div className="min-w-fit mx-auto text-center">
          <Field
            component={Button}
            type="submit"
            title={t("button.next_title")}
          />
        </div>
      </MyForm>
    </>
  );
};
