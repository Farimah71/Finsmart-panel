import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {},
  editInfo: {},
  loading: false,
  mappingResult: {},
  getLoading: false,
};

const companyFileSlice = createSlice({
  initialState,
  name: "companyFile",
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
    setMappingResult: (state, action) => {
      state.mappingResult = action.payload;
    },
    clearMappingResult: (state) => {
      state.mappingResult = {};
    },
    clearEditInfo: (state) => {
      state.editInfo = {};
    },
  },
});

const { actions, reducer } = companyFileSlice;
export const {
  setInfo,
  setEditInfo,
  setLoading,
  setGetLoading,
  setMappingResult,
  clearMappingResult,
  clearEditInfo,
} = actions;
export default reducer;
