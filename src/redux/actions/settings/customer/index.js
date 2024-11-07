import { api } from "../../../../api";
import axios from "axios";
import { endLoading, startLoading } from "../../../reducers/ui/loading";
import {
  setEditInfo,
  setInfo,
  setLoading,
} from "../../../reducers/settings/customer";
import {
  errorNotification,
  successNotification,
} from "../../../../helpers/notification";
import { t } from "i18next";

export const getCustomers = (options) => (dispatch) => {
  dispatch(startLoading());
  // dispatch(setLoading(true));
  axios
    .post(api.SettingsApi.getCustomers, options)
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

export const createCustomer = (data, setStatus) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(api.SettingsApi.createCustomer, data)
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

export const getByIdCustomer = (id) => (dispatch) => {
  axios
    .get(api.SettingsApi.getCustomer + id)
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

export const editCustomer = (id, data, setStatus) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .put(api.SettingsApi.editCustomer + id, data)
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

export const deleteCustomer = (id) => (dispatch) => {
  dispatch(startLoading());

  axios
    .delete(api.SettingsApi.deleteCustomer + id)
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
