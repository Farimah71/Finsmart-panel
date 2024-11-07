import axios from "axios";
import { api } from "../../../../api";
import { startLoading, endLoading } from "../../../reducers/ui/loading/index";
import {
  setInfo,
  setEditInfo,
  setLoading,
  setGetLoading,
} from "../../../reducers/settings/company-budget-file";
import {
  errorNotification,
  successNotification,
} from "../../../../helpers/notification";
import { t } from "i18next";

export const getCompanyBudgetFiles = (options) => (dispatch) => {
  // dispatch(startLoading());
  dispatch(setGetLoading(true));
  axios
    .post(api.SettingsApi.getCompanyBudgetFiles, options)
    .then((res) => {
      dispatch(setGetLoading(false));
      if (res.data.statusCode === "200") {
        dispatch(setInfo(res.data));
        // dispatch(endLoading());
      } else {
        // dispatch(endLoading());
      }
    })
    .catch((err) => {
      dispatch(setGetLoading(false));
      // dispatch(endLoading());
    });
};

export const createCompanyBudgetFile =
  (data, setStatus, setProgress) => (dispatch) => {
    axios
      .post(api.SettingsApi.createCompanyBudgetFile, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.token,
        },
        //Sets progressbar for data upload
        onUploadProgress: (ProgressEvent) => {
          const progress = Math.round(
            (ProgressEvent.loaded / ProgressEvent.total) * 100
          );
          setProgress(progress);
          progress === 100 && dispatch(setLoading(true));
        },
      })
      .then((res) => {
        setStatus(true);
        if (res.data.statusCode === "200") {
          dispatch(setLoading(false));
          successNotification(t("notification.data_success"));
        } else {
          dispatch(setLoading(false));
        }
      })
      .catch((err) => {
        setStatus(true);
        errorNotification(t("toast.error"));
        dispatch(setLoading(false));
      });
  };

export const getCompanyBudgetFile = (options) => (dispatch) => {
  // dispatch(setLoading(true));
  axios
    .get(api.SettingsApi.getCompanyBudgetFile + options)
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

export const getByIdCompanyBudgetFile = (id) => (dispatch) => {
  // dispatch(setLoading(true));
  axios
    .get(api.SettingsApi.getCompanyBudgetFile + id)
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

export const convertCompanyBudgetFile = (id, setStatus) => (dispatch) => {
  dispatch(startLoading());
  axios
    .get(api.SettingsApi.convertCompanyBudgetFile + id, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.token,
      },
    })
    .then((res) => {
      setStatus(true);
      if (res.data.statusCode === "200") {
        dispatch(endLoading());
        successNotification(t("notification.data_success"));
      } else {
        dispatch(endLoading());
      }
    })
    .catch((err) => {
      setStatus(true);
      errorNotification(t("toast.error"));
      dispatch(endLoading());
    });
};

export const deleteCompanyBudgetFile = (id, setStatus) => (dispatch) => {
  dispatch(startLoading());

  axios
    .delete(api.SettingsApi.deleteCompanyBudgetFile + id)
    .then((res) => {
      setStatus(true);
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
      setStatus(true);
    });
};
