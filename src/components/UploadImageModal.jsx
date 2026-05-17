import { useState } from "react";
import axios from "axios";

function UploadImageModal({
  showUploadModal,
  setShowUploadModal,
  albumId,
  onUploaded,
}) {

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setShowUploadModal(false);
    setSelectedFile(null);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!selectedFile) return;

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("image", selectedFile);

      await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/albums/${albumId}/images`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      handleClose();

      onUploaded && onUploaded();

    } catch (err) {

      console.error("Failed to upload image:", err);

    } finally {

      setLoading(false);
    }
  };

  if (!showUploadModal) return null;

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">

            {/* Header */}
            <div className="modal-header">
              <h5 className="modal-title">
                Upload Image
              </h5>

              <button
                className="btn-close"
                onClick={handleClose}
              ></button>
            </div>

            {/* Body */}
            <form onSubmit={handleUpload}>

              <div className="modal-body">

                <input
                  type="file"
                  className="form-control"
                  onChange={(e) =>
                    setSelectedFile(e.target.files[0])
                  }
                  required
                />

              </div>

              {/* Footer */}
              <div className="modal-footer">

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading
                    ? "Uploading..."
                    : "Upload"}
                </button>

              </div>

            </form>

          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div className="modal-backdrop fade show"></div>
    </>
  );
}

export default UploadImageModal;