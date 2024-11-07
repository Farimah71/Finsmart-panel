import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  MyForm,
  Error,
  Input,
  SelectBox,
  CustomDatePicker,
} from "../../../../components";
import { getDataFromJwtToken } from "../../../../helpers/get-data-from-jwt";
import { convertArrayToSelectOptions } from "../../../../helpers/convert-array-to-select-options";
import { convertDateToString } from "../../../../helpers/convert-date-to-string";
import { getDefinitions } from "../../../../redux/actions/settings/definition";
import { createPersonnel } from "../../../../redux/actions/settings/personnel";
import { useDispatch } from "react-redux";
import { clearInfo } from "../../../../redux/reducers/settings/definition";
import { useSelector } from "react-redux";
import { Field } from "formik";
import * as Yup from "yup";

export const CreatePersonnel = ({ onCloseModal, isReloadPage }) => {
  // -------- store ---------
  const { loading } = useSelector((state) => state.personnelSlice);
  const { info: definitionData, getLoading: definitionLoading } = useSelector(
    (state) => state.definitionSlice
  );

  // -------- states -----------
  const [selectOption, setSelectOption] = useState({
    department: [],
    position: [],
    contractType: [],
  });
  const [initialValue, setInitialValue] = useState({
    companyId: getDataFromJwtToken("CompanyId"),
    firstname: "",
    surname: "",
    departmentId: null,
    positionId: null,
    contractTypeId: null,
    salary: 0,
    status: 0,
    startDate: "",
    exitDate: "",
    description: "",
  });

  // ---------- hook -----------
  const dispatch = useDispatch();

  // ---------- i18next ----------
  const { t, i18n } = useTranslation();
  const lng = localStorage.getItem("lng");

  // ---------- lifeCycles ----------
  useEffect(() => {
    dispatch(
      getDefinitions({
        filters: [
          {
            property: "DefinationTypeId",
            operation: 5,
            values: ["1", "5", "6"],
          },
        ],
      })
    );
    return () => {
      dispatch(clearInfo());
    };
  }, []);
  useEffect(() => {
    if (definitionData.count) {
      const definitions = definitionSeparator(definitionData.data);
      const contractTypes = convertArrayToSelectOptions(
        definitions.contractTypes,
        ["definationId", "title"]
      );
      const departments = convertArrayToSelectOptions(definitions.departments, [
        "definationId",
        "title",
      ]);
      const positions = convertArrayToSelectOptions(definitions.positions, [
        "definationId",
        "title",
      ]);

      setSelectOption({
        contractType: contractTypes,
        department: departments,
        position: positions,
      });
    }
  }, [definitionData]);

  // ---------- variable ------------
  const dataSchema = Yup.object().shape({
    firstname: Yup.string().required(t("error.first_name_required")),
    positionId: Yup.number().required(t("error.position_required")),
    departmentId: Yup.number().required(t("error.department_required")),
    contractTypeId: Yup.number().required(t("error.contract_type_required")),
    startDate: Yup.string().required(t("error.start_date_required")),
    exitDate: Yup.string().required(t("error.exit_date_required")),
  });

  // ---------- function --------
  const definitionSeparator = (def) => {
    const contractTypes = def.filter((d) => d.definationTypeId === 1);
    const departments = def.filter((d) => d.definationTypeId === 5);
    const positions = def.filter((d) => d.definationTypeId === 6);
    return {
      contractTypes: contractTypes,
      departments: departments,
      positions: positions,
    };
  };
  const onSubmit = (value) => {
    const data = {
      ...value,
      startDate: convertDateToString(value.startDate),
      exitDate: convertDateToString(value.exitDate),
    };
    dispatch(createPersonnel(data, (status) => isReloadPage(status)));
  };

  // --------- render jsx ------------
  return (
    <>
      <div className="flex justify-between">
        <h4 className="text-18 font-bold dark:text-dark_custom-full-white p-3">
          {t("page_title.create_personnel")}
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
        classes={"p-3 dark:bg-transparent"}
      >
        <div className="w-full flex gap-x-5 mb-4">
          <div className="flex flex-col w-1/2">
            <Field
              component={Input}
              name="firstname"
              label={t("input.first_name_title.label")}
              placeholder={t("input.first_name_title.placeholder")}
              complex
            />
            <Error name="firstname" />
          </div>
          <div className="flex flex-col w-1/2">
            <Field
              component={Input}
              name="surname"
              label={t("input.family.label")}
              placeholder={t("input.family.placeholder")}
              complex
            />
            <Error name="surname" />
          </div>
        </div>

        <div className="w-full flex gap-x-5 mb-4">
          <div className="flex flex-col w-1/2">
            <Field
              component={SelectBox}
              name="departmentId"
              label={t("input.department.label")}
              placeholder={t("input.department.placeholder")}
              options={selectOption.department}
              loading={definitionLoading}
            />
            <Error name="departmentId" />
          </div>
          <div className="flex flex-col w-1/2">
            <Field
              component={SelectBox}
              name="positionId"
              label={t("input.position.label")}
              placeholder={t("input.position.placeholder")}
              options={selectOption.position}
              loading={definitionLoading}
            />
            <Error name="positionId" />
          </div>
        </div>
        <div className="w-full flex gap-x-5 mb-4">
          <div className="flex flex-col w-1/2">
            <Field
              component={SelectBox}
              name="contractTypeId"
              label={t("input.contract_type.label")}
              placeholder={t("input.contract_type.placeholder")}
              options={selectOption.contractType}
              loading={definitionLoading}
            />
            <Error name="contractTypeId" />
          </div>
          <div className="flex flex-col w-1/2">
            <Field
              component={Input}
              type="number"
              name="salary"
              label={t("input.salary.label")}
              placeholder={t("input.salary.placeholder")}
            />
          </div>
        </div>

        <div className="w-full flex gap-x-5 mb-4">
          <div className="flex flex-col w-1/2">
            <Field
              component={Input}
              type="number"
              name="status"
              label={t("input.status.label")}
              placeholder={t("input.status.placeholder")}
            />
          </div>
          <div className="flex flex-col w-1/2">
            <Field
              component={CustomDatePicker}
              name="startDate"
              label={t("input.start_date.label")}
              placeholder={t("input.start_date.placeholder")}
            />
            <Error name="startDate" />
          </div>
        </div>

        <div className="w-full flex gap-x-5 mb-4">
          <div className="flex flex-col w-1/2">
            <Field
              component={CustomDatePicker}
              name="exitDate"
              label={t("input.exit_date.label")}
              placeholder={t("input.exit_date.placeholder")}
            />
            <Error name="exitDate" />
          </div>
          <div className="flex flex-col w-1/2">
            <Field
              component={Input}
              type="textarea"
              name="description"
              label={t("input.description.label")}
              placeholder={t("input.description.placeholder")}
            />
          </div>
        </div>

        <div className="mt-5 w-fit ml-auto">
          <Field
            component={Button}
            type="submit"
            title={t("button.create_title")}
            loading={loading}
          />
        </div>
      </MyForm>
    </>
  );
};
