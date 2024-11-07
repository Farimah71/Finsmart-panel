import axios from "axios";
import { api } from "../../../../api";
import { setInfo, setLoading } from "../../../reducers/settings/embed-report";
import { errorNotification } from "../../../../helpers/notification";

export const getEmbedReport = (options) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .get(api.SettingsApi.getEmbedReport, options)
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setInfo(res.data.data));
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    })
    .catch((err) => {
      if (err.response.data?.statusCode === "400") {
        errorNotification(err.response.data?.message[0]);
      }
      dispatch(setLoading(false));
    });
};
