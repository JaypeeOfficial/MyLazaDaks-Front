import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "font-awesome/css/font-awesome.css";
import { BrowserRouter } from "react-router-dom";
import { legacy_createStore as createStore } from "redux";
import allReducers from "./reducers";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { lightTheme } from "./themes";

const store = createStore(
  allReducers,
  window.REDUX_DEVTOOLS_EXTENSION && window.REDUX_DEVTOOLS_EXTENSION()
);

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <BrowserRouter>
            {/* <ThemeProvider theme={"state" == true ? "light" : "dark"}> */}
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
