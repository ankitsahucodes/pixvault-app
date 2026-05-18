import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import ErrorMsg from "../components/ErrorMsg";
import { FaImages, FaHeart, FaRegHeart } from "react-icons/fa";
import { useImageContext } from "../context/ImageContext";
import ImageCarouselModal from "../components/ImageCarouselModal";

function Images() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCarousel, setShowCarousel] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { toggleFavorite } = useImageContext();

  const loadImages = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/images`,
        {
          withCredentials: true,
        },
      );

      setImages(response.data);
    } catch (err) {
      console.error(err);

      setError("Failed to load images");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
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
        <h2 className="fw-bold mb-0">All Images</h2>

        <FaImages className="ms-2" size={24} />
      </div>

      {/* Empty State */}
      {images.length === 0 ? (
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: "50vh" }}
        >
          <FaImages size={78} />

          <h3>No images yet</h3>

          <p>Upload images to your albums</p>
        </div>
      ) : (
        <div className="row">
          {images.map((image, index) => (
            <div key={image._id} className="col-md-4 mb-4">
              <div className="card shadow-sm border-0 h-100 image-card position-relative">
                <div>
                  {/* Heart */}
                  <button
                    className="btn position-absolute top-0 end-0 m-2 bg-white rounded-circle shadow-sm z-1"
                    onClick={async () => {
                      await toggleFavorite(image._id);
                      loadImages();
                    }}
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
                    onClick={() => {
                      setSelectedIndex(index);
                      setShowCarousel(true);
                    }}
                  />
                </div>

                <div className="card-body">
                  <h6 className="fw-bold">{image.name}</h6>

                  <p className="text-muted small mb-0">
                    {(image.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <ImageCarouselModal
        images={images}
        selectedIndex={selectedIndex}
        showCarousel={showCarousel}
        setShowCarousel={setShowCarousel}
      />
    </div>
  );
}

export default Images;
