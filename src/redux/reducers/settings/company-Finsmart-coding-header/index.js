import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
  editInfo: {},
  loading: false,
};

const companyFinsmartCodingHeaderSlice = createSlice({
  name: "companyFinsmartCodingHeader",
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
    setEmptyInfo: (state) => {
      state.info = {};
    },
  },
});

const { actions, reducer } = companyFinsmartCodingHeaderSlice;
export const { setInfo, setEditInfo, setLoading, setEmptyInfo } = actions;
export default reducer;
