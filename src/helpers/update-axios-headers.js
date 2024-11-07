import axios from "axios";

export const UpdateAxiosHeaders = () => {
  // Axios global configuration
  axios.defaults.headers.common["Authorization"] = localStorage.token;
  axios.defaults.headers.post["Content-Type"] = "application/json";
};
