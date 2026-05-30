import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import ErrorMsg from "../components/ErrorMsg";
import { toast } from "react-toastify";
import DeleteImageModal from "../components/DeleteImageModal";

function ImageDetails() {
  const { imageId } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState("");
  const [editPerson, setEditPerson] = useState(false);
  const [person, setPerson] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [albumImages, setAlbumImages] = useState([]);

  const loadImage = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/images/${imageId}`,
        {
          withCredentials: true,
        },
      );

      setImage(response.data);

      setPerson(response.data.person || "");

      const imagesResponse = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/albums/${response.data.album._id}/images`,
        {
          withCredentials: true,
        },
      );

      setAlbumImages(imagesResponse.data.images);
    } catch (err) {
      console.error(err);

      setError("Failed to load image");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImage();
  }, [imageId]);

  const currentIndex = albumImages.findIndex((img) => img._id === imageId);

  const prevImage = currentIndex > 0 ? albumImages[currentIndex - 1] : null;

  const nextImage =
    currentIndex < albumImages.length - 1
      ? albumImages[currentIndex + 1]
      : null;

  const updateImage = async (updatedData) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/images/${imageId}`,
        updatedData,
        {
          withCredentials: true,
        },
      );

      toast.success("Image updated successfully");

      loadImage();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update image");
    }
  };

  const addComment = async () => {
    if (!comment.trim()) return;

    try {
      await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/images/${imageId}/comments`,
        {
          text: comment,
        },
        {
          withCredentials: true,
        },
      );

      toast.success("Comment added");

      setComment("");

      loadImage();
    } catch (err) {
      console.error(err);

      toast.error("Failed to add comment");
    }
  };

  const deleteImage = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_SERVER_BASE_URL}/images/${imageId}`,
        {
          withCredentials: true,
        },
      );

      toast.success("Image deleted successfully");

      setShowDeleteModal(false);

      navigate(-1);
    } catch (err) {
      console.error(err);

      toast.error("Failed to delete image");
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMsg error={error} />;
  }

  return (
    <div className="bg-light min-vh-100">
      <div className="container py-4">
        <button
          className="btn btn-primary mb-3 pe-3"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div className="row g-3">
          {/* LEFT */}
          <div className="col-lg-8">
            {/* IMAGE */}
            <div className="card border-0 shadow-sm p-2 position-relative overflow-hidden">
              {/* NAV BUTTONS */}
              <div className="position-absolute top-50 start-0 end-0 translate-middle-y px-3 d-flex justify-content-between z-1">
                {/* PREV */}
                {prevImage ? (
                  <button
                    className="btn btn-light border shadow-sm rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "48px",
                      height: "48px",
                    }}
                    onClick={() => navigate(`/images/${prevImage._id}`)}
                  >
                    ‹
                  </button>
                ) : (
                  <div></div>
                )}

                {/* NEXT */}
                {nextImage && (
                  <button
                    className="btn btn-light border shadow-sm rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "48px",
                      height: "48px",
                    }}
                    onClick={() => navigate(`/images/${nextImage._id}`)}
                  >
                    ›
                  </button>
                )}
              </div>

              {/* IMAGE */}
              <img
                src={image.url}
                alt={image.name}
                className="img-fluid rounded"
                style={{
                  maxHeight: "75vh",
                  objectFit: "contain",
                }}
              />
            </div>

            {/* DETAILS */}
            <div className="card border-0 shadow-sm p-4 mt-3">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3 mb-4">
                <div>
                  <h3 className="fw-bold mb-1">{image.name}</h3>

                  <p className="text-muted mb-0">{image.album?.name}</p>
                </div>

                <div className="d-flex flex-wrap gap-2">
                  {image.isFavorite && (
                    <span className="badge bg-light text-dark border px-3 py-2">
                      ❤️ Favorite
                    </span>
                  )}

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="row g-4">
                {/* FILE SIZE */}
                <div className="col-6">
                  <p className="text-muted small mb-1">File Size</p>

                  <h6 className="fw-semibold">
                    {(image.size / 1024).toFixed(0)} KB
                  </h6>
                </div>

                {/* DATE */}
                <div className="col-6">
                  <p className="text-muted small mb-1">Uploaded</p>

                  <h6 className="fw-semibold">
                    {new Date(image.uploadedAt).toLocaleDateString()}
                  </h6>
                </div>

                {/* PERSON */}
                <div className="col-6">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <p className="text-muted small mb-0">Person</p>

                    <button
                      className="btn btn-sm btn-light border"
                      onClick={() => setEditPerson(!editPerson)}
                    >
                      Edit
                    </button>
                  </div>

                  {editPerson ? (
                    <div className="d-flex gap-2">
                      <input
                        type="text"
                        className="form-control"
                        value={person}
                        onChange={(e) => setPerson(e.target.value)}
                      />

                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          updateImage({
                            person,
                          });

                          setEditPerson(false);
                        }}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <h6 className="fw-semibold">{image.person || "-"}</h6>
                  )}
                </div>

                {/* TAGS */}
                <div className="col-6">
                  <p className="text-muted small mb-2">Tags</p>

                  <div className="d-flex flex-wrap gap-2 mb-3">
                    {image.tags?.length > 0 ? (
                      image.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="badge rounded-pill text-bg-light border"
                        >
                          #{tag}
                        </span>
                      ))
                    ) : (
                      <span className="text-muted">No tags</span>
                    )}
                  </div>

                  <div className="d-flex gap-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Add tag"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                    />

                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        if (!tagInput.trim()) return;

                        updateImage({
                          tags: [...image.tags, tagInput],
                        });

                        setTagInput("");
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm p-3">
              <h5 className="fw-bold mb-3">Comments</h5>

              {/* COMMENTS */}
              <div
                className="overflow-auto pe-1 mb-3"
                style={{
                  maxHeight: "420px",
                }}
              >
                {image.comments?.length > 0 ? (
                  image.comments.map((comment) => (
                    <div
                      key={comment._id}
                      className="bg-light rounded-4 p-3 mb-3"
                    >
                      <h6 className="fw-semibold mb-1">{comment.user?.name}</h6>

                      <p className="mb-1">{comment.text}</p>

                      <small className="text-muted">
                        {new Date(comment.createdAt).toLocaleString()}
                      </small>
                    </div>
                  ))
                ) : (
                  <p className="text-muted">No comments yet</p>
                )}
              </div>

              {/* INPUT */}
              <div className="d-flex gap-2">
                <input
                  type="text"
                  className="form-control rounded-pill"
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />

                <button
                  className="btn btn-primary rounded-circle"
                  onClick={addComment}
                >
                  ➤
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DeleteImageModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        onDelete={deleteImage}
      />
    </div>
  );
}

export default ImageDetails;
