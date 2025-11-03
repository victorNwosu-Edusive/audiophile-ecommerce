import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Headphones from "./pages/Headphones";
import Navbar from "./components/Navbar";
import Speakers from "./pages/Speakers";
import Earphones from "./pages/Earphones";

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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
