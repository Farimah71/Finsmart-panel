import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {},
  editInfo: {},
  loading: false,
};

const codeMapperSlice = createSlice({
  name: "codeMapper",
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

const { actions, reducer } = codeMapperSlice;
export const { setInfo, setEditInfo, setLoading, clearInfo } = actions;
export default reducer;
