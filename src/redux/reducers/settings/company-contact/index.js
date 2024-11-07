import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {},
  loading: false,
};

const companyContactSlice = createSlice({
  name: "companyContact",
  initialState,
  reducers: {
    setInfo: (state, action) => {
      state.info = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

const { actions, reducer } = companyContactSlice;
export const { setInfo, setLoading } = actions;
export default reducer;
