import { api } from "../../../../api";
import axios from "axios";
import { endLoading, startLoading } from "../../../reducers/ui/loading";
import {
  setEditInfo,
  setInfo,
  setLoading,
} from "../../../reducers/settings/code-mapper";
import {
  errorNotification,
  successNotification,
} from "../../../../helpers/notification";
import { t } from "i18next";

export const getCodeMappers = (options) => (dispatch) => {
  dispatch(setLoading(true));
  // dispatch(startLoading());
  axios
    .post(api.SettingsApi.getCodeMappers, options)
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setInfo(res.data));
        dispatch(setLoading(false));
        // dispatch(endLoading());
      } else {
        dispatch(setLoading(false));
        // dispatch(endLoading());
      }
    })
    .catch(() => {
      dispatch(setLoading(false));
      // dispatch(endLoading());
    });
};

export const createCodeMapper = (data, setStatus) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(api.SettingsApi.createCodeMapper, data)
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

export const getByIdCodeMapper = (id) => (dispatch) => {
  // dispatch(setLoading(true));
  axios
    .get(api.SettingsApi.getCodeMapper + id)
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

export const editCodeMapper = (id, data, setStatus) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .put(api.SettingsApi.editCodeMapper + id, data)
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
