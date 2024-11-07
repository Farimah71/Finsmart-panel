import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {},
  editInfo: {},
  loading: false,
  getLoading: false,
};

const companyBudgetFileSlice = createSlice({
  initialState,
  name: "companyBudgetFile",
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
    setGetLoading: (state, action) => {
      state.getLoading = action.payload;
    },
  },
});

const { actions, reducer } = companyBudgetFileSlice;
export const { setInfo, setEditInfo, setLoading, setGetLoading } = actions;
export default reducer;
