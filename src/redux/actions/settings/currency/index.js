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
} from "../../../reducers/settings/currency";
import { t } from "i18next";

export const getCurrencies = (options) => (dispatch) => {
  // dispatch(startLoading());
  dispatch(setLoading(true));
  axios
    .post(api.SettingsApi.getCurrencies, options)
    .then((res) => {
      dispatch(setLoading(false));
      if (res.data.statusCode === "200") {
        dispatch(setInfo(res.data));
        // dispatch(endLoading());
      } else {
        // dispatch(endLoading());
      }
    })
    .catch(() => {
      dispatch(setLoading(false));
      // dispatch(endLoading());
    });
};

export const createCurrency = (data, setStatus) => (dispatch) => {
  dispatch(startLoading());
  axios
    .post(api.SettingsApi.createCurrency, data)
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

export const getByIdCurrency = (id) => (dispatch) => {
  axios
    .get(api.SettingsApi.getCurrency + id)
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

// export const getCurrencySuggestion =
//   (options, setData, setLoading) => (dispatch) => {
//     setLoading(true);
//     axios
//       .post(api.SettingsApi.getCurrencySuggestion, options)
//       .then((res) => {
//         if (res.data.statusCode === "200") {
//           setLoading(false);
//           setData(res.data.data);
//         } else {
//           setLoading(false);
//           errorNotification(t("toast.error"));
//         }
//       })
//       .catch(() => {
//         setLoading(false);
//         errorNotification(t("toast.error"));
//       });
//   };
