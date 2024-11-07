import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {},
  editInfo: {},
  loading: false,
};

const companyActivityCategorySlice = createSlice({
  name: "companyActivityCategory",
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

const { actions, reducer } = companyActivityCategorySlice;
export const { setInfo, setEditInfo, setLoading } = actions;
export default reducer;
