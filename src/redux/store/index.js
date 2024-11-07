import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "../reducers/index";
import thunk from "redux-thunk";


export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})