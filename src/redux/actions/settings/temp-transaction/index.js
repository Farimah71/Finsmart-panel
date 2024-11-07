import axios from "axios";
import { api } from "../../../../api";
import { endLoading, startLoading } from "../../../reducers/ui/loading";
import { setInfo } from "../../../reducers/settings/temp-transaction";
import { clearExcelInfo } from "../../../reducers/settings/ExcelTempData";
import { clearTransactionInfo } from "../../../reducers/settings/company-transaction";

export const getTempTransactions = (options) => (dispatch) => {
  dispatch(startLoading());

  axios
    .post(api.SettingsApi.getTempTransactions, options)
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setInfo(res.data));
        dispatch(clearExcelInfo());
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
