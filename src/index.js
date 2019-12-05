import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./animate.css";
import App from "./App";
import Provider from "./providers/";


ReactDOM.render(
  <Provider>
      <App />
  </Provider>,
  document.getElementById("root")
);

