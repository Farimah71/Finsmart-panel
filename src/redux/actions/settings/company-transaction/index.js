import axios from "axios";
import { api } from "../../../../api";
import { endLoading, startLoading } from "../../../reducers/ui/loading";
import { setInfo } from "../../../reducers/settings/company-transaction";
import { clearExcelInfo } from "../../../reducers/settings/ExcelTempData";
import { clearTempInfo } from "../../../reducers/settings/temp-transaction";

export const getCompanyTransactions = (options) => (dispatch) => {
  dispatch(startLoading());
  axios
    .post(api.SettingsApi.getCompanyTransactions, options)
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setInfo(res.data));
        dispatch(clearExcelInfo());
        dispatch(clearTempInfo());
        dispatch(endLoading());
      } else {
        dispatch(endLoading());
      }
    })
    .catch(() => {
      dispatch(endLoading());
    });
};
