import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: "",
};

const userTypeSlice = createSlice({
  initialState,
  name: "userType",
  reducers: {
    setInfo: (state, action) => {
      state.info = action.payload;
    },
  },
});

const { actions, reducer } = userTypeSlice;
export const { setInfo } = actions;
export default reducer;
