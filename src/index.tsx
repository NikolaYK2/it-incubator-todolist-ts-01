import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import AppRedux from "app/ui/AppRedux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "app/model/store";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
  root.render(
    <BrowserRouter>
      <Provider store={store}>
        <AppRedux />
      </Provider>
    </BrowserRouter>
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


