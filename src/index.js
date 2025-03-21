import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { ReduxStore } from "./redux/ReduxStore";
// import WishList from "./pages/WishList/WishList/WishList";
// import Card from "./pages/Cart/Cart";

// import Cart from "./pages/Cart/Cart";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={ReduxStore}>
    <BrowserRouter>
      <App />
      {/* <Cart /> */}
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
