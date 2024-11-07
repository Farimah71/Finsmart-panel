import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {},
  editInfo: {},
  loading: false,
  step: 0,
  requested: {},
};

const userCompanySlice = createSlice({
  initialState,
  name: "userCompany",
  reducers: {
    setInfo: (state, action) => {
      state.info = action.payload;
    },
    setEditInfo: (state, action) => {
      state.editInfo = action.payload;
    },
    setRequested: (state, action) => {
      state.requested = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    nextStep: (state) => {
      if (state.step < 4) {
        state.step++;
      }
    },
    previousStep: (state) => {
      if (state.step > 0) {
        state.step--;
      }
    },
    resetStep: (state) => {
      state.step = 0;
    },
    clearEditInfo: (state) => {
      state.editInfo = {};
    },
    clearInfo: (state) => {
      state.info = {};
    },
  },
});

const { actions, reducer } = userCompanySlice;
export const {
  setInfo,
  setEditInfo,
  setRequested,
  setLoading,
  nextStep,
  previousStep,
  resetStep,
  clearEditInfo,
  clearInfo,
} = actions;
export default reducer;
