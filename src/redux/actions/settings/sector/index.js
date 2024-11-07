import axios from "axios";
import { api } from "../../../../api";
import { setInfo, setLoading } from "../../../reducers/settings/sector";
import { t } from "i18next";

export const getSectors = (options) => (dispatch) => {
  dispatch(setLoading(true));
  // dispatch(startLoading());
  axios
    .post(api.SettingsApi.getSectors, options)
    .then((res) => {
      // dispatch(endLoading());
      dispatch(setLoading(false));
      if (res.data.statusCode === "200") {
        dispatch(setInfo(res.data));
      } else {
      }
    })
    .catch(() => {
      // dispatch(endLoading());
      dispatch(setLoading(false));
    });
};
