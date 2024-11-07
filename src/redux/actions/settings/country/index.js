import { api } from "../../../../api";
import axios from "axios";
import { endLoading, startLoading } from "../../../reducers/ui/loading";
import {
  setEditInfo,
  setInfo,
  setLoading,
} from "../../../reducers/settings/country";
import {
  errorNotification,
  successNotification,
} from "../../../../helpers/notification";
import { t } from "i18next";

export const getCountries = (options) => (dispatch) => {
  // dispatch(startLoading());
  dispatch(setLoading(true));
  axios
    .post(api.SettingsApi.getCountries, options)
    .then((res) => {
      dispatch(setLoading(false));
      // dispatch(endLoading());
      if (res.data.statusCode === "200") {
        dispatch(setInfo(res.data));
      }
    })
    .catch(() => {
      dispatch(setLoading(false));
      // dispatch(endLoading());
    });
};

export const createCountry = (data, setStatus) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(api.SettingsApi.createCountry, data)
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

export const getByIdCountry = (id) => (dispatch) => {
  axios
    .get(api.SettingsApi.getCountry + id)
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

export const editCountry = (id, data, setStatus) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .put(api.SettingsApi.editCountry + id, data)
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

export const getCountrySuggestion =
  (options, setData, setLoading) => (dispatch) => {
    setLoading(true);
    axios
      .post(api.SettingsApi.getCountrySuggestion, options)
      .then((res) => {
        if (res.data.statusCode === "200") {
          setLoading(false);
          setData(res.data.data);
        } else {
          setLoading(false);
          errorNotification(t("toast.error"));
        }
      })
      .catch(() => {
        setLoading(false);
        errorNotification(t("toast.error"));
      });
  };
