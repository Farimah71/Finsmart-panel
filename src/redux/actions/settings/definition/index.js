import { api } from "../../../../api";
import axios from "axios";
import { endLoading, startLoading } from "../../../reducers/ui/loading";
import {
  setEditInfo,
  setGetLoading,
  setInfo,
  setLoading,
} from "../../../reducers/settings/definition";
import {
  errorNotification,
  successNotification,
} from "../../../../helpers/notification";
import { t } from "i18next";

export const getDefinitions = (options) => (dispatch) => {
  // dispatch(startLoading());
  dispatch(setGetLoading(true));
  axios
    .post(api.SettingsApi.getDefinitions, options)
    .then((res) => {
      dispatch(setGetLoading(false));
      // dispatch(endLoading());
      if (res.data.statusCode === "200") {
        dispatch(setInfo(res.data));
      }
    })
    .catch(() => {
      dispatch(setGetLoading(false));
      // dispatch(endLoading());
    });
};

export const createDefinition = (data, setStatus) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(api.SettingsApi.createDefinition, data)
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

export const getByIdDefinition = (id) => (dispatch) => {
  axios
    .get(api.SettingsApi.getDefinition + id)
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

export const editDefinition = (id, data, setStatus) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .put(api.SettingsApi.editDefinition + id, data)
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
