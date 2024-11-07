import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Select, { components } from "react-select";

// ++++++++++ images import ++++++++++
import ArrowIcon from "../../../assets/images/down.png";
import { useSelector } from "react-redux";

const NoOptionsMessage = (props) => {
  // ---------- hooks ----------
  const { t } = useTranslation();

  return (
    <components.NoOptionsMessage {...props}>
      <span className="text-14 text-custom-gray-muted">
        {t("select.no_options_message")}
      </span>
    </components.NoOptionsMessage>
  );
};

export const SelectBox = ({
  field,
  form,
  label,
  placeholder,
  options,
  selectedOption,
  onChangeHandler,
  loading = false,
  disabled,
}) => {
  // ---------- store ----------
  const theme = useSelector((state) => state.themeSlice.theme);

  // ---------- state ----------
  const [option, setOption] = useState();

  // ---------- variables ----------
  const customStyles = {
    control: (
      provided,
      state
    ) => ({
      ...provided,
      borderColor: "#e5e7eb !important",
      borderRadius: "6px",
      height: "40px",
      cursor: "pointer",
      fontSize: "14px",
      backgroundColor: disabled
        ? theme === "light"
          ? "#f1f5f9 !important"
          : "#495057 !important"
        : !!options?.length
        ? "#fff"
        : "#F2F2F2",
      boxShadow: "none",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#99a1b7",
      opacity: 0.6,
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
      zIndex: "50",
      overflow: "hidden",
      fontSize: 14,
      "@media screen and (max-width: 1100px)": {
        ...provided["@media screen and (max-width: 1100px)"],
        height: "30px",
      },
    }),
    menu: (provided) => ({
      ...provided,
      "@media screen and (max-width: 1100px)": {
        ...provided["@media screen and (max-width: 1100px)"],
        maxHeight: "70px",
        overflow: "scroll",
      },
    }),
  };
  const { name } = field;
  const { setFieldValue } = form;

  // ---------- functions ----------
  const handleChange = (selected) => {
    setFieldValue(name, selected.value);
    setOption(selected);
    onChangeHandler && onChangeHandler(selected);
  };

  // ---------- lifeCycle ----------
  useEffect(() => {
    if (selectedOption) {
      setOption(selectedOption);
      setFieldValue(name, selectedOption.value);
    }
  }, [selectedOption]);

  // ---------- render jsx ----------
  return (
    <div className="flex flex-col gap-y-2 w-full">
      {label && (
        <label className="text-14 text-custom-dark font-medium mb-0.5 capitalize dark:text-dark_custom-full-white">
          {label}
        </label>
      )}
      <Select
        className="my-react-select-container"
        classNamePrefix="my-react-select"
        options={options}
        styles={customStyles}
        placeholder={placeholder}
        onChange={handleChange}
        value={option}
        maxMenuHeight={200}
        components={{ NoOptionsMessage }}
        isLoading={loading}
        isDisabled={disabled ? disabled : !!options?.length ? false : true}
      />
    </div>
  );
};
