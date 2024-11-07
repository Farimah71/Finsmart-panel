import { API_URL } from "../../config";

export const AuthApi = {
  // ----------- Security --------------
  requestLogin: `${API_URL}/Security/LoginRequest`,
  loginWithActiveCode: `${API_URL}/Security/Login`,

  forgetPasswordRequest: `${API_URL}/Security/ForgetPasswordRequest`,
  forgetPasswordVerify: `${API_URL}/Security/ForgetPasswordVerify`,
  forgetPassword: `${API_URL}/Security/ForgetPassword`,

  verifyUser: `${API_URL}/Security/VerifyUser`,

  // ----------- Signup ---------------
  createUserInfo: `${API_URL}/UserInfo/Post`,
  getUserInfo: `${API_URL}/UserInfo/Get`,
};
