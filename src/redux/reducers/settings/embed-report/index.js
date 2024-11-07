import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {},
  editInfo: {},
  loading: false,
};

const embedReportSlice = createSlice({
  name: "embedReport",
  initialState,
  reducers: {
    setInfo: (state, action) => {
      state.info = action.payload;
    },
    setEditInfo: (state, action) => {
      state.editInfo = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearInfo: (state, action) => {
      state.info = {};
    },
  },
});

const { actions, reducer } = embedReportSlice;
export const { setInfo, setEditInfo, setLoading, clearInfo } = actions;
export default reducer;
