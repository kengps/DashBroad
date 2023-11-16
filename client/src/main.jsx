import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import MyRouter from "./MyRouter";
import { HelmetProvider } from "react-helmet-async";


//useParams
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

//redux
//* ใช้เวอร์ชั่นนี้ ติดตั้งด้วยละ
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/index";

const store = configureStore({ reducer: rootReducer }, composeWithDevTools);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <HelmetProvider>
      <BrowserRouter>
        <QueryParamProvider adapter={ReactRouter6Adapter}>

          <App />
        </QueryParamProvider>
      </BrowserRouter>
    </HelmetProvider>
  </Provider>
);
