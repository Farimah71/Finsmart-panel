export const RadioButton = ({ field, form, radioList, disabled = false }) => {
  // ---------- variables ----------
  const { name, value } = field;
  const { setFieldValue } = form;

  // ---------- render jsx ----------
  return (
    <div className="flex flex-col gap-y-3">
      {radioList.map((radio, index) => (
        <span key={radio.id + index} className="flex gap-x-1">
          <input
            {...field}
            name={name}
            type="radio"
            id={radio.id}
            value={radio.value}
            disabled={disabled}
            onChange={(e) => setFieldValue(name, e.target.id)}
          />

          <label
            className="text-custom-dark text-16 cursor-default select-none dark:text-dark_custom-full-white"
            htmlFor={radio.id}
          >
            {radio.value}
          </label>
        </span>
      ))}
    </div>
  );
};
