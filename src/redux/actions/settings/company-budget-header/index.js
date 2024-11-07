import axios from "axios";
import { api } from "../../../../api";
import { startLoading, endLoading } from "../../../reducers/ui/loading/index";
import {
  setInfo,
  setEditInfo,
  setLoading,
} from "../../../reducers/settings/company-budget-header";
import {
  errorNotification,
  successNotification,
} from "../../../../helpers/notification";
import { t } from "i18next";

export const getCompanyBudgetHeaders = (options) => (dispatch) => {
  dispatch(startLoading());
  axios
    .post(api.SettingsApi.getCompanyBudgetHeaders, options)
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

export const getCompanyBudgetHeader = (options) => (dispatch) => {
  // dispatch(setLoading(true));
  axios
    .get(api.SettingsApi.getCompanyBudgetHeader + options)
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

export const createCompanyBudgetHeader = (data, setStatus) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(api.SettingsApi.createCompanyBudgetHeader, data)
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

export const getByIdCompanyBudgetHeader = (id) => (dispatch) => {
  // dispatch(setLoading(true));
  axios
    .get(api.SettingsApi.getCompanyBudgetHeader + id)
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

export const deleteCompanyBudgetHeader = (id) => (dispatch) => {
  dispatch(startLoading());

  axios
    .delete(api.SettingsApi.deleteCompanyBudgetHeader + id)
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
