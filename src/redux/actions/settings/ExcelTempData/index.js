import axios from "axios";
import { api } from "../../../../api";
import { endLoading, startLoading } from "../../../reducers/ui/loading";
import { setInfo } from "../../../reducers/settings/ExcelTempData";
import { clearTempInfo } from "../../../reducers/settings/temp-transaction";
import { clearTransactionInfo } from "../../../reducers/settings/company-transaction";

export const getExcelTempDatas = (options) => (dispatch) => {
  dispatch(startLoading());
  axios
    .post(api.SettingsApi.getExcelTempDatas, options)
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setInfo(res.data));
        dispatch(clearTempInfo());
        dispatch(clearTransactionInfo());
        dispatch(endLoading());
      } else {
        dispatch(endLoading());
      }
    })
    .catch(() => {
      dispatch(endLoading());
    });
};
