import axios from "axios";
import { api } from "../../../api";
import { startLoading, endLoading } from "../../reducers/ui/loading/index";
import {
  setInfo,
  setEditInfo,
  setLoading,
  setRequested,
} from "../../reducers/user-company";
import {
  errorNotification,
  successNotification,
} from "../../../helpers/notification";
import { getCompany } from "../settings/company";
import { setEmptyInfo } from "../../reducers/settings/company-Finsmart-coding-header";
import { setClearInfo } from "../../reducers/settings/Finsmart-coding";
import { UpdateAxiosHeaders } from "../../../helpers/update-axios-headers";
import { getDataFromLocalStorage } from "../../../helpers/get-data-from-local";
import { clearInfo } from "../../reducers/settings/embed-report";
import { t } from "i18next";

export const getUserCompanies = (options) => (dispatch) => {
  dispatch(startLoading());
  axios
    .post(api.userCompanyApi.getUserCompanies, options)
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setInfo(res.data.data));
        dispatch(endLoading());
      } else {
        // dispatch(setLoading(false));
      }
    })
    .catch((err) => {
      dispatch(endLoading());
    });
};

export const getUserCompanyRequests = (options) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(api.userCompanyApi.getUserCompanies, options)
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setRequested(res.data.data));
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    })
    .catch((err) => {
      dispatch(setLoading(false));
    });
};

export const getUserCompany = (id) => (dispatch) => {
  // dispatch(startLoading());
  axios
    .get(api.userCompanyApi.getUserCompany + id)
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setEditInfo(res.data.data));
        // dispatch(endLoading());
      } else {
        // dispatch(endLoading());
      }
    })
    .catch((err) => {
      // dispatch(endLoading());
    });
};

export const createUserCompany = (data, setStatus) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(api.userCompanyApi.createUserCompany, data)
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

export const changeCompany = (data, navigate) => (dispatch) => {
  dispatch(startLoading());
  axios
    .post(api.userCompanyApi.changeCompany, data)
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(endLoading());
        localStorage.userInfo = JSON.stringify(res.data.data);
        localStorage.token = `bearer ${res.data.data.token}`;
        UpdateAxiosHeaders();
        dispatch(
          getCompany({
            filters: [
              {
                property: "CompanyId",
                operation: 5,
                values: [`${data.companyId}`],
              },
            ],
            includeProperties:
              "Country,CompanyActivityCategory,City,Sector,CompanyContacts",
          })
        );
        dispatch(
          getUserCompanyRequests({
            filters: [
              {
                property: "UserId",
                operation: 5,
                values: [`${getDataFromLocalStorage("userInfoId")}`],
              },
            ],
          })
        );
        dispatch(setEmptyInfo());
        dispatch(setClearInfo());
        dispatch(clearInfo());
        navigate("/profile");
      } else {
        dispatch(endLoading());
      }
    })
    .catch((err) => {
      dispatch(endLoading());
    });
};

export const getByIdUserCompany = (id) => (dispatch) => {
  axios
    .get(api.userCompanyApi.getUserCompany + id)
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

export const editUserCompany = (id, data, setStatus) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .put(api.userCompanyApi.editUserCompany + id, data)
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setLoading(false));
        successNotification(t("toast.success"));
        setStatus(true);
      } else {
        dispatch(setLoading(false));
        errorNotification(t("toast.error"));
        setStatus(true);
      }
    })
    .catch((err) => {
      dispatch(setLoading(false));
      errorNotification(t("toast.error"));
      setStatus(true);
    });
};

export const deleteUserCompany = (id, setStatus) => (dispatch) => {
  axios
    .delete(api.userCompanyApi.deleteUserCompany + id)
    .then((res) => {
      if (res.data.statusCode === "200") {
        setStatus(true);
      } else {
        setStatus(true);
      }
    })
    .catch((err) => {
      setStatus(true);
    });
};
