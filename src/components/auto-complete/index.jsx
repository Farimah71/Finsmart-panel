import { useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
// import SearchIcon from "../../assets/images/search.png";

export const AutoComplete = ({
  placeholder,
  label,
  onChange,
  options,
  form,
  field,
  loading
}) => {
  // ---------- state ----------
  const [selectedTitle, setSelectedTitle] = useState("");

  // ---------- variables ----------
  const customStyles = {
    control: (
      provided,
      state
      // props: ControlProps<ISelectOption, boolean, GroupBase<any>>
    ) => ({
      ...provided,
      height: "42px",
      borderColor: "#e5e7eb !important",
      borderRadius: "6px",
      cursor: "text",
      fontSize: "16px",
      backgroundColor: "#FFF",
      boxShadow: "none",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#99a1b7",
      fontSize: 14,
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      cursor: "pointer",
    }),
    clearIndicator: (provided) => ({
      ...provided,
      pointerEvents: "auto",
      cursor: "pointer",
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "gray" : "black",
      backgroundColor: state.isSelected ? "#EFEFEF" : "white",
      cursor: "pointer",
      outline: "none",
    }),
  };
  const { name } = field || {};
  const { setFieldValue } = form || {};

  // ---------- hooks ----------
  const { t } = useTranslation();

  // ---------- functions ----------
  const handleChange = (selected) => {
    setFieldValue && setFieldValue(name, selected.id);
    setSelectedTitle(selected);
  };

  // ---------- render jsx ----------
  return (
    <div className="flex flex-col gap-y-2 w-full">
      {label && (
        <label className="text-14 text-custom-dark font-medium">{label}</label>
      )}
      <Select
        {...field}
        options={options}
        value={selectedTitle}
        onChange={handleChange}
        onInputChange={onChange}
        isLoading={loading}
        loadingMessage={() => t("text.loading")}
        isSearchable
        isClearable
        openMenuOnClick={false}
        placeholder={placeholder}
        styles={customStyles}
      />
    </div>
  );
};
