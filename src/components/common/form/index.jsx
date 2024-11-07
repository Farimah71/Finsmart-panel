import { Formik, Form } from "formik";

export const MyForm = ({
  children,
  initialValues,
  validation,
  submit,
  classes,
  doNotInitialize,
}) => {
  // ---------- render jsx ----------
  return (
    <Formik
      enableReinitialize={doNotInitialize ? false : true}
      validateOnBlur={false}
      initialValues={initialValues}
      validationSchema={validation}
      onSubmit={submit}
    >
      <Form
        className={`w-full max-h-[inherit] ${classes} dark:bg-dark_custom-average-black`}
      >
        {children}
      </Form>
    </Formik>
  );
};
