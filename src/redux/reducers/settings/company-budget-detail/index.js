import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {},
  editInfo: {},
  loading: false,
};

const companyBudgetDetailSlice = createSlice({
  name: "companyBudgetDetail",
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
    clearInfo: (state) => {
      state.info = {};
    },
  },
});

const { actions, reducer } = companyBudgetDetailSlice;
export const { setInfo, setEditInfo, setLoading, clearInfo } = actions;
export default reducer;
