import axios from "axios";
import { api } from "../../../../api";
import { endLoading, startLoading } from "../../../reducers/ui/loading";
import {
  setEditInfo,
  setInfo,
  setLoading,
} from "../../../reducers/settings/Finsmart-coding";
import {
  errorNotification,
  successNotification,
} from "../../../../helpers/notification";
import { t } from "i18next";

export const getFinsmartCodings = (options) => (dispatch) => {
  dispatch(startLoading());
  axios
    .post(api.SettingsApi.getFinsmartCodings, options)
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setInfo(res.data));
        dispatch(endLoading());
      } else {
        dispatch(endLoading());
      }
    })
    .catch(() => {
      dispatch(endLoading());
    });
};

export const createFinsmartCoding = (data, setStatus) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(api.SettingsApi.createFinsmartCoding, data)
    .then((res) => {
      if (res.data.statusCode === "200") {
        successNotification(t("toast.success"));
        dispatch(setLoading(false));
        setStatus(true);
      } else {
        errorNotification(t("toast.error"));
        dispatch(setLoading(false));
        setStatus(true);
      }
    })
    .catch(() => {
      errorNotification(t("toast.error"));
      dispatch(setLoading(false));
      setStatus(true);
    });
};

export const getByIdFinsmartCoding = (id) => (dispatch) => {
  axios
    .get(api.SettingsApi.getFinsmartCoding + id)
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setEditInfo(res.data.data));
      } else {
        errorNotification(t("toast.error"));
      }
    })
    .catch(() => {
      errorNotification(t("toast.error"));
    });
};

export const editFinsmartCoding = (id, data, setStatus) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .put(api.SettingsApi.editFinsmartCoding + id, data)
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setLoading(false));
        successNotification(t("toast.success"));
        setStatus(true);
      } else {
        dispatch(setLoading(false));
        errorNotification(t("toast.error"));
        setStatus(true);
      }
    })
    .catch(() => {
      dispatch(setLoading(false));
      errorNotification(t("toast.error"));
      setStatus(true);
    });
};
