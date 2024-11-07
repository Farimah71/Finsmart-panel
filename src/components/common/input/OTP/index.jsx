import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";

export const OTP = ({
  field,
  form,
  charCount,
  inputType,
  shouldSubmit,
  autoFocus,
}) => {
  // ----------state----------
  const [otp, setOtp] = useState("");

  // ----------variable----------
  const { name } = field;
  const { setFieldValue } = form;

  // ----------lifecycle----------
  useEffect(() => {
    if (otp.length === charCount) {
      setFieldValue(name, otp);
      shouldSubmit(otp);
    }
  }, [otp]);

  // ----------render jsx----------
  return (
    <OtpInput
      {...field}
      value={otp}
      onChange={setOtp}
      shouldAutoFocus={autoFocus}
      numInputs={charCount}
      renderSeparator={<pre> - </pre>}
      renderInput={(props) => <input className="w-20 border" {...props} />}
      inputType={inputType}
      inputStyle={{
        width: "13%",
        height: "55px",
        border: "1px solid #dee2e6",
        borderRadius: "10px",
      }}
      containerStyle={{
        justifyContent: "center",
      }}
    />
  );
};
