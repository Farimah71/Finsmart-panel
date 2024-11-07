import { useState } from "react";
import { useTranslation } from "react-i18next";
// ++++++++++ images import ++++++++++
import EmptyFileIcon from "../../../../assets/images/no-image.png";

export const UploadFile = ({
  field,
  form,
  src,
  fileFormats,
  size,
  label,
  formData,
  fileHandler,
  maxSize,
  theme,
  accept,
}) => {
  // ---------- states ----------
  const [avatarSrc, setAvatarSrc] = useState("");
  const [fileName, setFileName] = useState("");

  // ---------- hooks ----------
  const { t } = useTranslation();

  // ---------- variables ----------
  const { name } = field;
  const { setFieldValue } = form;

  // ---------- functions ----------
  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file.size < maxSize) {
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        const avatarUrl = event.target.result;
        setAvatarSrc(avatarUrl);
        setFieldValue(name, avatarUrl.split(",")[1]);
      };
      fileReader.readAsDataURL(file);
      fileNameHandler(e);
    } else {
      alert(`${t("error.file_size")} ${maxSize / 1000}KB`);
    }
  };
  const onFileChange = (e) => {
    const file = e.target.files[0];
    const myFormData = new FormData();
    myFormData.append(name, file);
    setFieldValue(name, file);
    fileHandler(myFormData);
    setFileName(myFormData.get(name).name);
  };
  const fileNameHandler = (file) => {
    const fileNameArr = file.currentTarget.value.split("\\");
    const fileName = fileNameArr[fileNameArr.length - 1];
    if (fileName.length > 15) {
      shortFileNameHandler(fileName);
    } else {
      setFileName(fileName);
    }
  };
  const shortFileNameHandler = (fileName) => {
    const shortFileName = fileName.split(".")[0].slice(0, 9);
    setFileName(`(${shortFileName}...).${fileName.split(".")[1]}`);
  };

  // ---------- render jsx ----------
  return (
    <div className="w-full flex items-center gap-x-8">
      {!formData && theme !== "simple" && (
        <div className="w-1/4 md:w-1/5 lg:w-[25%] min-w-[80px]">
          <img
            src={avatarSrc ? avatarSrc : src ? src : EmptyFileIcon}
            alt="logo-image"
            className="bg-white rounded-30 w-full"
          />
        </div>
      )}
      <div className="flex flex-col gap-y-1 dark:text-dark_custom-full-white">
        <label
          htmlFor={name}
          className={
            theme === "simple"
              ? "uppercase text-xs lg:text-14 px-2 lg:px-4 py-2 bg-custom-blue rounded-10 text-white cursor-pointer text-center"
              : "uppercase text-xs lg:text-14 p-1 lg:p-2 bg-white dark:bg-transparent border border-custom-blue rounded-10 text-custom-blue cursor-pointer text-center"
          }
        >
          {label}
        </label>
        <input
          {...field}
          type="file"
          id={name}
          hidden
          onChange={(e) => (formData ? onFileChange(e) : onImageChange(e))}
          value={undefined}
          accept={
            accept === "excel"
              ? ".xlsx, .xls, .csv"
              : formData
              ? ".pdf,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              : "image/*"
          }
        />
        {fileName ? (
          fileName
        ) : fileFormats && size ? (
          <p className="text-custom-dark text-opacity-30 text-xs lg:text-14">
            {fileFormats} {t("input.up_to_title")} {size}
          </p>
        ) : null}
      </div>
    </div>
  );
};
