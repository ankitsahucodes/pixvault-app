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
import Images from "./pages/Images.jsx";
import { ImageProvider } from "./context/ImageContext.jsx";
import ImageDetails from "./pages/ImageDetails.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <LandingPage /> },
      {
        path: "/albums",

        element: (
          <ProtectedRoute>
            <Albums />
          </ProtectedRoute>
        ),
      },
      {
        path: "/images",

        element: (
          <ProtectedRoute>
            <Images />
          </ProtectedRoute>
        ),
      },

      {
        path: "/favourites",

        element: (
          <ProtectedRoute>
            <Favourites />
          </ProtectedRoute>
        ),
      },

      {
        path: "/albums/:albumId",

        element: (
          <ProtectedRoute>
            <AlbumDetails />
          </ProtectedRoute>
        ),
      },

      {
        path: "/images/:imageId",

        element: (
          <ProtectedRoute>
            <ImageDetails />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ImageProvider>
      <RouterProvider router={router} />
    </ImageProvider>
  </StrictMode>,
);
