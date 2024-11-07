import { api } from "../../../../api";
import axios from "axios";
import { endLoading, startLoading } from "../../../reducers/ui/loading";
import {
  setEditInfo,
  setInfo,
  setLoading,
} from "../../../reducers/settings/coding-flag";
import {
  errorNotification,
  successNotification,
} from "../../../../helpers/notification";
import { t } from "i18next";

export const getCodingFlags = (options) => (dispatch) => {
  // dispatch(startLoading());
  axios
    .post(api.SettingsApi.getCodingFlags, options)
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

export const createCodingFlag = (data, setStatus) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(api.SettingsApi.createCodingFlag, data)
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

export const getByIdCodingFlag = (id) => (dispatch) => {
  // dispatch(setLoading(true));
  axios
    .get(api.SettingsApi.getCodingFlag + id)
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setEditInfo(res.data.data));
        // dispatch(setLoading(false));
      } else {
        errorNotification(t("toast.error"));
        // dispatch(setLoading(false));
      }
    })
    .catch(() => {
      errorNotification(t("toast.error"));
      // dispatch(setLoading(false));
    });
};

export const editCodingFlag = (id, data, setStatus) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .put(api.SettingsApi.editCodingFlag + id, data)
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
