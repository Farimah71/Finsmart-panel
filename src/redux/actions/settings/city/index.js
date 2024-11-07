import { api } from "../../../../api";
import axios from "axios";
import { endLoading, startLoading } from "../../../reducers/ui/loading";
import {
  setEditInfo,
  setInfo,
  setLoading,
} from "../../../reducers/settings/city";
import {
  errorNotification,
  successNotification,
} from "../../../../helpers/notification";
import { t } from "i18next";

export const getCities = (options) => (dispatch) => {
  dispatch(setLoading(true));
  // dispatch(startLoading());
  axios
    .post(api.SettingsApi.getCities, options)
    .then((res) => {
      // dispatch(endLoading());
      if (res.data.statusCode === "200") {
        dispatch(setInfo(res.data));
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    })
    .catch(() => {
      // dispatch(endLoading());
      dispatch(setLoading(false));
    });
};

export const createCity = (data, setStatus) => (dispatch) => {
  dispatch(startLoading());
  axios
    .post(api.SettingsApi.createCity, data)
    .then((res) => {
      if (res.data.statusCode === "200") {
        successNotification(t("toast.success"));
        dispatch(endLoading());
        setStatus(true);
      } else {
        errorNotification(t("toast.error"));
        dispatch(endLoading());
        setStatus(true);
      }
    })
    .catch(() => {
      errorNotification(t("toast.error"));
      dispatch(endLoading());
      setStatus(true);
    });
};

export const getByIdCity = (id, np) => (dispatch) => {
  axios
    .get(api.SettingsApi.getCity + id + `?includeProperties=${np}`)
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

export const editCity = (id, data, setStatus) => (dispatch) => {
  dispatch(startLoading());
  axios
    .put(api.SettingsApi.editCity + id, data)
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(endLoading());
        successNotification(t("toast.success"));
        setStatus(true);
      } else {
        dispatch(endLoading());
        errorNotification(t("toast.error"));
        setStatus(true);
      }
    })
    .catch(() => {
      dispatch(endLoading());
      errorNotification(t("toast.error"));
      setStatus(true);
    });
};
