import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {},
  editInfo: {},
  loading: false,
  getLoading: false,
};

const definitionSlice = createSlice({
  name: "definition",
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
    setGetLoading: (state, action) => {
      state.getLoading = action.payload;
    },
    clearInfo: (state) => {
      state.info = {};
    },
  },
});

const { actions, reducer } = definitionSlice;
export const { setInfo, setEditInfo, setLoading,setGetLoading, clearInfo } = actions;
export default reducer;
