import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store/index.js";
import { Provider } from "react-redux";
import "./i18n/index";
import "./main.css";
import "react-toastify/dist/ReactToastify.css";

// Axios global configuration
axios.defaults.headers.common["Authorization"] = localStorage.token;
axios.defaults.headers.post["Content-Type"] = "application/json";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
