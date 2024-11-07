import { api } from "../../../../api";
import { startLoading, endLoading } from "../../../reducers/ui/loading";
import axios from "axios";
import {
  successNotification,
  errorNotification,
} from "../../../../helpers/notification";
import {
  setEditInfo,
  setInfo,
  setLoading,
} from "../../../reducers/settings/company-invest";
import { t } from "i18next";

export const getCompanyInvests = (options) => (dispatch) => {
  // dispatch(startLoading());
  axios
    .post(api.SettingsApi.getCompanyInvests, options)
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

export const createCompanyInvest = (data, setStatus) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(api.SettingsApi.createCompanyInvest, data)
    .then((res) => {
      dispatch(setLoading(false));
      if (res.data.statusCode === "200") {
        successNotification(t("toast.success"));
        setStatus(true);
      } else {
        errorNotification(t("toast.error"));
        setStatus(true);
      }
    })
    .catch(() => {
      errorNotification(t("toast.error"));
      dispatch(setLoading(false));
      setStatus(true);
    });
};

// export const getByIdCurrency = (id) => (dispatch) => {
//   axios
//     .get(api.SettingsApi.getCurrency + id)
//     .then((res) => {
//       if (res.data.statusCode === "200") {
//         dispatch(setEditInfo(res.data.data));
//       } else {
//         errorNotification(t("toast.error"));
//       }
//     })
//     .catch(() => {
//       errorNotification(t("toast.error"));
//     });
// };

// export const editCurrency = (id, data, setStatus) => (dispatch) => {
//   dispatch(startLoading());
//   axios
//     .put(api.SettingsApi.editCurrency + id, data)
//     .then((res) => {
//       if (res.data.statusCode === "200") {
//         successNotification(t("toast.success"));
//         dispatch(endLoading());
//         setStatus(true);
//       } else {
//         errorNotification(t("toast.error"));
//         dispatch(endLoading());
//         setStatus(true);
//       }
//     })
//     .catch(() => {
//       errorNotification(t("toast.error"));
//       dispatch(endLoading());
//       setStatus(true);
//     });
// };
