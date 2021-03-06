import React from "react";
import ReactDOM from "react-dom";
import "./app/layout/styles.css";
import App from "./app/layout/App";
import reportWebVitals from "./reportWebVitals";
import "semantic-ui-css/semantic.min.css";
import { store, StoreContext } from "./app/stores/store";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  // Wrap our application with State Management
  <StoreContext.Provider value={store}> 
    {/* Wrap our application with Router */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreContext.Provider>,

  document.getElementById("root")
);

// If yu want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
