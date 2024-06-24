import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "app/model/store";
import AppRedux from "app/ui/AppRedux";

export const BASE_ROUT = '/it-incubator-todolist-ts-01'

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
  root.render(
    <BrowserRouter basename={BASE_ROUT}>
      <Provider store={store}>
        <AppRedux />
      </Provider>
    </BrowserRouter>
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


