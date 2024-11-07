import { api } from "../../../../api";
import axios from "axios";
import {
  successNotification,
  errorNotification,
} from "../../../../helpers/notification";
import { setLoading } from "../../../reducers/settings/company-contact";
import { t } from "i18next";

export const createCompanyContact = (data, setStatus) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(api.SettingsApi.createCompanyContact, data)
    .then((res) => {
      dispatch(setLoading(false));
      setStatus(true);
      if (res.data.statusCode === "200") {
        successNotification(t("toast.success"));
      } else {
        // errorNotification(t("toast.error"));
      }
    })
    .catch(() => {
      errorNotification(t("toast.error"));
      dispatch(setLoading(false));
      setStatus(true);
    });
};
