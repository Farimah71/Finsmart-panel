export const getDataFromLocalStorage = (key) => {
  if (localStorage.getItem("userInfo")) {
    return JSON.parse(localStorage.getItem("userInfo"))[key];
  }
};
