import axios from "axios";
import { api } from "../../../../api";
import { startLoading, endLoading } from "../../../reducers/ui/loading";
import {
  successNotification,
  errorNotification,
} from "../../../../helpers/notification";
import {
  setInfo,
  setEditInfo,
  setLoading,
  setInvestoryprofile,
} from "../../../reducers/settings/company";
import { t } from "i18next";

export const getCompanies = (options) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(api.SettingsApi.getCompanies, options)
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setInfo(res.data));
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    })
    .catch(() => {
      dispatch(setLoading(false));
    });
};

export const getCompany = (options) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(api.SettingsApi.getCompany, options)
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setEditInfo(res.data));
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    })
    .catch(() => {
      dispatch(setLoading(false));
    });
};

export const createCompany = (data, setStatus) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(api.SettingsApi.createCompany, data)
    .then((res) => {
      if (res.data.statusCode === "200") {
        successNotification(t("notification.data_success"));
        localStorage.company_id_ = res.data.data.companyId;
        setStatus(true);
        dispatch(setLoading(false));
      }
    })
    .catch((err) => {
      if (err.response.data.status === 400) {
        errorNotification(t("toast.error"));
      }
      dispatch(setLoading(false));
      setStatus(true);
    });
};

export const getByIdCompany = (id, np) => (dispatch) => {
  dispatch(startLoading());
  axios
    .get(api.SettingsApi.getCompany + id + `?includeProperties=${np}`)
    .then((res) => {
      dispatch(endLoading());
      if (res.data.statusCode === "200") {
        dispatch(setEditInfo(res.data.data));
      } else {
      }
    })
    .catch((err) => {
      dispatch(endLoading());
    });
};

export const getInvestoryCompany = (id, np) => (dispatch) => {
  // dispatch(startLoading());
  axios
    .get(api.SettingsApi.getCompany + id + `?includeProperties=${np}`)
    .then((res) => {
      // dispatch(endLoading());
      if (res.data.statusCode === "200") {
        dispatch(setInvestoryprofile(res.data.data));
      } else {
      }
    })
    .catch((err) => {
      // dispatch(endLoading());
    });
};

export const editCompany = (id, data, setStatus) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .put(api.SettingsApi.editCompany + id, data)
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setLoading(false));
        successNotification(t("notification.data_success"));
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

export const updateCompanyERP = (data, setStatus) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(api.SettingsApi.updateERP, data)
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setLoading(false));
        successNotification(t("notification.data_success"));
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
