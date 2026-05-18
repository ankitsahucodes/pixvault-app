const DeleteImageModal = ({
  showDeleteModal,
  setShowDeleteModal,
  onDelete,
}) => {
  if (!showDeleteModal) return null;

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow">
            {/* HEADER */}
            <div className="modal-header">
              <h5 className="modal-title">Delete Image</h5>

              <button
                type="button"
                className="btn-close"
                onClick={() => setShowDeleteModal(false)}
              ></button>
            </div>

            {/* BODY */}
            <div className="modal-body">
              <p className="mb-0">
                Are you sure you want to delete this image?
              </p>
            </div>

            {/* FOOTER */}
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>

              <button className="btn btn-danger" onClick={onDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* BACKDROP */}
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default DeleteImageModal;
