import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {},
  editInfo: {}
}

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setInfo: (state, action) => {
      state.info = action.payload;
    },
    setEditInfo: (state, action) => {
      state.editInfo = action.payload;
    }
  },
});

const { actions, reducer } = languageSlice;
export const { setInfo, setEditInfo } = actions;
export default reducer;
