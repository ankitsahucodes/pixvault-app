import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import LandingPage from "./pages/LandingPage.jsx";
import Albums from "./pages/Albums.jsx";
import Favourites from "./pages/Favourites.jsx";
import AlbumDetails from "./pages/AlbumDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "/albums", element: <Albums /> },
      { path: "/favourites", element: <Favourites /> },
      { path: "/albums/:albumId", element: <AlbumDetails /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
);
