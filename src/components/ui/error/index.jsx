import { ErrorMessage } from "formik";

export const Error = ({ name }) => {
  return (
    <ErrorMessage
      component="p"
      name={name}
      className="text-red-500 text-14 mt-1"
    />
  );
};
