import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {},
  editInfo: {},
};

const packetSlice = createSlice({
  name: "packet",
  initialState,
  reducers: {
    setInfo: (state, action) => {
      state.info = action.payload;
    },
    setEditInfo: (state, action) => {
      state.editInfo = action.payload;
    },
  },
});

const { actions, reducer } = packetSlice;
export const { setInfo, setEditInfo } = actions;
export default reducer;
