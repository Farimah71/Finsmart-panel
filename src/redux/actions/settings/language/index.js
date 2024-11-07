import { api } from "../../../../api";
import { startLoading, endLoading } from "../../../reducers/ui/loading";
import axios from "axios";
import {
  successNotification,
  errorNotification,
} from "../../../../helpers/notification";
import { setEditInfo, setInfo } from "../../../reducers/settings/language";
import { t } from "i18next";

export const getLanguages = (options) => (dispatch) => {
  dispatch(startLoading());
  axios
    .post(api.SettingsApi.getLanguages, options)
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

export const createLanguage = (data, navigate) => (dispatch) => {
  dispatch(startLoading());
  axios
    .post(api.SettingsApi.createLanguage, data)
    .then((res) => {
      if (res.data.statusCode === "200") {
        successNotification(t("toast.success"));
        dispatch(endLoading());
        navigate("/language");
      } else {
        errorNotification(t("toast.error"));
        dispatch(endLoading());
      }
    })
    .catch(() => {
      errorNotification(t("toast.error"));
      dispatch(endLoading());
    });
};

export const getByIdLanguage = (id) => (dispatch) => {
  axios
    .get(api.SettingsApi.getLanguage + id)
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

export const editLanguage = (id, data, navigate) => (dispatch) => {
  dispatch(startLoading());
  axios
    .put(api.SettingsApi.editLanguage + id, data)
    .then((res) => {
      if (res.data.statusCode === "200") {
        successNotification(t("toast.success"));
        dispatch(endLoading());
        navigate("/language");
      } else {
        errorNotification(t("toast.error"));
        dispatch(endLoading());
      }
    })
    .catch(() => {
      errorNotification(t("toast.error"));
      dispatch(endLoading());
    });
};

export const getLanguageSuggestion =
  (options, setData, setLoading) => (dispatch) => {
    setLoading(true);
    axios
      .post(api.SettingsApi.getLanguageSuggestion, options)
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
