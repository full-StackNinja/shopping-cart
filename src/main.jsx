import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Import default stylesheets
import "./defaultStyles/meyer-reset-1st.css";
import "./defaultStyles/my-css-reset-2nd.css";
import "./defaultStyles/normalize-3rd.css";
import "./defaultStyles/typography-4th.css";
import "./components/App/App.css";

import { App } from "./components/App/App";
import { MainContent } from "./components/MainContent";
import { ErrorPage } from "./components/ErrorPage";
import { ProductDetailPage } from "./components/ProductDetailPage";
import { Home } from "./components/Home";
import { ShopCart } from "./components/ShopCart";
import { ThankYouMessage } from "./components/ThankYouMessage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/products",
        element: <MainContent />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/shop-cart",
        element: <ShopCart />,
      },
      {
        path: "/product-detail-page/:productId",
        element: <ProductDetailPage />,
      },
      {
        path: "/order-placed",
        element: <ThankYouMessage />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
