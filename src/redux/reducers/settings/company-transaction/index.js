import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {},
  loading: false,
};

const companyTransactionSlice = createSlice({
  name: "companyTransaction",
  initialState,
  reducers: {
    setInfo: (state, action) => {
      state.info = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearTransactionInfo: (state) => {
      state.info = {};
    },
  },
});

const { actions, reducer } = companyTransactionSlice;
export const { setInfo, setLoading, clearTransactionInfo } = actions;
export default reducer;
