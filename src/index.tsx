import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { Provider } from "react-redux";

import "./index.css";
import App, { router } from "./App";
import { RouterProvider } from "react-router-dom";
import { store } from "./store";

const rootElement = document.getElementById("root") as HTMLDivElement;
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      =
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
