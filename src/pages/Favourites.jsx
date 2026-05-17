import { FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading.jsx";
import ErrorMsg from "../components/ErrorMsg.jsx";
import axios from "axios";
import { toast } from "react-toastify";

function Favourites() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const loadFavorites = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/favorites`,
        {
          withCredentials: true,
        },
      );

      setImages(response.data);
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
        `${import.meta.env.VITE_SERVER_BASE_URL}/images/${imageId}/favorite`,
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

  useEffect(() => {
    loadFavorites();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMsg error={error} />;
  }

  return (
    <div className="container mt-4">
      {/* Heading */}
      <div className="d-flex align-items-center mb-4">

        <h2 className="fw-bold mb-0">Favourite Images </h2>
        <FaHeart className="text-danger ms-2 mt-1" size={25} />

      </div>

      {/* Empty State */}
      {images.length === 0 ? (
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: "50vh" }}
        >
          <FaHeart className="text-danger mb-3" size={78} />

          <h3>No favourites yet</h3>

          <p>Add photos to your favourites to see them here</p>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/albums")}
          >
            Go to Albums
          </button>
        </div>
      ) : (
        <div className="row">
          {images.map((image) => (
            <div key={image._id} className="col-md-4 mb-4">
              <div className="card shadow-sm border-0 h-100 image-card position-relative">
                <div>
                  {/* Heart */}
                  <button
                    className="btn position-absolute top-0 end-0 m-2 bg-white rounded-circle shadow-sm z-1"
                    onClick={() => toggleFavorite(image._id)}
                  >
                    {image.isFavorite ? (
                      <FaHeart className="text-danger" />
                    ) : (
                      <FaRegHeart className="text-danger" />
                    )}
                  </button>

                  {/* Image */}
                  <img
                    src={image.url}
                    alt={image.name}
                    className="card-img-top image-preview"
                    style={{
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />
                </div>

                {/* Body */}
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="fw-bold mb-0">{image.name}</h6>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favourites;
