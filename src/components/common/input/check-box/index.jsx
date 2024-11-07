export const Checkbox = ({ field, form, label, disabled = false }) => {
  // ---------- variables ----------
  const { name, value } = field;
  const { setFieldValue } = form;

  // ---------- render jsx ----------
  return (
    <div className="flex items-center gap-x-2">
      <div>
        <input
          {...field}
          name={name}
          type="checkbox"
          id={name}
          hidden
          value={value}
          onChange={(e) => setFieldValue(name, e.target.checked)}
          disabled={disabled}
        />
        <label
          htmlFor={name}
          className={`block relative w-5 h-5 rounded-md ${
            value ? "bg-custom-blue" : "bg-custom-gray-medium"
          } ${disabled ? "cursor-default" : "cursor-pointer"}`}
        >
          <div
            className={`absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 ${
              value ? "block" : "hidden"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="13"
              viewBox="0 0 16 13"
              fill="none"
            >
              <path
                d="M13.6783 0.911165C14.0322 0.494741 14.6567 0.444104 15.0732 0.798064C15.4896 1.15203 15.5402 1.77655 15.1863 2.19297L6.77482 12.0888C6.4153 12.5118 5.77827 12.5563 5.36337 12.1875L0.910246 8.22919C0.501763 7.8661 0.46497 7.24061 0.828065 6.83212C1.19116 6.42364 1.81665 6.38685 2.22513 6.74994L5.92207 10.0361L13.6783 0.911165Z"
                fill="white"
              />
            </svg>
          </div>
        </label>
      </div>
      <label
        className="text-custom-dark text-16 cursor-default select-none dark:text-dark_custom-full-white"
        htmlFor={name}
      >
        {label}
      </label>
    </div>
  );
};
