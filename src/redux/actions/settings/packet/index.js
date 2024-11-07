import { api } from "../../../../api";
import axios from "axios";
import { endLoading, startLoading } from "../../../reducers/ui/loading";
import { setEditInfo, setInfo } from "../../../reducers/settings/packet";
import {
  errorNotification,
  successNotification,
} from "../../../../helpers/notification";
import { t } from "i18next";

export const getPackets = (options) => (dispatch) => {
  // dispatch(startLoading());
  axios
    .post(api.SettingsApi.getPackets, options)
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setInfo(res.data));
        // dispatch(endLoading());
      } else {
        // dispatch(endLoading());
      }
    })
    .catch(() => {
      // dispatch(endLoading());
    });
};

export const createPacket = (data, setStatus) => (dispatch) => {
  dispatch(startLoading());
  axios
    .post(api.SettingsApi.createPacket, data)
    .then((res) => {
      if (res.data.statusCode === "200") {
        successNotification(t("toast.success"));
        dispatch(endLoading());
        setStatus(true);
      } else {
        errorNotification(t("toast.error"));
        dispatch(endLoading());
        setStatus(true);
      }
    })
    .catch(() => {
      errorNotification(t("toast.error"));
      dispatch(endLoading());
      setStatus(true);
    });
};

export const getByIdPacket = (id) => (dispatch) => {
  axios
    .get(api.SettingsApi.getPacket + id)
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

export const editPacket = (id, data, setStatus) => (dispatch) => {
  dispatch(startLoading());
  axios
    .put(api.SettingsApi.editPacket + id, data)
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
