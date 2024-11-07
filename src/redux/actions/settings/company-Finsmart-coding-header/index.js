import { api } from "../../../../api";
import axios from "axios";
import { endLoading, startLoading } from "../../../reducers/ui/loading";
import {
  setEditInfo,
  setInfo,
  setLoading,
} from "../../../reducers/settings/company-Finsmart-coding-header";
import {
  errorNotification,
  successNotification,
} from "../../../../helpers/notification";
import { t } from "i18next";

export const getCompanyFinsmartCodingHeaders = (options) => (dispatch) => {
  // dispatch(startLoading());
  axios
    .post(api.SettingsApi.getFinsmartCodingHeaders, options)
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setInfo(res.data));
        // dispatch(endLoading());
      } else {
        // dispatch(endLoading());
      }
    })
    .catch(() => {
      // dispatch(endLoading());
    });
};

export const getByIdCompanyFinsmartCodingHeader = (id, np) => (dispatch) => {
  axios
    .get(
      api.SettingsApi.getFinsmartCodingHeader + id + `?includeProperties=${np}`
    )
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setEditInfo(res.data.data));
      } else {
        // errorNotification(t("toast.error"));
      }
    })
    .catch(() => {
      // errorNotification(t("toast.error"));
    });
};

export const copyCompanyFinsmartCodingHeader =
  (id, setStatus) => (dispatch) => {
    dispatch(setLoading(true));
    axios
      .get(api.SettingsApi.copyFinsmartCodingHeader + id)
      .then((res) => {
        setStatus(true);
        dispatch(setLoading(false));
        if (res.data.statusCode === "200") {
          successNotification(t("toast.success"));
          dispatch(setInfo(res.data.data.finsmartCodings));
        } else {
          errorNotification(t("toast.error"));
        }
      })
      .catch(() => {
        dispatch(setLoading(false));
        errorNotification(t("toast.error"));
        setStatus(true);
      });
  };
