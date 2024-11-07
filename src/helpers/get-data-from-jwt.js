import jwtDecode from "jwt-decode";

export const getDataFromJwtToken = (key) => {
  if (localStorage.getItem("userInfo")) {
    const getData = JSON.parse(localStorage.getItem("userInfo"));
    const token_decoded = jwtDecode(getData.token);
    return token_decoded[key];
  } else {
    localStorage.token = "";
  }
};
