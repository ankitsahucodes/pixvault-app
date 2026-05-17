import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaImages } from "react-icons/fa";
import Loading from "../components/Loading.jsx";
import ErrorMsg from "../components/ErrorMsg.jsx";
import UploadImageModal from "../components/UploadImageModal.jsx";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";

function AlbumDetails() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const { albumId } = useParams();

  const loadImages = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/albums/${albumId}/images`,
        { withCredentials: true },
      );
      setImages(response.data);
    } catch (err) {
      console.error("Failed to load images:", err);
      setError("Failed to load images");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, [albumId]);

  const toggleFavorite = async (imageId) => {
  try {

    const response = await axios.patch(
      `${import.meta.env.VITE_SERVER_BASE_URL}/images/${imageId}/favorite`,
      {},
      {
        withCredentials: true,
      }
    );

    if (response.data.isFavorite) {
      toast.success("Added to favorites");
    } else {
      toast.info("Removed from favorites");
    }

    loadImages();

  } catch (err) {

    console.error(
      "Failed to update favorite:",
      err
    );
    toast.error("Failed to update favorite");
  }
};

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMsg error={error} />;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1 className="fw-bold">Albums Images</h1>
        {images.length > 0 && (
          <button
            className="btn btn-primary"
            onClick={() => setShowUploadModal(true)}
          >
            + Upload Image
          </button>
        )}
      </div>

      {/* Empty State */}
      {images.length === 0 ? (
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: "50vh" }}
        >
          <FaImages size={78} />
          <h3>No Images yet</h3>
          <p>
            Your album is waiting for its first memory. Upload photos to bring
            this album to life!
          </p>

          <button
            className="btn btn-primary"
            onClick={() => setShowUploadModal(true)}
          >
            + Upload Image
          </button>
        </div>
      ) : (
        <div className="row">
          {images.map((image) => (
            <div key={image._id} className="col-md-6 col-12 col-lg-4 mb-4">
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
                  <h6 className="fw-bold mb-1">{image.name}</h6>

                  <p className="text-muted small mb-0">
                    {(image.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <UploadImageModal
        showUploadModal={showUploadModal}
        setShowUploadModal={setShowUploadModal}
        albumId={albumId}
        onUploaded={loadImages}
      />
    </div>
  );
}

export default AlbumDetails;
