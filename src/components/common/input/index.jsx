// import { CiCalendarDate } from "react-icons/ci";
import { useSelector } from "react-redux";
import { TextInput } from "./text-input";
import { NumberInput } from "./number-input";

export const Input = ({
  field,
  placeholder,
  label,
  type = "text",
  classes,
  disabled,
  onChange,
  readOnly = false,
  complex,
}) => {
  // ----------store----------
  let theme = useSelector((state) => state.themeSlice.theme);

  // ---------- render jsx ----------
  return (
    <>
      {type === "textarea" ? (
        <div>
          <label className="text-14 text-custom-dark font-medium capitalize dark:text-dark_custom-full-white">
            {label}
          </label>
          <textarea
            {...field}
            className={`w-full bg-white text-14 resize-none border border-custom-gray rounded-md placeholder:select-none ${
              theme === "light"
                ? "disabled:bg-slate-100"
                : "disabled:dark:bg-[#495057]"
            } bg-dark_custom-average-black placeholder:text-14 text-custom-dark p-2 mt-2 outline-none ${classes} dark:bg-dark_custom-average-black dark:placeholder:text-dark_custom-gray-muted dark:text-dark_custom-full-white`}
            placeholder={placeholder}
            rows={5}
            disabled={disabled}
            readOnly={readOnly}
          />
        </div>
      ) : type === "number" ? (
        <NumberInput
          field={field}
          onChange={onChange}
          placeholder={placeholder}
          label={label}
          readOnly={readOnly}
          disabled={disabled}
          classes={classes}
          theme={theme}
        />
      ) : (
        <TextInput
          field={field}
          type={type}
          onChange={onChange}
          placeholder={placeholder}
          label={label}
          complex={complex}
          readOnly={readOnly}
          disabled={disabled}
          classes={classes}
          theme={theme}
        />
      )}
    </>
  );
};
// };
