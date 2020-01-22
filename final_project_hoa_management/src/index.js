import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter } from "react-router-dom";
import Parse from "parse";

Parse.serverURL = "https://parseapi.back4app.com"; // This is your Server URL
Parse.initialize(
  "aG1QeNHDTTu0f31AAMjZaCgm5KLpdaqdsG8zljSy", // This is your Application ID
  "1XjAf0xXdF6DEdif0L8U9gjdjzu0tFJ0FyTFBGtn", // This is your Javascript key
  "sDuLltSPktFiEyxRuvBXKIe3lkqovvnIWhM494Zb" // This is your Master key (never use it in the frontend)
);

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
