import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {},
  loading: false,
};

const ExcelTempDataSlice = createSlice({
  name: "ExcelTempData",
  initialState,
  reducers: {
    setInfo: (state, action) => {
      state.info = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearExcelInfo: (state) => {
      state.info = {};
    },
  },
});

const { actions, reducer } = ExcelTempDataSlice;
export const { setInfo, setLoading, clearExcelInfo } = actions;
export default reducer;
