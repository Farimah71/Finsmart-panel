import axios from "axios";
import { api } from "../../../api";
import { startLoading, endLoading } from "../../reducers/ui/loading/index";
import {
  setRequestLoginInfo,
  setLoginInfo,
  setUserInfoSignup,
  setLogOut,
  setStep,
  setLoading,
  setFetchedUser,
  setPhoneLoading,
} from "../../reducers/auth";
import {
  errorNotification,
  successNotification,
} from "../../../helpers/notification";
import { t } from "i18next";
import { resetEditInfo } from "../../reducers/settings/company";
import { setLightTheme } from "../../reducers/theme";

const headers = {
  "Content-Type": "application/json",
  Authorization: localStorage.getItem("token"),
};

export const requestForgetPassword =
  (data, setActiveIndex, setState) => (dispatch) => {
    dispatch(startLoading());
    axios
      .post(api.AuthApi.forgetPasswordRequest, data, { headers })
      .then((res) => {
        if (res.data.statusCode === "200") {
          dispatch(endLoading());
          setActiveIndex(2);
        } else {
          dispatch(endLoading());
        }
      })
      .catch((err) => {
        if (
          err.response.data.statusCode === "400" &&
          err.response.data.message[0] === "User not found"
        ) {
          // errorNotification(t("error.user_not_found"));
          setState(t("error.user_not_found"));
        }
        dispatch(endLoading());
      });
  };

export const verifyForgetPassword =
  (data, setActiveIndex, setState) => (dispatch) => {
    dispatch(startLoading());
    axios
      .post(api.AuthApi.forgetPasswordVerify, data, { headers })
      .then((res) => {
        if (res.data.statusCode === "200") {
          dispatch(endLoading());
          setActiveIndex(3);
        } else {
          dispatch(endLoading());
        }
      })
      .catch((err) => {
        if (
          err.response.data.statusCode === "400" &&
          err.response.data.message[0] === "User not found"
        ) {
          setState(t("error.user_not_found"));
          // errorNotification(t("error.user_not_found"));
        }
        dispatch(endLoading());
      });
  };

export const forgetPassword =
  (data, navigate, setActiveIndex, setState) => (dispatch) => {
    dispatch(startLoading());
    axios
      .post(api.AuthApi.forgetPassword, data, {})
      .then((res) => {
        if (res.data.statusCode === "200") {
          dispatch(endLoading());
          setActiveIndex(1);
          navigate("/login");
          successNotification(t("toast.password_change_successful"));
        } else if (
          res.data.statusCode === "400" &&
          res.data.message[0] === "USERNOTFOUND"
        ) {
          setState(t("error.user_not_found"));
          // errorNotification(t("error.user_not_found"));
          dispatch(endLoading());
        }
      })
      .catch((err) => {
        dispatch(endLoading());
      });
  };

export const requestLogin = (data, setState) => (dispatch) => {
  dispatch(startLoading());
  axios
    .post(api.AuthApi.requestLogin, data, { headers })
    .then((res) => {
      localStorage.login_Token = `bearer ${res.data}`;
      dispatch(setStep(2));
      dispatch(setRequestLoginInfo(res.data));
      dispatch(endLoading());
      if (res.data.statusCode === "200") {
      } else {
        dispatch(endLoading());
      }
    })
    .catch((err) => {
      if (
        err.response.data.statusCode === "400" &&
        err.response.data.message[0] === "User Or Password incurrect"
      ) {
        setState(t("toast.user_pass_invalid"));
        // errorNotification(t("toast.user_pass_invalid"));
      }
      dispatch(endLoading());
    });
};

// export const loginWithPass = (data, navigate) => (dispatch) => {
//   dispatch(startLoading());
//   axios
//     .post(api.AuthApi.loginWithPass, data, { headers })
//     .then((res) => {
//       if (res.data.statusCode === "200") {
//         localStorage.token = `bearer ${res.data.data.token}`;
//         localStorage.adminInfo = JSON.stringify(res.data.data);
//         dispatch(setLoginInfo(res.data.data));
//         dispatch(endLoading());
//         navigate("/");
//       } else if (
//         res.data.statusCode === "400" &&
//         res.data.message[0] === "UsernameOrPasswordIsInvalid"
//       ) {
//         errorNotification(t("error.password_is_invalid"));
//         dispatch(endLoading());
//       }
//       dispatch(endLoading());
//     })
//     .catch((err) => {
//       dispatch(endLoading());
//     });
// };

export const loginWithActiveCode = (data, navigate, setState) => (dispatch) => {
  dispatch(startLoading());
  axios
    .post(api.AuthApi.loginWithActiveCode, data, {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("login_Token"),
    })
    .then((res) => {
      if (res.data.statusCode === "200") {
        localStorage.removeItem("login_Token");
        localStorage.token = `bearer ${res.data.data.token}`;
        localStorage.userInfo = JSON.stringify(res.data.data);
        dispatch(setLoginInfo(res.data.data));
        dispatch(endLoading());
        dispatch(setStep(1));
        navigate("/userCompany");
      } else {
        // errorNotification(t("toast.active_code_invalid"));
        dispatch(endLoading());
      }
      dispatch(endLoading());
    })
    .catch((err) => {
      if (
        err.response.data?.statusCode === "400" &&
        err.response.data.message[0] === "OTP Error"
      ) {
        setState(t("toast.active_code_invalid"));
      }
      dispatch(endLoading());
    });
};

export const setUserInfo =
  (data, status, navigate, useState, displayToast) => (dispatch) => {
    dispatch(setLoading(true));
    axios
      .post(api.AuthApi.createUserInfo, data, { headers })
      .then((res) => {
        if (res.data.statusCode === "200") {
          displayToast && successNotification(t("toast.success"));
          dispatch(setUserInfoSignup(res.data.data));
          status(true);
          !displayToast && navigate("/emailSent");
          dispatch(setLoading(false));
        }
      })
      .catch((err) => {
        if (
          err &&
          err.response.data.statusCode === "400" &&
          err.response.data.message[0] === "User is exists"
        ) {
          !displayToast && useState(t("toast.duplicate_user"));
          displayToast && errorNotification(t("toast.duplicate_user"));
        }
        status(false);
        dispatch(setLoading(false));
      });
  };

export const getUserInfoByPhone = (options) => (dispatch) => {
  dispatch(setPhoneLoading(true));
  axios
    .post(api.AuthApi.getUserInfo, options)
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setFetchedUser(res.data.data));
        dispatch(setPhoneLoading(false));
      } else {
        dispatch(setPhoneLoading(false));
      }
    })
    .catch(() => {
      dispatch(setPhoneLoading(false));
    });
};

export const verifyUser = (code) => (dispatch) => {
  dispatch(startLoading());
  axios
    .post(api.AuthApi.verifyUser, code, { headers })
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(endLoading());
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch(endLoading());
    });
};

export const logOut = (navigate) => (dispatch) => {
  dispatch(setLogOut());
  dispatch(resetEditInfo());
  dispatch(setLightTheme());
  navigate("/login");
};

export const setStepForm = (step) => (dispatch) => {
  dispatch(setStep(step));
};
