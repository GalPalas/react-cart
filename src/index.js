import React from "react";
import ReactDOM from "react-dom";
import configureAppStore from "./store/configureStore";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";

const store = configureAppStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
