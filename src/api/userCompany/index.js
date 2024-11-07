import { API_URL } from "../../config";

export const userCompanyApi = {
  getUserCompanies: `${API_URL}/UserCompany/Get`,
  getUserCompany: `${API_URL}/UserCompany/Get/`,
  createUserCompany: `${API_URL}/UserCompany/Post`,
  editUserCompany: `${API_URL}/UserCompany/put/`,
  deleteUserCompany: `${API_URL}/UserCompany/Delete/`,
  changeCompany: `${API_URL}/LoginHistory/ChangeCompany`,
};
