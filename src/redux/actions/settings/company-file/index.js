import axios from "axios";
import { api } from "../../../../api";
import { startLoading, endLoading } from "../../../reducers/ui/loading/index";
import {
  setInfo,
  setEditInfo,
  setLoading,
  setMappingResult,
  setGetLoading,
} from "../../../reducers/settings/company-file";
import {
  errorNotification,
  successNotification,
} from "../../../../helpers/notification";
import { t } from "i18next";

export const getCompanyFiles = (options) => (dispatch) => {
  // dispatch(startLoading());
  dispatch(setGetLoading(true));
  axios
    .post(api.SettingsApi.getCompanyFiles, options)
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

export const createCompanyFile =
  (data, setStatus, setProgress) => (dispatch) => {
    axios
      .post(api.SettingsApi.createCompanyFile, data, {
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

export const getCompanyFile = (options) => (dispatch) => {
  // dispatch(setLoading(true));
  axios
    .get(api.SettingsApi.getCompanyFile + options)
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

export const getByIdCompanyFile = (id) => (dispatch) => {
  // dispatch(setLoading(true));
  axios
    .get(api.SettingsApi.getCompanyFile + id)
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

export const editCompanyFile = (id, data, setStatus) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .put(api.SettingsApi.editCompanyFile + id, data)
    .then((res) => {
      if (res.data.statusCode === "200") {
        successNotification(t("notification.data_success"));
        dispatch(setLoading(false));
        setStatus(true);
      } else {
        dispatch(setLoading(false));
        setStatus(true);
      }
    })
    .catch(() => {
      dispatch(setLoading(false));
      setStatus(true);
    });
};

export const convertCompanyFile = (id, setStatus) => (dispatch) => {
  dispatch(startLoading());
  axios
    .get(api.SettingsApi.convertCompanyFile + id, {
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

export const mapCompanyFile = (id, setStatus, setProgress) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .get(api.SettingsApi.mapCompanyFile + id, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.token,
      },
    })
    .then((res) => {
      setStatus(true);
      dispatch(setLoading(false));
      if (res.data.statusCode === "200") {
        dispatch(setMappingResult(res.data));
        successNotification(t("notification.data_success"));
      } else {
      }
    })
    .catch((err) => {
      setStatus(true);
      errorNotification(t("toast.error"));
      dispatch(setLoading(false));
    });
};

export const acceptCompanyFile = (id, setStatus, setProgress) => (dispatch) => {
  dispatch(setLoading(true));

  axios
    .get(api.SettingsApi.acceptCompanyFile + id, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.token,
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
