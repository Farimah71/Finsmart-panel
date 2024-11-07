import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {},
  editInfo: {},
  loading: false,
  investoryProfile: {},
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setInfo: (state, action) => {
      state.info = action.payload;
    },
    setEditInfo: (state, action) => {
      state.editInfo = action.payload;
    },
    setInvestoryprofile: (state, action) => {
      state.investoryProfile = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    resetEditInfo: (state, action) => {
      state.editInfo = {};
    },
  },
});

const { actions, reducer } = companySlice;
export const { setInfo, setEditInfo,setInvestoryprofile, setLoading, resetEditInfo } = actions;
export default reducer;
