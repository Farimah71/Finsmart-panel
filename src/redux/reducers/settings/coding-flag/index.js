import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {},
  editInfo: {},
  loading: false,
};

const codingFlagSlice = createSlice({
  name: "codingFlag",
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
  },
});

const { actions, reducer } = codingFlagSlice;
export const { setInfo, setEditInfo, setLoading } = actions;
export default reducer;
