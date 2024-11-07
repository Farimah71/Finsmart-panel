import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  theme: "light",
};

let themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setDarkTheme: (state, action) => {
      document.body.classList.add("dark");
      state.theme = "dark";
    },
    setLightTheme: (state, action) => {
      document.body.classList.remove("dark");
      state.theme = "light";
    },
  },
});

let { actions, reducer } = themeSlice;

export let { setDarkTheme, setLightTheme } = actions;
export default reducer;
