import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {},
  loading: false,
};

const tempTransactionSlice = createSlice({
  name: "tempTransaction",
  initialState,
  reducers: {
    setInfo: (state, action) => {
      state.info = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearTempInfo: (state) => {
      state.info = {};
    },
  },
});

const { actions, reducer } = tempTransactionSlice;
export const { setInfo, setLoading, clearTempInfo } = actions;
export default reducer;
