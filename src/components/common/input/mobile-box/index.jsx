import { useTranslation } from "react-i18next";
import { CountryData } from "react-phone-input-2";
import { BeatLoader } from "react-spinners";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export const PhoneNumberInput = ({
  countries,
  field,
  form,
  placeholder,
  disabled,
  autocomplete,
  label,
  onChange,
  loading,
}) => {
  // ---------- state ----------
  const { name, onBlur, value } = field;
  const { setFieldValue } = form;

  // ---------- variables ----------
  // const countries = countryInfo?.map((country) =>
  //   country.countryCode.toLowerCase()
  // );
  // const countryList =
  //   countries && countries.map((country) => country.title.toLowerCase());

  // ---------- hooks ----------
  const { t, i18n } = useTranslation();
  const lng = i18n.language;

  // ---------- functions ----------
  const changeHandler = (value) => {
    onChange && onChange(value);
    setFieldValue(name, value);
  };

  // ========== render jsx ============
  return (
    <div className="relative dark:bg-dark_custom-average-black">
      {label && (
        <label className="text-14 text-custom-dark dark:text-dark_custom-full-white font-medium">
          {label}
        </label>
      )}

      <PhoneInput
        inputProps={{
          name: name,
          disabled: disabled,
          autoComplete: autocomplete,
          className: `w-full h-8 lg:h-10 dark:bg-dark_custom-average-black dark:text-dark_custom-full-white rounded-md border border-custom-gray text-custom-dark text-16 placeholder:text-14 placeholder:text-custom-gray-muted p-2 outline-none ${
            label && "mt-2"
          }`,
        }}
        // onlyCountries={countries && countries}
        country={lng === "tr" ? "tr" : "tr"}
        value={value}
        onChange={(value) => changeHandler(value)}
        onBlur={onBlur}
        placeholder={placeholder}
        searchNotFound={t("mobile_input.not_found")}
        containerStyle={{
          "@media screen and (min-width:1023px)": { height: "40px" },
          width: "100%",
        }}
        dropdownStyle={{
          border: "4px solid custom-gray-300",
          borderRadius: 8,
        }}
        inputStyle={{
          paddingLeft: `${!value && "50px"}`,
          className:
            "w-full h-8 lg:h-10 bg-white rounded-md border border-custom-gray text-custom-dark text-16 placeholder:text-14 placeholder:text-custom-gray-muted p-2 outline-none",
        }}
        buttonStyle={{
          "@media screen and (max-width:1022px)": { height: "80%" },
          marginTop: "8px",
          border: "1px solid #E1E3EA",
        }}
        disableDropdown={disabled}
        onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
      />
      {loading && (
        <BeatLoader color="grey" size={6} className="absolute top-10 right-5" />
      )}
    </div>
  );
};
