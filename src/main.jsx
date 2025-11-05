import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import "./index.css";
import Home from "./pages/Home";
import Headphones from "./pages/Headphones";
import Navbar from "./components/Navbar";
import Speakers from "./pages/Speakers";
import Earphones from "./pages/Earphones";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import { CartProvider } from "./context/CartContext";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

const router = createBrowserRouter([
  {
    path: "/", // Define the root path
    element: <Navbar />, // Render Navbar for the root path
    children: [
      {
        index: true,
        element: <Home />, // Render Homepage for the index route
      },
      {
        path: "headphones",
        element: <Headphones /> ,
      },
      {
        path: "speakers",
        element: <Speakers /> ,
      },
      {
        path: "earphones",
        element: <Earphones /> ,
      },
      {
        path: "product/:id",
        element: <ProductDetails /> ,
      },
      {
        path: "checkout",
        element: <Checkout /> ,
      },
      {
        path: "order-confirmation",
        element: <OrderConfirmation /> ,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConvexProvider client={convex}>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </ConvexProvider>
  </React.StrictMode>
);
