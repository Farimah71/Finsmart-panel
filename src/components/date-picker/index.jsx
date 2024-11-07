import DatePicker from "react-datepicker";
import { FcCalendar, FcOvertime } from "react-icons/fc";
import "react-datepicker/dist/react-datepicker.css";

export const CustomDatePicker = ({
  field,
  form,
  classes,
  label,
  placeholder,
  showTime = false,
  timeOnly,
}) => {
  const { value, name } = field;
  const { setFieldValue } = form;
  // ---------- render jsx ----------
  return (
    <div className="w-full">
      <label className="text-14 text-custom-dark font-medium capitalize block dark:text-dark_custom-full-white">
        {label}
      </label>
      <DatePicker
        {...field}
        showIcon
        autoComplete="off"
        selected={value && new Date(value)}
        onChange={(date) => setFieldValue(name, date)}
        className={`w-full h-10 cursor-pointer bg-white dark:bg-dark_custom-average-black rounded-md border border-custom-gray pl-10 disabled:bg-slate-100 text-custom-dark dark:text-dark_custom-full-white text-14 placeholder:text-14 placeholder:text-custom-gray-muted outline-none ${classes} ${
          label && "mt-2.5"
        }`}
        wrapperClassName="w-full"
        todayButton="Today"
        dateFormat={
          showTime
            ? "yyyy-MM-dd hh:mm aa"
            : timeOnly
            ? "hh:mm aa"
            : "yyyy-MM-dd"
        }
        placeholderText={placeholder}
        showTimeSelect={showTime || timeOnly}
        showTimeInput={showTime}
        showTimeSelectOnly={timeOnly}
        onKeyDown={(e) => e.key >= "a" && e.key <= "z" && e.preventDefault()}
        // timeIntervals={15}
        showPopperArrow={false}
        icon={
          <span className="mt-3 pointer-events-none -mx-1">
            {timeOnly ? <FcOvertime size={19} /> : <FcCalendar size={19} />}
          </span>
        }
      />
    </div>
  );
};
