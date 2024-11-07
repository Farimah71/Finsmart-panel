import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  MyForm,
  Error,
  Input,
  SelectBox,
  CustomDatePicker,
} from "../../../../components";
import { getDefinitions } from "../../../../redux/actions/settings/definition";
import { convertArrayToSelectOptions } from "../../../../helpers/convert-array-to-select-options";
import { convertDateToString } from "../../../../helpers/convert-date-to-string";
import { getDataFromJwtToken } from "../../../../helpers/get-data-from-jwt";
import { clearInfo } from "../../../../redux/reducers/settings/definition";
import {
  editPersonnel,
  getByIdPersonnel,
} from "../../../../redux/actions/settings/personnel";
import { Field } from "formik";
import * as Yup from "yup";

export const EditPersonnel = ({ editId, onCloseModal, isReloadPage }) => {
  // ---------- store ----------
  const { editInfo, loading } = useSelector((state) => state.personnelSlice);
  const { info: definitionData, getLoading: definitionLoading } = useSelector(
    (state) => state.definitionSlice
  );

  // ---------- state ----------
  const [selectOption, setSelectOption] = useState({
    department: [],
    position: [],
    contractType: [],
  });
  const [selectedOption, setSelectedOption] = useState({
    department: {},
    position: {},
    contractType: {},
  });
  const [initialValue, setInitialValue] = useState({
    personelId: 0,
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

  // ---------- hooks ----------
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // ---------- lifeCycles ----------
  useEffect(() => {
    dispatch(getByIdPersonnel(editId));
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
    if (Object.keys(editInfo).length > 0) {
      setInitialValue({
        personelId: editId,
        companyId: editInfo.companyId,
        firstname: editInfo.firstname,
        surname: editInfo.surname,
        departmentId: editInfo.departmentId,
        positionId: editInfo.positionId,
        contractTypeId: editInfo.contractTypeId,
        salary: editInfo.salary,
        status: editInfo.status,
        startDate: editInfo.startDate && new Date(editInfo.startDate),
        exitDate: editInfo.exitDate && new Date(editInfo.exitDate),
        description: editInfo.description,
      });
    }
  }, [editInfo]);
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
  useEffect(() => {
    const contractType = selectOption.contractType?.find(
      (i) => i.value === editInfo.contractTypeId
    );
    const position = selectOption.position?.find(
      (i) => i.value === editInfo.positionId
    );
    const department = selectOption.department?.find(
      (i) => i.value === editInfo.departmentId
    );
    setSelectedOption({
      contractType: contractType,
      position: position,
      department: department,
    });
  }, [selectOption]);

  // ---------- variable ----------
  const dataSchema = Yup.object().shape({
    firstname: Yup.string().required(t("error.first_name_required")),
    positionId: Yup.number().required(t("error.position_required")),
    departmentId: Yup.number().required(t("error.department_required")),
    contractTypeId: Yup.number().required(t("error.contract_type_required")),
  });

  // ---------- functions ----------
  const reloadPageHandler = (status) => {
    if (status) {
      onCloseModal();
      isReloadPage();
    }
  };
  const closeHandler = () => {
    onCloseModal();
  };
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
    dispatch(
      editPersonnel(editId, data, (status) => reloadPageHandler(status))
    );
  };

  // ---------- render jsx ----------
  return (
    <>
      <div className="flex items-center justify-between p-4 select-none border-b border-custom-gray-light dark:bg-dark_custom-average-black rounded-t-10">
        <h4 className="text-18 font-bold dark:text-dark_custom-full-white rounded-10">
          {t("page_title.edit_personnel")}
        </h4>
        <div
          className="cursor-pointer dark:text-dark_custom-full-white"
          onClick={closeHandler}
        >
          <svg
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
      <div className="flex-grow overflow-y-auto rounded-b-10">
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
                selectedOption={selectedOption.department}
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
                selectedOption={selectedOption.position}
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
                selectedOption={selectedOption.contractType}
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
              title={t("button.save_title")}
              loading={loading}
            />
          </div>
        </MyForm>
      </div>
    </>
  );
};
