import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {},
  editInfo: {},
  loading: false,
};

const FinsmartCodingSlice = createSlice({
  name: "FinsmartCoding",
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
    setClearInfo: (state) => {
      state.info = {};
    },
  },
});

const { actions, reducer } = FinsmartCodingSlice;
export const { setInfo, setEditInfo, setLoading, setClearInfo } = actions;
export default reducer;
