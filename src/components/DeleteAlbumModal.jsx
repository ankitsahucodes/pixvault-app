import axios from "axios";
import { toast } from "react-toastify";

function DeleteAlbumModal({
  showDeleteModal,
  setShowDeleteModal,
  selectedAlbum,
  onDeleted,
}) {
  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_SERVER_BASE_URL}/albums/${selectedAlbum._id}`,
        {
          withCredentials: true,
        },
      );

      setShowDeleteModal(false);

      onDeleted && onDeleted();

      toast.success("Album deleted successfully");
    } catch (err) {
      console.error("Failed to delete album:", err);
        toast.error("Failed to delete album");
    }
  };

  if (!showDeleteModal) return null;

  return (
    <>
      <div className={`modal fade show d-block`} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header">
              <h5 className="modal-title text-danger">Delete Album</h5>

              <button
                className="btn-close"
                onClick={() => setShowDeleteModal(false)}
              ></button>
            </div>

            {/* Body */}
            <div className="modal-body">
              <p>
                Are you sure you want to delete
                <strong> {selectedAlbum?.name} </strong>album ?
              </p>

              <p className="text-muted small mb-0">
                This action cannot be undone.
              </p>
            </div>

            {/* Footer */}
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>

              <button className="btn btn-danger" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div className="modal-backdrop fade show"></div>
    </>
  );
}

export default DeleteAlbumModal;
