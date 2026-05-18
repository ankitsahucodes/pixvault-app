import { useContext, createContext, useState } from "react";
import axios from "axios";
const ImageContext = createContext();
const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;
import { toast } from "react-toastify";

// eslint-disable-next-line react-refresh/only-export-components
export const useImageContext = () => useContext(ImageContext);

export function ImageProvider({ children }) {
  const [favImages, setFavImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadFavorites = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/favorites`,
        {
          withCredentials: true,
        },
      );

      setFavImages(response.data);
    } catch (err) {
      console.error(err);

      setError("Failed to load favorites");
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (imageId) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/images/${imageId}/favorite`,
        {},
        {
          withCredentials: true,
        },
      );

      if (response.data.isFavorite) {
        toast.success("Added to favorites");
      } else {
        toast.info("Removed from favorites");
      }

      loadFavorites();
    } catch (err) {
      console.error(err);

      toast.error("Failed to update favorite");
    }
  };

  


  return (
    <ImageContext.Provider value={{ toggleFavorite, loadFavorites, favImages, setFavImages, loading, error }}>
      {children}
    </ImageContext.Provider>
  );
}
