import { RiAlarmWarningFill } from "react-icons/ri";
import { Button } from "../button";
import { t } from "i18next";

export const DeleteConfirmation = ({
  onCloseModal,
  deleteConfirm,
  loading,
}) => {
  return (
    <div className="p-5">
      <span className="flex gap-x-2">
        <RiAlarmWarningFill color="red" size={18} className="mt-0.5" />
        <span className="text-red-500 mb-3">
          {t("page_title.confirmation")}
        </span>
      </span>
      <hr />

      <div className="mt-5">
        <span className="mt-5 dark:text-dark_custom-full-white">{t("text.delete_confirm")}</span>
      </div>
      <div className="flex gap-x-2 justify-center mt-8">
        <Button
          title={t("button.cancel_title")}
          theme={"dark"}
          onClick={onCloseModal}
        />
        <Button
          title={t("button.delete_title")}
          theme={"light"}
          onClick={deleteConfirm}
          loading={loading}
        />
      </div>
    </div>
  );
};
