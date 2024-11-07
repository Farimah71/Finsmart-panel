import axios from "axios";
import { api } from "../../../../api";
import { startLoading, endLoading } from "../../../reducers/ui/loading/index";
import {
  setInfo,
  setEditInfo,
  setLoading,
} from "../../../reducers/settings/company-budget";
import {
  errorNotification,
  successNotification,
} from "../../../../helpers/notification";
import { t } from "i18next";

export const getCompanyBudgets = (options) => (dispatch) => {
  dispatch(startLoading());
  axios
    .post(api.SettingsApi.getCompanyBudgets, options)
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setInfo(res.data));
        dispatch(endLoading());
      } else {
        dispatch(endLoading());
      }
    })
    .catch((err) => {
      dispatch(endLoading());
    });
};

export const editCompanyBudget = (id, data, setStatus) => (dispatch) => {
  // dispatch(setLoading(true));
  axios
    .put(api.SettingsApi.editCompanyBudget + id, data)
    .then((res) => {
      // dispatch(setLoading(false));
      setStatus(true);
      if (res.data.statusCode === "200") {
        successNotification(t("toast.success"));
      } else {
        errorNotification(t("toast.error"));
      }
    })
    .catch(() => {
      // dispatch(setLoading(false));
      errorNotification(t("toast.error"));
      setStatus(true);
    });
};

export const getCompanyBudget = (options) => (dispatch) => {
  // dispatch(setLoading(true));
  axios
    .get(api.SettingsApi.getCompanyBudget + options)
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setEditInfo(res.data));
        // dispatch(setLoading(false));
      } else {
        // dispatch(setLoading(false));
      }
    })
    .catch((err) => {
      // dispatch(setLoading(false));
    });
};

export const getByIdCompanyBudget = (id) => (dispatch) => {
  // dispatch(setLoading(true));
  axios
    .get(api.SettingsApi.getCompanyBudget + id)
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setEditInfo(res.data));
        // dispatch(setLoading(false));
      } else {
        // dispatch(setLoading(false));
      }
    })
    .catch((err) => {
      // dispatch(setLoading(false));
    });
};

export const deleteCompanyBudget = (id) => (dispatch) => {
  dispatch(startLoading());

  axios
    .delete(api.SettingsApi.deleteCompanyBudget + id)
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(endLoading());
        successNotification(t("toast.success_delete"));
      } else {
        dispatch(endLoading());
      }
    })
    .catch((err) => {
      errorNotification(t("toast.error"));
      dispatch(endLoading());
    });
};
