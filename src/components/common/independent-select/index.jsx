import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";

export const IndependentSelect = ({
  name,
  options,
  selectedOption,
  onChangeHandler,
}) => {
  // ---------- state ----------
  const [option, setOption] = useState();

  // ---------- store ----------
  const theme = useSelector((state) => state.themeSlice.theme);

  // ---------- functions ----------
  const handleChange = (selected) => {
    setOption(selected);
    onChangeHandler && onChangeHandler(selected);
  };

  // ---------- lifeCycle ----------
  useEffect(() => {
    if (selectedOption) {
      setOption(selectedOption);
    }
  }, [selectedOption]);

  //   ---------- variable ----------
  const selectCustomStyle = {
    control: (provided) => ({
      ...provided,
      height: "15px",
      cursor: "pointer",
      fontSize: 12,
      backgroundColor: theme === "light" ? "white" : "#343a40",
      boxShadow: "none",
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: 13,
      backgroundColor:
        theme === "light" ? "#f1f5f9 !important" : "#495057 !important",
      boxShadow: "none",
      cursor: "pointer",
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected && theme === "dark" ? "white" : "black",
    }),
  };

  // ---------- render JSX ----------
  return (
    <Select
      className="w-32 h-12 p-1 my-react-select-container"
      classNamePrefix="my-react-select"
      name={name}
      menuPortalTarget={document.body}
      styles={selectCustomStyle}
      maxMenuHeight={100}
      options={options}
      value={option}
      onChange={handleChange}
    />
  );
};
