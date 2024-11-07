import axios from "axios";
import { api } from "../../../../api";
import { endLoading, startLoading } from "../../../reducers/ui/loading";
import {
  setEditInfo,
  setInfo,
  setLoading,
} from "../../../reducers/settings/Finsmart-coding-header";
import {
  errorNotification,
  successNotification,
} from "../../../../helpers/notification";
import { t } from "i18next";

export const getFinsmartCodingHeaders = (options) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(api.SettingsApi.getFinsmartCodingHeaders, options)
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setInfo(res.data));
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    })
    .catch(() => {
      dispatch(setLoading(false));
    });
};

export const createFinsmartCodingHeader = (data, setStatus) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(api.SettingsApi.createFinsmartCodingHeader, data)
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

export const getByIdFinsmartCodingHeader = (id, np) => (dispatch) => {
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

export const editFinsmartCodingHeader = (id, data, setStatus) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .put(api.SettingsApi.editFinsmartCodingHeader + id, data)
    .then((res) => {
      setStatus(true);
      dispatch(setLoading(false));
      if (res.data.statusCode === "200") {
        successNotification(t("toast.success"));
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

export const copyFinsmartCodingHeader = (id, setStatus) => (dispatch) => {
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
