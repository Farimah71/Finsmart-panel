import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  requestLoginInfo: {},
  loginInfo: {},
  userInfo: {},
  loading: false,
  loginStep: 1,
  fetchedUser: {},
  getByPhoneLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRequestLoginInfo: (state, action) => {
      state.requestLoginInfo = action.payload;
    },
    setLoginInfo: (state, action) => {
      state.loginInfo = action.payload;
    },
    setUserInfoSignup: (state, action) => {
      state.userInfo = action.payload;
    },
    setLogOut: (state) => {
      localStorage.token = "";
      localStorage.removeItem("userInfo");
      localStorage.removeItem("requested_comp_");
      localStorage.removeItem("creating_comp_");
      localStorage.removeItem("comp_country_");
      localStorage.removeItem("comp_phase_");
      localStorage.removeItem("comp_activity_category_");
      state.loginStep = 1;
    },
    setStep: (state, action) => {
      state.loginStep = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPhoneLoading: (state, action) => {
      state.getByPhoneLoading = action.payload;
    },
    setFetchedUser: (state, action) => {
      state.fetchedUser = action.payload;
    },
    clearFetchedUser: (state) => {
      state.fetchedUser = {};
    },
    clearInfo: (state) => {
      state.userInfo = {};
    },
  },
});

const { actions, reducer } = authSlice;
export const {
  setRequestLoginInfo,
  setLoginInfo,
  setUserInfoSignup,
  setLogOut,
  setStep,
  setLoading,
  setPhoneLoading,
  setFetchedUser,
  clearFetchedUser,
  clearInfo,
} = actions;
export default reducer;
