import { api } from "../../../../api";
import axios from "axios";
import { endLoading, startLoading } from "../../../reducers/ui/loading";
import {
  setEditInfo,
  setInfo,
  setLoading,
} from "../../../reducers/settings/personnel";
import {
  errorNotification,
  successNotification,
} from "../../../../helpers/notification";
import { t } from "i18next";

export const getPersonnels = (options) => (dispatch) => {
  dispatch(startLoading());
  // dispatch(setLoading(true));
  axios
    .post(api.SettingsApi.getPersonnels, options)
    .then((res) => {
      // dispatch(setLoading(false));
      dispatch(endLoading());
      if (res.data.statusCode === "200") {
        dispatch(setInfo(res.data));
      }
    })
    .catch(() => {
      // dispatch(setLoading(false));
      dispatch(endLoading());
    });
};

export const createPersonnel = (data, setStatus) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(api.SettingsApi.createPersonnel, data)
    .then((res) => {
      dispatch(setLoading(false));
      setStatus(true);
      if (res.data.statusCode === "200") {
        successNotification(t("toast.success"));
      } else {
        errorNotification(t("toast.error"));
      }
    })
    .catch(() => {
      errorNotification(t("toast.error"));
      dispatch(setLoading(false));
      setStatus(true);
    });
};

export const getByIdPersonnel = (id) => (dispatch) => {
  axios
    .get(api.SettingsApi.getPersonnel + id)
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

export const editPersonnel = (id, data, setStatus) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .put(api.SettingsApi.editPersonnel + id, data)
    .then((res) => {
      dispatch(setLoading(false));
      setStatus(true);
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