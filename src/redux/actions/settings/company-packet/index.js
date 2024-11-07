import { api } from "../../../../api";
import axios from "axios";
import { endLoading, startLoading } from "../../../reducers/ui/loading";
import {
  setEditInfo,
  setInfo,
  setLoading,
} from "../../../reducers/settings/company-packet";
import {
  errorNotification,
  successNotification,
} from "../../../../helpers/notification";
import { t } from "i18next";
import { nextStep } from "../../../reducers/user-company";

export const getCompanyPackets = (options) => (dispatch) => {
  dispatch(startLoading());
  axios
    .post(api.SettingsApi.getCompanyPackets, options)
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

export const createCompanyPacket = (data, setStatus) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(api.SettingsApi.createCompanyPacket, data)
    .then((res) => {
      if (res.data.statusCode === "200") {
        // successNotification(t("toast.success"));
        dispatch(setLoading(false));
        // dispatch(nextStep());
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

export const getByIdCompanyPacket = (id) => (dispatch) => {
  axios
    .get(api.SettingsApi.getCompanyPacket + id)
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

export const editCompanyPacket = (id, data, setStatus) => (dispatch) => {
  dispatch(startLoading());
  axios
    .put(api.SettingsApi.editCompanyPacket + id, data)
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
